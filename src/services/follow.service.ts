import vonggaAxios from "@/utils/vonggaAxios";


class FollowService {
    async followUser(userId: string) {
        try {
            const response = await vonggaAxios.get(`/follow/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getFollowers error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async unfollowUser(userId: string) {
        try {
            const response = await vonggaAxios.delete(`/follow/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getFollowers error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async blockUser(userId: string) {
        try {
            const response = await vonggaAxios.get(`/follow/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getFollowers error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async unblockUser(userId: string) {
        try {
            const response = await vonggaAxios.delete(`/follow/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getFollowers error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new FollowService()