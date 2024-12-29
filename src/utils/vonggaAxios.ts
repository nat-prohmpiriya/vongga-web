import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import clientToken from './clientToken'
import serverToken from './serverToken'
import isClient from './isClient'

// ป้องกัน race condition ในการ refresh token
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const vonggaAxios = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_VONGGA_API_URL,
    timeout: 30000,
})

// เพิ่มฟังก์ชันสำหรับ retry request
const retryRequest = (request: InternalAxiosRequestConfig, accessToken: string) => {
    request.headers.Authorization = `Bearer ${accessToken}`
    return axios(request)
}

// จัดการ subscribers
const onRefreshed = (accessToken: string) => {
    refreshSubscribers.forEach(callback => callback(accessToken))
    refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

vonggaAxios.interceptors.request.use(
    async (config) => {
        try {
            // สำหรับ FormData ให้ browser จัดการ Content-Type เอง
            if (config.data instanceof FormData) {
                delete config.headers['Content-Type']
            }

            const { headers } = config
            if (headers.Authorization) return config

            if (isClient()) {
                const token = clientToken.getToken()
                if (!token.accessToken) {
                    throw new Error('No access token available')
                }
                headers.Authorization = `Bearer ${token.accessToken}`
            } else {
                const token = await serverToken.getToken()
                if (!token.accessToken) {
                    throw new Error('No access token available')
                }
                headers.Authorization = `Bearer ${token.accessToken}`
            }
            config.headers = headers
            return config
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => Promise.reject(error)
)

vonggaAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig

        // ถ้าไม่ใช่ 401 หรือเป็น request refresh token อยู่แล้ว ให้ reject เลย
        if (error?.response?.status !== 401 || 
            originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error)
        }

        try {
            // ถ้ากำลัง refresh token อยู่ ให้รอและ retry
            if (isRefreshing) {
                return new Promise(resolve => {
                    addRefreshSubscriber(token => {
                        resolve(retryRequest(originalRequest, token))
                    })
                })
            }

            isRefreshing = true

            // ดึง refresh token
            let refreshToken = ''
            if (isClient()) {
                refreshToken = clientToken.getToken().refreshToken
                if (!refreshToken) {
                    throw new Error('No refresh token available')
                }
            } else {
                const token = await serverToken.getToken()
                refreshToken = token.refreshToken
                if (!refreshToken) {
                    throw new Error('No refresh token available')
                }
            }

            // เรียก refresh token
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_VONGGA_API_URL}/auth/refresh`,
                { refreshToken },
                { timeout: 10000 } // timeout 10 วินาที
            )

            const newToken = response.data

            // บันทึก token ใหม่
            if (isClient()) {
                clientToken.setToken(newToken)
            } else {
                serverToken.setToken(newToken)
            }

            // แจ้ง subscribers และ retry requests ที่รอ
            onRefreshed(newToken.accessToken)
            isRefreshing = false

            // retry original request
            return retryRequest(originalRequest, newToken.accessToken)

        } catch (refreshError) {
            isRefreshing = false
            refreshSubscribers = []

            // จัดการ error และ logout ถ้าจำเป็น
            if (isClient()) {
                clientToken.clearToken()
                // ใช้ httpOnly cookie แทน localStorage
                document.cookie = 'auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                window.location.href = '/'
            }

            return Promise.reject(refreshError)
        }
    }
)

export default vonggaAxios
