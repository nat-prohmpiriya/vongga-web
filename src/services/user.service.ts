import vonggaAxios from '@/utils/vonggaAxios'
import { User } from '@/types/user'

class UserService {
    async getUserInfoByUsername(username: string): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/${username}`)
            return response.data.user
        } catch (error: any) {
            console.log(error)
            return null
        }
    }
}

export default new UserService()
