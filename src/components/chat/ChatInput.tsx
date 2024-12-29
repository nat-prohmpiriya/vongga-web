import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '@/providers/ChatProvider'

interface ChatInputProps {
    roomId: string
    onSendMessage: (content: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ roomId, onSendMessage }) => {
    const { sendTypingStatus } = useChat()
    const [message, setMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleTyping = () => {
        if (!isTyping) {
            setIsTyping(true)
            sendTypingStatus(roomId, true)
        }

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        // Set new timeout
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false)
            sendTypingStatus(roomId, false)
        }, 3000) // หยุดสถานะพิมพ์หลังจากไม่มีการพิมพ์ 3 วินาที
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) return

        onSendMessage(message)
        setMessage('')
        // ยกเลิกสถานะกำลังพิมพ์เมื่อส่งข้อความ
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        setIsTyping(false)
        sendTypingStatus(roomId, false)
    }

    // Cleanup timeout เมื่อ component unmount
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
            }
            if (isTyping) {
                sendTypingStatus(roomId, false)
            }
        }
    }, [roomId, isTyping, sendTypingStatus])

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <input
                type="text"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value)
                    handleTyping()
                }}
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
