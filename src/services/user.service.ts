import vonggaAxios from '@/utils/vonggaAxios'
import { User } from '@/types/user'

class UserService {
    async getUserInfoByUsername(username: string): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/${username}`)
            return response.data.user
        } catch (error: any) {
            console.error('getUserInfoByUsername error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async updateUserProfile(data: any): Promise<User | null> {
        try {
            const response = await vonggaAxios.patch(`/users`, data)
            return response.data.user
        } catch (error: any) {
            console.error('updateUserProfile error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }

    async getMyProfile(): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/me`)
            return response.data.user
        } catch (error: any) {
            console.error('getMyProfile error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new UserService()
