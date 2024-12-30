import clientToken from '@/utils/clientToken'
import vonggaAxios from '@/utils/vonggaAxios'
import { ChatMessage, ChatRoom, RestApiMessage, User, WebSocketMessage } from '@/types/chat'

class ChatService {

    // Room Methods
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
    async sendMessage(message: RestApiMessage): Promise<ChatMessage | null> {
        try {
            if (!message.roomId || message.content === '') {
                console.warn('roomId or content not found')
                return null
            }

            const response = await vonggaAxios.post('/chat/messages', message)
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

    async getMessages(roomId: string, limit: number = 50, offset: number = 0): Promise<ChatMessage[] | null> {
        try {
            const response = await vonggaAxios.get(`/chat/rooms/${roomId}/messages`, {
                params: { limit, offset }
            })
            return response.data
        } catch (error: any) {
            console.error('getMessages error', {
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

    async getUserStatus(userId: string): Promise<User | null> {
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
    async getUserNotifications(): Promise<any[] | null> {
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

}

export default new ChatService()