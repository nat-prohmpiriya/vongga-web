"use client"

import { ChatRoom } from '@/types/chat'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Input, Spin } from 'antd'
import { useAuthStore } from '@/store/auth.store'
import { formatISOToTimeAgo } from '@/utils/converTime'
import { useChat } from '@/providers/ChatProvider'

interface ChatRoomsListProps {
    chatRoomList: ChatRoom[]
    currentChatRoom: ChatRoom | null
    setCurrentChatRoom: (room: ChatRoom) => void
}

export default function ChatRoomsList({ chatRoomList, setCurrentChatRoom, currentChatRoom }: ChatRoomsListProps) {
    const { user } = useAuthStore()
    const { onlineUsers } = useChat()

    return (
        <div className='bg-white rounded-lg shadow-md p-4'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Chat Rooms</h2>
                <Badge count={chatRoomList?.length || 0} />
            </div>

            {/* <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search chats..."
                className='mb-4'
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
            /> */}

            <div className='space-y-3 max-h-[400px] overflow-y-auto'>
                {/* {loading ? (
                    <div className='flex justify-center py-4'>
                        <Spin />
                    </div> */}
                {/* ) :  */}
                {chatRoomList && chatRoomList.length > 0 ? (
                    chatRoomList.map((room) => {
                        const otherUser = room.users.find(u => u.id !== user?.id)
                        if (!otherUser) return null
                        return (
                            <div
                                key={room.id}
                                onClick={() => { setCurrentChatRoom(room) }}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${currentChatRoom?.id === room.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <Badge dot status={onlineUsers.has(otherUser.id) ? 'success' : 'default'} offset={[-2, 32]}>
                                    <Avatar
                                        src={otherUser?.photoProfile || undefined}
                                        icon={!otherUser?.photoProfile ? <UserOutlined /> : undefined}
                                    />
                                </Badge>
                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-start'>
                                        <div className='font-medium truncate'>
                                            {otherUser.username}
                                        </div>
                                        {room.lastMessage && (
                                            <div className='text-xs text-gray-500 whitespace-nowrap ml-2'>
                                                {formatISOToTimeAgo(room.lastMessage.createdAt)}
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
