"use client"

import { useChat } from '@/providers/ChatProvider'
import { ChatRoom } from '@/services/chat.service'
import { useEffect, useState } from 'react'

interface TypingIndicatorProps {
    currentChatRoomId: string
}

export const TypingIndicator = ({ currentChatRoomId }: TypingIndicatorProps) => {
    const { sendTypingStatus } = useChat()
    const [typingNames, setTypingNames] = useState<string[]>([])

    useEffect(() => {
        const users = typingUsers[currentChatRoomId]
        if (users) {
            setTypingNames(Array.from(users))
        } else {
            setTypingNames([])
        }
    }, [typingUsers, currentChatRoomId])

    if (typingNames.length === 0) return null

    return (
        <div className='px-4 py-2'>
            <div className='text-sm text-gray-500 italic'>
                {typingNames.length === 1 ? (
                    <span>{typingNames[0]} กำลังพิมพ์...</span>
                ) : (
                    <span>มีหลายคนกำลังพิมพ์...</span>
                )}
            </div>
        </div>
    )
}
