import clientToken from '@/utils/clientToken'
import vonggaAxios from '@/utils/vonggaAxios'

export interface ChatMessage {
    id: string
    roomId: string
    senderId: string
    type: string
    content: string
    fileUrl?: string
    fileType?: string
    fileSize?: number
    readBy: string[]
    createdAt: string
    updatedAt: string

}

export interface User {
    id: string
    username: string
    displayName: string
    photoProfile: string
    firstName: string
    lastName: string
}

export interface ChatRoom {
    id: string
    name: string
    type: 'private' | 'group'
    members: string[]
    createdAt: string
    updatedAt: string
    users: User[]
    lastMessage?: {
        content: string
        createdAt: string
    }
}

export interface ChatNotification {
    id: string
    type: string
    content: string
    isRead: boolean
    createdAt: string
}

export interface UserStatus {
    userId: string
    status: 'online' | 'offline' | 'away'
    lastSeen: string
}

interface WebSocketMessage {
    type: 'message' | 'typing'
    roomId: string
    userId?: string
    content: string
}

class ChatService {
    private ws: WebSocket | null = null
    private messageQueue: any[] = []
    private token = clientToken

    // WebSocket Connection
    connect() {
        const token = this.token.getToken()

        // Check if token exists
        if (!token.accessToken) {
            console.warn('No access token found')
            return null
        }

        const wsUrl = `${process.env.NEXT_PUBLIC_VONGGA_API_URL}/ws?token=${token.accessToken}`

        try {
            this.ws = new WebSocket(wsUrl)

            this.ws.onopen = () => {
                // console.log('WebSocket connected')
                // Send queued messages
                this.messageQueue.forEach(msg => this.ws?.send(JSON.stringify(msg)))
                this.messageQueue = []
            }

            this.ws.onclose = (event) => {
                // console.log('WebSocket disconnected:', event.code, event.reason)

                // Don't reconnect if token is invalid (status code 1008)
                if (event.code === 1008) {
                    console.error('Invalid token, not attempting to reconnect')
                    return
                }

                // Try to reconnect after 5 seconds
                // console.log('Attempting to reconnect in 5 seconds...')
                setTimeout(() => this.connect(), 5000)
            }

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error)
            }

            this.ws.onmessage = (event) => {
                console.log('Received message:', event.data)
                const message = JSON.parse(event.data)
                this.handleMessage(message)
            }

