import axios from 'axios'
import { User } from '../types/user'
import vonggaAxios from '@/utils/vonggaAxios'
import clientToken from '@/utils/clientToken'

interface LoginResponse {
    user: User
    accessToken: string
    refreshToken: string
}

class AuthService {
    // return User and token interface
    async verifyTokenFirebase(accessToken: string): Promise<LoginResponse> {
        try {
            const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/verifyTokenFirebase'
            const { data } = await axios.post(url, { firebaseToken: accessToken })
            clientToken.setToken(data)
            return data
        } catch (error) {
            console.error('Error verifying Firebase token: ', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            throw error
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/refresh'
            const { data } = await axios.post(url, {
                refreshToken: refreshToken,
            })
            clientToken.setToken(data)
            return data
        } catch (error) {
            console.error('Error refreshing token: ', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
    async logout() {
        try {
            const refreshToken = localStorage.getItem('refreshToken')
            const resultLogout = await vonggaAxios.post('/auth/logout', { refreshToken })
            clientToken.clearToken()
            return resultLogout
        } catch (error) {
            console.error('Error logging out: ', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
}

export default new AuthService()
