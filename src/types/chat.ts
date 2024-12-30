export interface ChatMessage {
    id: string
    roomId: string
    senderId: string
    content: string
    type: 'message' | 'typing' | 'ping' | 'pong' | 'userStatus'
    fileUrl?: string
    fileType?: string
    fileSize?: number
    readBy: string[]
    createdAt: string
    updatedAt: string
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

export interface User {
    id: string
    username: string
    displayName: string
    photoProfile: string
    firstName: string
    lastName: string
}

export interface WebSocketMessage {
    type: 'message' | 'typing' | 'ping' | 'pong' | 'userStatus'
    roomId: string
    senderId?: string
    content: string
    data?: any
    createdAt?: string
}

export interface RestApiMessage {
    type: 'message' | 'typing'
    roomId: string
    userId: string
    content: string
}

export interface ChatTyping {
    type: 'typing'
    roomId: string
    userId: string
    content: string
}
