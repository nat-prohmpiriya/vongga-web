import axios from 'axios'
import { User } from '../types/user'
import Cookies from 'js-cookie'

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
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            return data
        } catch (error: any) {
            console.error('Error verifying Firebase token: error', {
                message: error.response.data.message,
                status: error.response.status
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
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            return data
        } catch (error: any) {
            console.error('Error refreshing token: error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new AuthService()
