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
    createdAt: Date
    updatedAt: Date

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
    createdAt: Date
    updatedAt: Date
    users: User[]
}

export interface ChatNotification {
    id: string
    type: string
    content: string
    isRead: boolean
    createdAt: Date
}

export interface UserStatus {
    userId: string
    status: 'online' | 'offline' | 'away'
    lastSeen: Date
}

class ChatService {
    private ws: WebSocket | null = null
    private messageQueue: any[] = []
    private token = clientToken

    // WebSocket Connection
    connect() {
        const token = this.token.getToken()

        const wsUrl = `${process.env.NEXT_PUBLIC_VONGGA_API_URL}/ws?token=${token.accessToken}`
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {

            this.messageQueue.forEach(msg => this.ws?.send(JSON.stringify(msg)))
            this.messageQueue = []
        }

        this.ws.onclose = () => {

            // Try to reconnect after 5 seconds
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
    }

    handleMessage(message: any) {
        console.log('Received message:', message)
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
}

export default new ChatService()