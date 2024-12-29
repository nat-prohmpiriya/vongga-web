import clientToken from '@/utils/clientToken'
import vonggaAxios from '@/utils/vonggaAxios'

interface ChatMessage {
    id: string
    roomId: string
    senderId: string
    type: string
    content: string
    fileUrl?: string
    fileType?: string
    fileSize?: number
    readBy: string[]
    createdAt: Date
    updatedAt: Date
}

interface ChatRoom {
    id: string
    name: string
    type: 'private' | 'group'
    members: string[]
    createdAt: Date
    updatedAt: Date
}

class ChatService {
    private ws: WebSocket | null = null
    private messageQueue: any[] = []
    private token = clientToken

    // WebSocket Connection
    connect() {
        const token = this.token.getToken()
        this.ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/api/chat/ws`)

        this.ws.onopen = () => {
            console.log('Connected to chat')
            // Send queued messages
            this.messageQueue.forEach(msg => this.ws?.send(JSON.stringify(msg)))
            this.messageQueue = []
        }

        this.ws.onclose = () => {
            console.log('Disconnected from chat')
            // Implement reconnection logic
            setTimeout(() => this.connect(), 1000)
        }

        return this.ws
    }

    disconnect() {
        this.ws?.close()
        this.ws = null
    }

    // REST API Methods
    async createPrivateChat(userId: string): Promise<ChatRoom> {
        const response = await fetch('/api/chat/rooms/private', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            },
            body: JSON.stringify({ userId })
        })
        return response.json()
    }

    async createGroupChat(name: string, memberIds: string[]): Promise<ChatRoom> {
        const response = await fetch('/api/chat/rooms/group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            },
            body: JSON.stringify({ name, memberIds })
        })
        return response.json()
    }

    async getUserChats(): Promise<ChatRoom[]> {
        const response = await fetch('/api/chat/rooms', {
            headers: {
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            }
        })
        return response.json()
    }

    async getChatMessages(roomId: string, limit = 20, offset = 0): Promise<ChatMessage[]> {
        const response = await fetch(`/api/chat/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            }
        })
        return response.json()
    }

    async addMemberToGroup(roomId: string, userId: string): Promise<void> {
        await fetch(`/api/chat/rooms/${roomId}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            },
            body: JSON.stringify({ userId })
        })
    }

    async removeMemberFromGroup(roomId: string, userId: string): Promise<void> {
        await fetch(`/api/chat/rooms/${roomId}/members/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            }
        })
    }

    // WebSocket Methods
    sendMessage(roomId: string, content: string) {
        const message = {
            type: 'message',
            roomId,
            content,
            createdAt: new Date()
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
        } else {
            // Queue message if WebSocket is not connected
            this.messageQueue.push(message)
        }
    }

    async sendFileMessage(roomId: string, file: File) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('roomId', roomId)

        const response = await fetch('/api/chat/messages/file', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token.getToken().accessToken}`
            },
            body: formData
        })
        return response.json()
    }

    // Typing Indicators
    sendTypingStatus(roomId: string, isTyping: boolean) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'typing',
                roomId,
                isTyping
            }))
        }
    }
}

export const chatService = new ChatService()