            return this.ws
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error)
            return null
        }
    }

    disconnect() {
        this.ws?.close()
        this.ws = null
    }

    // Room Methods
    async createPrivateChat({ userId1, userId2 }: { userId1: string, userId2: string }): Promise<ChatRoom | null> {
        try {
            const response = await vonggaAxios.post('/chat/rooms/private', { userId1, userId2 })
            return response.data
        } catch (error: any) {
            console.error('createPrivateChat error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async createGroupChat(name: string, memberIds: string[]): Promise<ChatRoom | null> {
        try {
            const response = await vonggaAxios.post('/chat/rooms/group', { name, memberIds })
            return response.data
        } catch (error: any) {
            console.error('createGroupChat error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getUserChats(): Promise<ChatRoom[] | null> {
        try {
            const response = await vonggaAxios.get('/chat/rooms')
            return response.data
        } catch (error: any) {
            console.error('getUserChats error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async addMemberToGroup(roomId: string, userId: string): Promise<boolean> {
        try {
            await vonggaAxios.post(`/chat/rooms/${roomId}/members`, { userId })
            return true
        } catch (error: any) {
            console.error('addMemberToGroup error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return false
        }
    }

    async removeMemberFromGroup(roomId: string, userId: string): Promise<boolean> {
        try {
            await vonggaAxios.delete(`/chat/rooms/${roomId}/members/${userId}`)
            return true
        } catch (error: any) {
            console.error('removeMemberFromGroup error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return false
        }
    }

    // Message Methods
    async sendMessage(roomId: string, content: string, type: string = 'text'): Promise<ChatMessage | null> {
        try {
            if (!roomId || content === '') {
                console.warn('roomId or content not found')
                return null
            }
            console.log('Sending message:', { roomId, content, type })
            const response = await vonggaAxios.post('/chat/messages', { roomId, content, type })
            return response.data
        } catch (error: any) {
            console.error('sendMessage error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async sendFileMessage(roomId: string, file: File): Promise<ChatMessage | null> {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('roomId', roomId)

            const response = await vonggaAxios.post('/chat/messages/file', formData)
            return response.data
        } catch (error: any) {
            console.error('sendFileMessage error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getChatMessages(roomId: string, limit: number = 20, offset: number = 0): Promise<ChatMessage[] | null> {
        try {
            const response = await vonggaAxios.get(`/chat/rooms/${roomId}/messages`, {
                params: { limit, offset }
            })
            return response.data
        } catch (error: any) {
            console.error('getChatMessages error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async markMessageRead(messageId: string): Promise<boolean> {
        try {
            await vonggaAxios.put(`/chat/messages/${messageId}/read`)
            return true
        } catch (error: any) {
            console.error('markMessageRead error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return false
        }
    }

    // User Status Methods
    async updateUserStatus(isOnline: boolean): Promise<boolean> {
        try {
            await vonggaAxios.put('/chat/status', { isOnline })
            return true
        } catch (error: any) {
            console.error('updateUserStatus error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return false
        }
    }

    async getUserStatus(userId: string): Promise<UserStatus | null> {
        try {
            const response = await vonggaAxios.get(`/chat/status/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getUserStatus error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    // Notification Methods
    async getUserNotifications(): Promise<ChatNotification[] | null> {
        try {
            const response = await vonggaAxios.get('/chat/notifications')
            return response.data
        } catch (error: any) {
            console.error('getUserNotifications error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async markNotificationRead(notificationId: string): Promise<boolean> {
        try {
            await vonggaAxios.put(`/chat/notifications/${notificationId}/read`)
            return true
        } catch (error: any) {
            console.error('markNotificationRead error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return false
        }
    }

    // WebSocket Methods
    sendTypingStatus(roomId: string, isTyping: boolean) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'typing',
                roomId,
                isTyping
            }))
        }
    }

    // New Methods
    async getRooms(): Promise<ChatRoom[] | null> {
        try {
            const response = await vonggaAxios.get('/chat/rooms')
            return response.data
        } catch (error: any) {
            console.error('getRooms error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async createPrivateRoom(userId: string): Promise<ChatRoom | null> {
        try {
            const response = await vonggaAxios.post('/chat/rooms/private', { userId })
            return response.data
        } catch (error: any) {
            console.error('createPrivateRoom error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async createGroupRoom(name: string, memberIds: string[]): Promise<ChatRoom | null> {
        try {
            const response = await vonggaAxios.post('/chat/rooms/group', { name, memberIds })
            return response.data
        } catch (error: any) {
            console.error('createGroupRoom error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async sendMessageNew(roomId: string, content: string, type: string = 'text'): Promise<ChatMessage | null> {
        try {
            const response = await vonggaAxios.post('/chat/messages', { roomId, content, type })
            return response.data
        } catch (error: any) {
            console.error('sendMessageNew error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getRoomMessagesNew(roomId: string, limit: number = 50, offset: number = 0): Promise<ChatMessage[] | null> {
        try {
            const response = await vonggaAxios.get(`/chat/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`)
            return response.data
        } catch (error: any) {
            console.error('getRoomMessagesNew error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getChatMessagesNew(roomId: string): Promise<ChatMessage[] | null> {
        try {
            const response = await vonggaAxios.get(`/chat/rooms/${roomId}/messages`)
            return response.data
        } catch (error: any) {
            console.error('getChatMessagesNew error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    sendMessageNewMethod(roomId: string, content: string) {
        const message = {
            type: 'message',
            roomId,
            content
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
        } else {
            this.messageQueue.push(message)
        }
    }

    sendTypingStatusNew(roomId: string, isTyping: boolean) {
        const status = {
            type: 'typing',
            roomId,
            isTyping
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(status))
        }
    }

    async getMessages(roomId: string): Promise<ChatMessage[]> {
        try {
            console.log('Fetching messages for room:', roomId)
            const response = await vonggaAxios.get(`/chat/rooms/${roomId}/messages`)
            console.log('Raw API Response:', response)
            console.log('Response data:', response.data)
            console.log('Response data type:', typeof response.data)

            // ถ้า response.data เป็น string (อาจจะเป็น JSON string)
            let data = response.data
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) {
                    console.error('Failed to parse response data:', e)
                }
            }

            if (!data) {
                console.error('No data in response')
                return []
            }

            // ดูว่าข้อความอยู่ที่ data.messages หรือที่ data เลย
            const messages = Array.isArray(data.messages) ? data.messages :
                Array.isArray(data) ? data : []

            console.log('Parsed messages:', messages)
            return messages

        } catch (error: any) {
            console.error('Error getting messages:', {
                error: error.message,
                status: error.response?.status,
                data: error.response?.data
            })
            return []
        }
    }

    sendWebSocketMessage(message: WebSocketMessage) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            // ถ้า WebSocket ยังไม่พร้อม ให้เก็บข้อความไว้ใน queue
            this.messageQueue.push(message)
            return
        }
        this.ws.send(JSON.stringify(message))
    }

    handleMessage(message: any) {
        // Handle different message types
        switch (message.type) {
            case 'message':
                // Handle new message
                break
            case 'typing':
                // Handle typing status
                break
            default:
                console.warn('Unknown message type:', message.type)
        }
    }
}

export default new ChatService()