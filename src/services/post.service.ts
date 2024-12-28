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
    hasMedia?: boolean
    mediaType?: 'image' | 'video'
}


class PostService {
    async createPost(post: CreatePost | FormData) {
        try {
            let config = {}
            let postData = post

            if (!(post instanceof FormData)) {
                if (!post.visibility) {
                    post.visibility = 'public'
                }
            } else {
                config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            }

            const response = await vonggaAxios.post('/posts', postData, config)
            return response.data.post
        } catch (error: any) {
            console.error('createPost error', {
                message: error.response?.data?.message,
                status: error.response?.status
            })
            throw error
        }
    }

    async getPosts({ limit = 10, offset = 0, userId, includeSubPosts = true }: GetPosts) {
        try {

            const response = await vonggaAxios.get(`/posts?limit=${limit}&offset=${offset}&userId=${userId}&includeSubPosts=${includeSubPosts}`)
            return response.data
        } catch (error: any) {
            console.error('getPosts error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getPostVideos(userId: string) {
        try {
            const url = `posts?limit=10&offset=0&userId=${userId}&includeSubPosts=true&hasMedia=true&mediaType=video`
            const response = await vonggaAxios.get(url)
            return response.data
        } catch (error: any) {
            console.error('getPostVideos error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getPostImages(userId: string) {
        try {
            const url = `posts?limit=10&offset=0&userId=${userId}&includeSubPosts=true&hasMedia=true&mediaType=image`
            const response = await vonggaAxios.get(url)
            return response.data
        } catch (error: any) {
            console.error('getPostImages error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async deletePost(id: string) {
        try {
            const response = await vonggaAxios.delete(`/posts/${id}`)
            return response.data
        } catch (error: any) {
            console.error('deletePost error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
}

export default new PostService()