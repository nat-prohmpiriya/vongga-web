import vonggaAxios from '@/utils/vonggaAxios'
import { User } from '@/types/user'

class UserService {
    async getUserInfoByUsername(username: string): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/${username}`)
            return response.data.user
        } catch (error: any) {
            console.log('getUserInfoByUsername', error)
            return null
        }
    }

    async updateUserProfile(data: any): Promise<User | null> {
        try {
            const response = await vonggaAxios.patch(`/users`, data)
            return response.data.user
        } catch (error: any) {
            console.log('updateUserProfile', error)
            return null
        }
    }
}

export default new UserService()
