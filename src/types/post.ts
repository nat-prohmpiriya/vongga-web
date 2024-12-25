import { User } from './user'

export type PostType = 'text' | 'image' | 'video'
export type PostVisibility = 'public' | 'friends' | 'private'
export type MediaType = 'image' | 'video'

export const visibility = {
    PUBLIC: 'public',
    FRIENDS: 'friends',
    PRIVATE: 'private'
}

export interface Media {
    url: string
    type: MediaType
    thumbnail?: string
}

export interface Location {
    type: string
    coordinates: number[]
    placeName: string
}

export interface EditLog {
    userId: string
    user?: User
    content: string
    editedAt: string // ISO date string
}

export interface Post {
    id: string
    userId: string
    user?: User
    type: PostType
    content: string
    media?: Media[]
    tags?: string[]
    location?: Location
    visibility: PostVisibility
    allowComments: boolean
    allowReactions: boolean
    commentsCount: number
    reactionsCount: number
    sharesCount: number
    viewsCount: number
    subPosts?: SubPost[]
    editLogs?: EditLog[]
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    deletedAt?: string // ISO date string
    version: number
}

export interface SubPost {
    id: string
    postId: string
    userId: string
    user?: User
    type: PostType
    content: string
    media?: Media[]
    order: number
    visibility: PostVisibility
    allowComments: boolean
    allowReactions: boolean
    commentsCount: number
    reactionsCount: number
    sharesCount: number
    viewsCount: number
    editLogs?: EditLog[]
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    deletedAt?: string // ISO date string
    version: number
}

export interface PostRepository {
    create(post: Post): Promise<Post>
    findById(id: string): Promise<Post | null>
    update(post: Post): Promise<Post>
    softDelete(id: string): Promise<void>
    list(params: {
        userId?: string
        visibility?: PostVisibility
        page?: number
        limit?: number
    }): Promise<Post[]>
}

export interface SubPostRepository {
    create(subPost: SubPost): Promise<SubPost>
    findById(id: string): Promise<SubPost | null>
    update(subPost: SubPost): Promise<SubPost>
    softDelete(id: string): Promise<void>
    listByPostId(postId: string): Promise<SubPost[]>
}
