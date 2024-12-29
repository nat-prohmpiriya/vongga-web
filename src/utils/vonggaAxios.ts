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

// Retry request helper
const retryRequest = (request: InternalAxiosRequestConfig, accessToken: string) => {
    request.headers.Authorization = `Bearer ${accessToken}`
    return axios(request)
}

// Subscriber helpers
const onRefreshed = (accessToken: string) => {
    refreshSubscribers.forEach(callback => callback(accessToken))
    refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

// Request interceptor
vonggaAxios.interceptors.request.use(
    async (config) => {
        try {
            if (config.data instanceof FormData) {
                delete config.headers['Content-Type']
            }

            const { headers } = config
            if (headers.Authorization) return config

            // Auto detect environment
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
                // Add server-side specific header
                headers['X-Request-Type'] = 'server'
            }

            config.headers = headers
            return config
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => Promise.reject(error)
)

// Response interceptor
vonggaAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig

        if (error?.response?.status !== 401 || 
            originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error)
        }

        try {
            if (isRefreshing) {
                return new Promise(resolve => {
                    addRefreshSubscriber(token => {
                        resolve(retryRequest(originalRequest, token))
                    })
                })
            }

            isRefreshing = true

            let refreshToken = ''
            // Auto detect environment
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

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_VONGGA_API_URL}/auth/refresh`,
                { refreshToken },
                { 
                    timeout: isClient() ? 10000 : 5000,
                    headers: isClient() ? {} : { 'X-Request-Type': 'server' }
                }
            )

            const newToken = response.data

            if (isClient()) {
                clientToken.setToken(newToken)
            } else {
                serverToken.setToken(newToken)
            }

            onRefreshed(newToken.accessToken)
            isRefreshing = false

            return retryRequest(originalRequest, newToken.accessToken)

        } catch (refreshError) {
            isRefreshing = false
            refreshSubscribers = []

            if (isClient()) {
                clientToken.clearToken()
                document.cookie = 'auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                window.location.href = '/'
            }

            return Promise.reject(refreshError)
        }
    }
)

export default vonggaAxios
