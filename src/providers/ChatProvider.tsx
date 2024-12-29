'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import chatService from '@/services/chat.service'
import { useAuthStore } from '@/store/auth.store'

interface ChatContextType {
    sendMessage: (roomId: string, content: string) => void
    sendTypingStatus: (roomId: string, isTyping: boolean) => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        if (!user) return
        // เริ่มต้นการเชื่อมต่อ WebSocket
        const ws = chatService.connect()
        if (!ws) {
            console.error('ChatProvider WebSocket connection failed')
            return
        }
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log('ws.onmessage', { message })
            // จัดการข้อความที่ได้รับ
            switch (message.type) {
                case 'message':
                    // อัพเดท state ข้อความ
                    break
                case 'typing':
                    // อัพเดท typing status
                    break
                // จัดการ events อื่นๆ
            }
        }

        // Cleanup เมื่อ unmount
        return () => chatService.disconnect()
    }, [user])

    const value = {
        sendMessage: chatService.sendMessage.bind(chatService),
        sendTypingStatus: chatService.sendTypingStatus.bind(chatService)
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChat must be used within ChatProvider')
    }
    return context
}