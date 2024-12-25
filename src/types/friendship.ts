import { User } from './user'

export type FriendshipStatus = 'pending' | 'accepted' | 'rejected' | 'blocked'

export interface Friendship {
    id: string
    userId: string
    user?: User
    friendId: string
    friend?: User
    status: FriendshipStatus
    actionUserId: string
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    version: number
}

export interface FriendshipRepository {
    create(friendship: Friendship): Promise<Friendship>
    findById(id: string): Promise<Friendship | null>
    update(friendship: Friendship): Promise<Friendship>
    softDelete(id: string): Promise<void>
    findByUserIdAndFriendId(userId: string, friendId: string): Promise<Friendship | null>
    listByUserId(userId: string, params?: {
        status?: FriendshipStatus
        page?: number
        limit?: number
    }): Promise<Friendship[]>
}
