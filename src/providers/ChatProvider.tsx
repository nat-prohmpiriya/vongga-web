'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import chatService, { ChatMessage, RequestSendMessage } from '@/services/chat.service'
import { useAuthStore } from '@/store/auth.store'
import clientToken from '@/utils/clientToken'

interface ChatContextType {
    sendMessage: (message: RequestSendMessage) => void
    sendTypingStatus: (message: RequestSendMessage) => void
    messages: ChatMessage[]
    fetchMessages: (roomId: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const user = useAuthStore((state) => state.user)
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);



    useEffect(() => {
        const accessToken = clientToken.getToken().accessToken
        const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/ws?token=' + accessToken
        const ws = new WebSocket(url)

        ws.onopen = () => {
            console.log('ChatProvider: WebSocket connection opened')
        }

        ws.onmessage = (event) => { // Handle incoming messages
            console.log('ChatProvider: Received message:', JSON.stringify(event.data))
        }

        ws.onclose = () => {
            console.log('ChatProvider: WebSocket connection closed')
        }

        ws.onerror = (error) => {
            console.error('ChatProvider: WebSocket error:', error)
        }

        setSocket(ws)

        return () => {
            console.log('ChatProvider: WebSocket connection closed')
            ws.close()
        }
    }, [user])

    const sendMessage = (message: RequestSendMessage) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (message.type === 'message') {
                socket.send(JSON.stringify(message))
                chatService.sendMessage(message)
            }
        } else {
            console.error('ChatProvider: WebSocket is not open. Unable to send message.')
        }
    }

    const sendTypingStatus = (message: RequestSendMessage) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            if (message.type === 'typing') {
                socket.send(JSON.stringify(message))
            }
        } else {
            console.error('ChatProvider: WebSocket is not open. Unable to send typing status.')
        }
    }

    const fetchMessages = async (roomId: string) => {
        try {
            const messages = await chatService.getMessages(roomId)
            if (!messages) throw new Error('ChatProvider: Error fetching messages')
            setMessages(messages)
        } catch (error) {
            console.error('ChatProvider: Error fetching messages:', error)
        }
    }



    return (
        <ChatContext.Provider value={{
            sendMessage,
            sendTypingStatus,
            messages,
            fetchMessages,
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