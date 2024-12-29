import { UserList } from '@/services/user.service'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Input, Spin } from 'antd'
import { useState } from 'react'

interface ChatFriendsListProps {
    friends: UserList[]
    loading: boolean
    onSearch: (search: string) => void
    onChatClick: (e: React.MouseEvent, friend: UserList) => void
}

export const ChatFriendsList = ({
    friends,
    loading,
    onSearch,
    onChatClick
}: ChatFriendsListProps) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (value: string) => {
        setSearchValue(value)
        onSearch(value)
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Friends</h2>
                <Badge count={friends.length} />
            </div>

            <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search friends..."
                className='mb-4'
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
            />

            <div className='space-y-3 max-h-[300px] overflow-y-auto'>
                {loading ? (
                    <div className='flex justify-center py-4'>
                        <Spin />
                    </div>
                ) : friends.length > 0 ? (
                    friends.map((friend) => (
                        <div
                            key={friend.id}
                            className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                            <div className='flex items-center gap-3'>
                                <Badge dot status="success" offset={[-2, 32]}>
                                    {friend.photoProfile ? (
                                        <Avatar src={friend.photoProfile} />
                                    ) : (
                                        <Avatar icon={<UserOutlined />} />
                                    )}
                                </Badge>
                                <div>
                                    <div className='font-medium'>{friend.username}</div>
                                    <div className='text-xs text-gray-500'>Online</div>
                                </div>
                            </div>
                            <Button
                                type='primary'
                                size='small'
                                onClick={(e) => onChatClick(e, friend)}
                            >
                                Chat
                            </Button>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-gray-500 py-4'>
                        No friends found
                    </div>
                )}
            </div>
        </div>
    )
}
