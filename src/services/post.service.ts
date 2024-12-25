import { Media } from "@/types/post";
import vonggaAxios from "../utils/vonggaAxios";
import { PostVisibility } from "@/types/post";

export interface CreatePost {
    content: string
    media?: Media[]
    tags?: string[]
    location?: Location
    visibility?: PostVisibility
    subPosts?: SubPost[]
    allowComments?: boolean
    allowReactions?: boolean
}

export interface Location {
    type: string
    coordinates: number[]
    placeName: string
}

export interface SubPost {
    content: string
    media: Media[]
    order: number
}

export interface GetPosts {
    limit?: number
    offset?: number
    userId: string
    includeSubPosts?: boolean
}


class PostService {
    async createPost(post: CreatePost) {
        try {
            if (!post.visibility) {
                post.visibility = 'public'
            }
            const response = await vonggaAxios.post('/posts', post)
            return response.data.post
        } catch (error: any) {
            console.error('createPost error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async getPosts({ limit = 10, offset = 0, userId, includeSubPosts = true }: GetPosts) {
        try {

            const response = await vonggaAxios.get(`/posts?limit=${limit}&offset=${offset}&userId=${userId}&includeSubPosts=${includeSubPosts}`)
            return response.data
        } catch (error: any) {
            console.error('getPosts error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new PostService()