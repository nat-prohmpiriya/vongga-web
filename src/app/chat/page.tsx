'use client'

import { useChat } from '@/providers/ChatProvider'
import { Row, Col, Spin } from 'antd'
import { useState, useEffect } from 'react'
import userService, { UserList } from '@/services/user.service'
import { useAuthStore } from '@/store/auth.store'
import chatService, { ChatRoom } from '@/services/chat.service'
import { ChatFriendsList } from '@/components/chat/ChatFriendsList'
import { ChatRoomsList } from '@/components/chat/ChatRoomsList'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessageList } from '@/components/chat/ChatMessageList'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import ChatInput from '@/components/chat/ChatInput'

export default function ChatRoomPage() {
    const { messages: chatMessages, loadMessages, sendMessage } = useChat()
    const [listFriends, setListFriends] = useState<UserList[]>([])
    const [filteredFriends, setFilteredFriends] = useState<UserList[]>([])
    const [roomId, setRoomId] = useState('')
    const [talkingWith, setTalkingWith] = useState<UserList | null>(null)
    const { user } = useAuthStore()
    const [rooms, setRooms] = useState<ChatRoom[] | null>(null)
    const [filteredRooms, setFilteredRooms] = useState<ChatRoom[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [searchFriend, setSearchFriend] = useState('')
    const [searchRoom, setSearchRoom] = useState('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetchListFriends()
        fetchRoom()
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        if (!listFriends) return
        const filtered = listFriends.filter(friend =>
            friend.username.toLowerCase().includes(searchFriend.toLowerCase())
        )
        setFilteredFriends(filtered)
    }, [searchFriend, listFriends])

    useEffect(() => {
        if (!rooms) return
        const filtered = rooms.filter(room => {
            const member = room.users.find(m => m.id !== user?.id)
            return member?.username.toLowerCase().includes(searchRoom.toLowerCase())
        })
        setFilteredRooms(filtered)
    }, [searchRoom, rooms, user?.id])

    useEffect(() => {
        if (roomId) {
            loadMessages(roomId)
        }
    }, [roomId])

    const handleSendMessage = (content: string) => {
        if (!roomId || !content.trim()) return
        sendMessage(roomId, content)
    }

    const fetchRoom = async () => {
        setLoading(true)
        try {
            const rooms = await chatService.getRooms()
            setRooms(rooms)
            setFilteredRooms(rooms)
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchListFriends = async () => {
        setLoading(true)
        try {
            const response = await userService.getUsers({
                page: 1,
                pageSize: 50,
                sortBy: 'createdAt',
                sortDir: 'desc',
                search: ''
            })
            if (!response) return
            setListFriends(response.users)
            setFilteredFriends(response.users)
        } catch (error) {
            console.error('Error fetching list of friends:', error)
        } finally {
            setLoading(false)
        }
    }

    const createPrivateChat = async (e: React.MouseEvent, friend: UserList) => {
        e.stopPropagation()
        try {
            if (!user?.id || !friend) return
            const response = await chatService.createPrivateChat({ userId1: user.id, userId2: friend.id })
            if (!response) return
            await fetchRoom()
            setRoomId(response.id)
            setTalkingWith(friend)
        } catch (error) {
            console.error('Error creating private chat:', error)
        }
    }

    if (!mounted) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spin size='large' />
            </div>
        )
    }

    return (
        <div className='bg-gray-100 h-[calc(100vh-64px)] p-4'>
            <Row gutter={[16, 16]} className=''>
                <Col xs={24} sm={8}>
                    <ChatFriendsList
                        friends={filteredFriends}
                        loading={loading}
                        onSearch={setSearchFriend}
                        onChatClick={createPrivateChat}
                    />

                    <ChatRoomsList
                        rooms={filteredRooms}
                        loading={loading}
                        onSearch={setSearchRoom}
                        onRoomSelect={setRoomId}
                        currentUserId={user?.id}
                        selectedRoomId={roomId}
                    />
                </Col>

                <Col xs={24} sm={16}>
                    <div className='bg-white rounded-lg shadow-md h-[calc(100vh-90px)] flex flex-col'>
                        <ChatHeader talkingWith={talkingWith} />

                        <ChatMessageList
                            messages={chatMessages[roomId] || []}
                            currentUserId={user?.id}
                        />

                        <TypingIndicator roomId={roomId} />

                        <ChatInput
                            roomId={roomId}
                            onSendMessage={handleSendMessage}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}