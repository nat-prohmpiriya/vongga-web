"use client"

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@/providers/ChatProvider'
import { useAuthStore } from '@/store/auth.store'
import { ChatMessage, ChatTyping } from '@/types/chat'

interface ChatInputProps {
    roomId: string
}

const ChatInput = ({ roomId }: ChatInputProps) => {
    const { user } = useAuthStore()
    const [message, setMessage] = useState('')
    const { sendMessage, sendTyping } = useChat()
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
        if (!user?.id) return

        // ส่ง typing status
        sendTyping(roomId, true)

        // ยกเลิก timeout เก่า
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        // ตั้ง timeout ใหม่เพื่อส่ง stop typing หลังจากหยุดพิมพ์ 1 วินาที
        typingTimeoutRef.current = setTimeout(() => {
            sendTyping(roomId, false)
        }, 1000)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.trim() || !user?.id) return

        // ส่งข้อความ
        sendMessage(roomId, message)

        // เคลียร์ input และ typing status
        setMessage('')
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
    }

    // Cleanup timeout เมื่อ component unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
        }
    }, [roomId, sendTyping])

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <input
                type="text"
                value={message}
                onChange={handleTyping}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!message.trim()}
            >
                ส่ง
            </button>
        </form>
    )
}

export default ChatInput
