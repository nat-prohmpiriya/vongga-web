import { User } from './user'
import { Post } from './post'

export interface Comment {
    id: string
    postId: string
    post?: Post
    userId: string
    user?: User
    parentId?: string
    parent?: Comment
    content: string
    media?: {
        url: string
        type: string
    }[]
    reactionsCount: number
    repliesCount: number
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    version: number
}

export interface CommentRepository {
    create(comment: Comment): Promise<Comment>
    findById(id: string): Promise<Comment | null>
    update(comment: Comment): Promise<Comment>
    softDelete(id: string): Promise<void>
    listByPostId(postId: string, params?: {
        parentId?: string
        page?: number
        limit?: number
    }): Promise<Comment[]>
}
