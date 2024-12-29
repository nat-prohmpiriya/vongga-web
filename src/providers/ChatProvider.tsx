'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import chatService, { ChatMessage } from '@/services/chat.service'
import { useAuthStore } from '@/store/auth.store'

interface ChatContextType {
    sendMessage: (roomId: string, content: string) => void
    sendTypingStatus: (roomId: string, isTyping: boolean) => void
    messages: { [roomId: string]: ChatMessage[] }
    typingUsers: { [roomId: string]: Set<string> }
    loadMessages: (roomId: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const user = useAuthStore((state) => state.user)
    const [messages, setMessages] = useState<{ [roomId: string]: ChatMessage[] }>({})
    const [typingUsers, setTypingUsers] = useState<{ [roomId: string]: Set<string> }>({})

    const loadMessages = async (roomId: string) => {
        try {
            console.log('Loading messages for room:', roomId)
            const response = await chatService.getMessages(roomId)
            if (response) {
                setMessages(prev => ({
                    ...prev,
                    [roomId]: response
                }))
            }
        } catch (error) {
            console.error('Error loading messages:', error)
        }
    }

    useEffect(() => {
        if (!user) return

        const ws = chatService.connect()
        if (!ws) {
            console.error('ChatProvider WebSocket connection failed')
            return
        }

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log('ws.onmessage', { message })

            switch (message.type) {
                case 'message':
                    setMessages(prev => ({
                        ...prev,
                        [message.roomId]: [...(prev[message.roomId] || []), message]
                    }))
                    break
                case 'typing':
                    if (!message.userId || message.userId === user.id) return // ไม่อัพเดทถ้าเป็นตัวเองที่พิมพ์
                    setTypingUsers(prev => {
                        const roomTyping = new Set(prev[message.roomId] || [])
                        if (message.content === "true") {
                            roomTyping.add(message.userId)
                        } else {
                            roomTyping.delete(message.userId)
                        }
                        return {
                            ...prev,
                            [message.roomId]: roomTyping
                        }
                    })
                    break
                default:
                    console.warn('Unknown message type:', message.type)
            }
        }

        return () => {
            ws.close()
        }
    }, [user])

    const sendMessage = (roomId: string, content: string) => {
        const message = {
            type: 'message',
            roomId,
            content
        }
        chatService.sendMessage(roomId, content)
    }

    const sendTypingStatus = (roomId: string, isTyping: boolean) => {
        const message = {
            type: 'typing',
            roomId,
            userId: user?.id,
            content: isTyping.toString()
        }
        chatService.sendMessage(roomId, isTyping.toString())
    }

    return (
        <ChatContext.Provider value={{
            sendMessage,
            sendTypingStatus,
            messages,
            typingUsers,
            loadMessages
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}