"use client"

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@/providers/ChatProvider'
import { RequestSendMessage } from '@/services/chat.service'
import { useAuthStore } from '@/store/auth.store'

interface ChatInputProps {
    roomId: string
}

const ChatInput = ({ roomId }: ChatInputProps) => {
    const { user } = useAuthStore()
    const [message, setMessage] = useState('')
    const { sendMessage, sendTypingStatus } = useChat()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
        if (!user?.id) return
        sendTypingStatus({
            type: 'typing',
            roomId,
            userId: user?.id,
            content: e.target.value

        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user?.id) return
        sendMessage({
            roomId,
            userId: user?.id,
            content: message,
            type: 'message'
        })
        setMessage('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <input
                type="text"
                value={message}
                onChange={handleOnChange}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                ส่ง
            </button>
        </form>
    )
}

export default ChatInput
