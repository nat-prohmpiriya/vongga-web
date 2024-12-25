import { User } from './user'
import { Post } from './post'
import { Comment } from './comment'

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
export type ReactionTargetType = 'post' | 'comment'

export interface Reaction {
    id: string
    userId: string
    user?: User
    targetId: string
    targetType: ReactionTargetType
    post?: Post
    comment?: Comment
    type: ReactionType
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    version: number
}

export interface ReactionRepository {
    create(reaction: Reaction): Promise<Reaction>
    findById(id: string): Promise<Reaction | null>
    update(reaction: Reaction): Promise<Reaction>
    softDelete(id: string): Promise<void>
    findByUserIdAndTarget(userId: string, targetId: string, targetType: ReactionTargetType): Promise<Reaction | null>
    listByTarget(targetId: string, targetType: ReactionTargetType, params?: {
        type?: ReactionType
        page?: number
        limit?: number
    }): Promise<Reaction[]>
    countByTarget(targetId: string, targetType: ReactionTargetType, type?: ReactionType): Promise<number>
}
