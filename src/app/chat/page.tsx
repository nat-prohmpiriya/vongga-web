'use client'

import { useChat } from '@/providers/ChatProvider'
import { Row, Col, Spin } from 'antd'
import { useState, useEffect } from 'react'
import userService, { UserList } from '@/services/user.service'
import { useAuthStore } from '@/store/auth.store'
import chatService from '@/services/chat.service'
import { ChatFriendsList } from '@/components/chat/ChatFriendsList'
import { ChatRoomsList } from '@/components/chat/ChatRoomsList'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessageList } from '@/components/chat/ChatMessageList'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import ChatInput from '@/components/chat/ChatInput'
import { ChatRoom } from '@/types/chat'

export default function ChatRoomPage() {
    const { user } = useAuthStore()
    const { sendMessage, messages, fetchMessages } = useChat()
    const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([])
    const [currentChatRoom, setCurrentChatRoom] = useState<ChatRoom | null>(null)

    const fetchRoom = async () => {
        try {
            const rooms = await chatService.getRooms()
            if (!rooms) return console.error('Error fetching rooms')
            setChatRoomList(rooms)
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
        }
    }

    const createPrivateChat = async (e: React.MouseEvent, friend: UserList) => {
        e.stopPropagation()
        try {
            if (!user?.id || !friend) return
            const response = await chatService.createPrivateRoom(friend.id)
            if (!response) return
            await fetchRoom()
        } catch (error) {
            console.error('Error creating private chat:', error)
        }
    }

    useEffect(() => {
        fetchRoom()
    }, [])

    useEffect(() => {
        if (currentChatRoom?.id) {
            fetchMessages(currentChatRoom.id)
        }
    }, [currentChatRoom])

    return (
        <div className='bg-gray-100 h-[calc(100vh-64px)] p-4'>
            <Row gutter={[16, 16]} className=''>
                <Col xs={24} sm={8}>
                    {/* <ChatFriendsList onChatClick={createPrivateChat} /> */}

                    <ChatRoomsList
                        chatRoomList={chatRoomList} setCurrentChatRoom={setCurrentChatRoom} currentChatRoom={currentChatRoom} />
                </Col>

                <Col xs={24} sm={16}>
                    <div className='bg-white rounded-lg shadow-md h-[calc(100vh-90px)] flex flex-col'>
                        <ChatHeader
                            currentChatRoom={currentChatRoom}
                            setCurrentChatRoom={setCurrentChatRoom}
                        />

                        <ChatMessageList
                            messages={messages[currentChatRoom?.id || ''] || []}
                            currentChatRoom={currentChatRoom}
                        />

                        {/* <TypingIndicator currentChatRoomId={currentChatRoom?.id || ''} /> */}

                        <ChatInput roomId={currentChatRoom?.id || ''} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}