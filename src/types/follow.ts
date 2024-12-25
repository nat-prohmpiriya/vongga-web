import { User } from './user'

export interface Follow {
    id: string
    followerId: string
    follower?: User
    followingId: string
    following?: User
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    version: number
}

export interface FollowRepository {
    create(follow: Follow): Promise<Follow>
    findById(id: string): Promise<Follow | null>
    softDelete(id: string): Promise<void>
    findByFollowerIdAndFollowingId(followerId: string, followingId: string): Promise<Follow | null>
    listFollowers(userId: string, params?: {
        page?: number
        limit?: number
    }): Promise<Follow[]>
    listFollowing(userId: string, params?: {
        page?: number
        limit?: number
    }): Promise<Follow[]>
}
