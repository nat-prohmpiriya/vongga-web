"use client"

import { ChatMessage, ChatRoom, User } from '@/types/chat'
import { Avatar } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { UserOutlined } from '@ant-design/icons'
import { useChat } from '@/providers/ChatProvider'

interface ChatMessageListProps {
    messages: ChatMessage[]
    currentChatRoom: ChatRoom | null
}

export default function ChatMessageList({ messages, currentChatRoom }: ChatMessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { user } = useAuthStore()
    const { onlineUsers } = useChat()
    const [talkingWith, setTalkingWith] = useState<User | null>(null)

    useEffect(() => {
        if (currentChatRoom) {
            const member = currentChatRoom.users.find(m => m.id !== user?.id)
            if (member) {
                setTalkingWith(member)
            }
        }
    }, [currentChatRoom])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const formatTime = (time: string) => {
        return dayjs(time).format('HH:mm')
    }

    return (
        <div className='flex flex-col gap-2 bg-white p-4 h-[calc(100vh-225px)] overflow-y-auto no-scrollbar'>
            {talkingWith && (
                <div className='text-center text-sm text-gray-500 mb-2'>
                    {onlineUsers.has(talkingWith.id) ? (
                        <span className='text-green-500'>● ออนไลน์</span>
                    ) : (
                        <span>● ออฟไลน์</span>
                    )}
                </div>
            )}
            {talkingWith && messages.map((message, index) => {
                const isCurrentUser = message.senderId === user?.id
                return (
                    <div key={message.id} className={`flex items-start gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                        <div className='flex flex-col justify-center items-center border border-gray-300 h-7 w-7  rounded-full'>
                            <Avatar
                                size="small"
                                className={`mt-1 ${!isCurrentUser ? 'order-first' : 'order-last'}  `}
                                src={isCurrentUser ? user?.photoProfile : talkingWith?.photoProfile || undefined}
                                icon={!isCurrentUser ? <UserOutlined /> : talkingWith?.photoProfile ? undefined : <UserOutlined />}
                            />
                        </div>
                        <div className={`max-w-[70%] ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
                            <div className='break-words'>{message.content}</div>
                            <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                {formatTime(message.createdAt)}
                            </div>
                        </div>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}
