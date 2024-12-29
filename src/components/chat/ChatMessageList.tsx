import { ChatMessage } from '@/services/chat.service'
import { Avatar } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'

interface ChatMessageListProps {
    messages: ChatMessage[]
    currentUserId: string | undefined
}

export const ChatMessageList = ({
    messages,
    currentUserId
}: ChatMessageListProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const formatTime = (time: string) => {
        return dayjs(time).format('HH:mm')
    }

    return (
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUserId
                const showAvatar = index === 0 || 
                    messages[index - 1].senderId !== message.senderId

                return (
                    <div
                        key={message.id}
                        className={`flex items-start gap-2 ${
                            isCurrentUser ? 'flex-row-reverse' : ''
                        }`}
                    >
                        {showAvatar && (
                            <Avatar
                                size="small"
                                className={`mt-1 ${!isCurrentUser ? 'order-first' : 'order-last'}`}
                            />
                        )}
                        <div
                            className={`max-w-[70%] ${
                                isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            } rounded-lg px-3 py-2`}
                        >
                            <div className='break-words'>{message.content}</div>
                            <div
                                className={`text-xs mt-1 ${
                                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                }`}
                            >
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
