
import vonggaAxios from "../utils/vonggaAxios";
import { ReactionType } from "../types/reaction";

interface CreateReaction {
    type: ReactionType;
    postId?: string;
    commentId?: string;
}

class ReactionService {
    async createReaction(reaction: CreateReaction) {
        try {
            const response = await vonggaAxios.post('/reactions', reaction)
            return response.data
        } catch (error: any) {
            console.error('createReaction error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async getReactionsPost(postId: string) {
        try {
            const response = await vonggaAxios.get(`/reactions/post/${postId}`)
            return response.data
        } catch (error: any) {
            console.error('getReactions error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async getReactionsComment(commentId: string) {
        try {
            const response = await vonggaAxios.get(`/reactions/comment/${commentId}`)
            return response.data
        } catch (error: any) {
            console.error('getReactionsComment error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async deleteReaction(id: string) {
        try {
            const response = await vonggaAxios.delete(`/reactions/${id}`)
            return response.data
        } catch (error: any) {
            console.error('deleteReaction error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new ReactionService()