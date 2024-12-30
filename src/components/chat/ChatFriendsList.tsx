"use client"

import { UserList } from '@/services/user.service'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Input, Spin } from 'antd'
import { useEffect, useState } from 'react'
import userService from '@/services/user.service'

interface ChatFriendsListProps {
    onChatClick: (e: React.MouseEvent, friend: UserList) => void
}

export const ChatFriendsList = (props: ChatFriendsListProps) => {

    const { onChatClick } = props

    const [friendsList, setFriendsList] = useState<UserList[]>([])
    const [loading, setLoading] = useState(true)
    const [searchFriend, setSearchFriend] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [filteredFriends, setFilteredFriends] = useState<UserList[]>([])

    useEffect(() => {
        fetchListFriends()
    }, [])

    useEffect(() => {
        if (!friendsList) return
        const filtered = friendsList.filter(friend =>
            friend.username.toLowerCase().includes(searchFriend.toLowerCase())
        )
        setFilteredFriends(filtered)
    }, [])

    const fetchListFriends = async () => {
        setLoading(true)
        try {
            console.log('Fetching list of friends...')
            const response = await userService.getUsers({
                page: 1,
                pageSize: 50,
                sortBy: 'createdAt',
                sortDir: 'desc',
                search: ''
            })
            if (!response) return console.error('Error fetching list of friends')
            setFriendsList(response.users)
            setFilteredFriends(response.users)
        } catch (error) {
            console.error('Error fetching list of friends:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (value: string) => {
        setSearchValue(value)
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold'>Friends</h2>
                <Badge count={filteredFriends.length} />
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
                ) : filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                        <div
                            key={friend.id}
                            className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                            <div className='flex items-center gap-3'>
                                <Badge dot status="success" offset={[-2, 32]}>
                                    <Avatar src={friend.photoProfile || undefined} icon={!friend.photoProfile && <UserOutlined />} />
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
