import vonggaAxios from "@/utils/vonggaAxios";

interface CreateComment {
    content: string
    postId: string
    parentId?: string
}

class CommentService {
    async createComment({ content, postId, parentId }: CreateComment) {
        try {
            const response = await vonggaAxios.post(`/comments/posts/${postId}`, { 
                content,
                parentId 
            })
            return response.data
        } catch (error: any) {
            console.error('createComment error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }

    }

    async getComments(postId: string, parentId?: string) {
        try {
            const params = parentId ? `?parentId=${parentId}` : ''
            const response = await vonggaAxios.get(`/comments/posts/${postId}${params}`)
            return response.data
        } catch (error: any) {
            console.error('getComments error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }

    }

    async deleteComment(id: string) {
        try {
            const response = await vonggaAxios.delete(`/comments/${id}`)
            return response.data
        } catch (error: any) {
            console.error('deleteComment error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new CommentService()