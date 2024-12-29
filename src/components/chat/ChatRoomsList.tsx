import { ChatRoom } from '@/services/chat.service'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Input, Spin } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

interface ChatRoomsListProps {
    rooms: ChatRoom[] | null
    loading: boolean
    onSearch: (search: string) => void
    onRoomSelect: (roomId: string) => void
    currentUserId: string | undefined
    selectedRoomId?: string
}

export const ChatRoomsList = ({
    rooms,
    loading,
    onSearch,
    onRoomSelect,
    currentUserId,
    selectedRoomId
}: ChatRoomsListProps) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (value: string) => {
        setSearchValue(value)
        onSearch(value)
    }

    const formatTime = (time: string) => {
        return dayjs(time).format('HH:mm')
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Chats</h2>
                <Badge count={rooms?.length || 0} />
            </div>

            <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search chats..."
                className='mb-4'
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <div className='space-y-3 max-h-[400px] overflow-y-auto'>
                {loading ? (
                    <div className='flex justify-center py-4'>
                        <Spin />
                    </div>
                ) : rooms && rooms.length > 0 ? (
                    rooms.map((room) => {
                        const otherUser = room.users.find(u => u.id !== currentUserId)
                        if (!otherUser) return null

                        return (
                            <div
                                key={room.id}
                                onClick={() => onRoomSelect(room.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedRoomId === room.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <Badge dot status="success" offset={[-2, 32]}>
                                    {otherUser.photoProfile ? (
                                        <Avatar src={otherUser.photoProfile} />
                                    ) : (
                                        <Avatar icon={<UserOutlined />} />
                                    )}
                                </Badge>
                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-start'>
                                        <div className='font-medium truncate'>
                                            {otherUser.username}
                                        </div>
                                        {room.lastMessage && (
                                            <div className='text-xs text-gray-500 whitespace-nowrap ml-2'>
                                                {formatTime(room.lastMessage.createdAt)}
                                            </div>
                                        )}
                                    </div>
                                    {room.lastMessage && (
                                        <div className='text-sm text-gray-500 truncate'>
                                            {room.lastMessage.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='text-center text-gray-500 py-4'>
                        No chats found
                    </div>
                )}
            </div>
        </div>
    )
}
