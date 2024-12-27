import vonggaAxios from "@/utils/vonggaAxios";

class FriendShipService {
    async sendFriendRequest(userId: string) {
        try {
            const response = await vonggaAxios.post(`/friendship/request${userId}`)
            return response.data
        } catch (error: any) {
            console.error('followUser error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async acceptFriendRequest(userId: string) {
        try {
            const response = await vonggaAxios.post(`/friendship/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('unfollowUser error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async rejectFriendRequest(userId: string) {
        try {
            const response = await vonggaAxios.post(`/friendship/reject/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('unfollowUser error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
    async unFriend(userId: string) {
        try {
            const response = await vonggaAxios.post(`/friendship/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('unfollowUser error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
    async getFriendRequests() {
        try {
            const response = await vonggaAxios.get(`/friendship/requests`)
            return response.data
        } catch (error: any) {
            console.error('getFriendRequests error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new FriendShipService()