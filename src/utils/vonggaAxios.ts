import axios from 'axios'
import clientToken from './clientToken'
import serverToken from './serverToken'
import isClient from './isClient'

const vonggaAxios = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_VONGGA_API_URL,
    timeout: 30000,
})

vonggaAxios.interceptors.request.use(
    async (config) => {
        // For multipart/form-data, let the browser set the Content-Type
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        const { headers } = config
        if (headers.Authorization) return config

        if (isClient()) {
            const token = clientToken.getToken()
            headers.Authorization = `Bearer ${token.accessToken}`
        } else {
            const token = await serverToken.getToken()
            headers.Authorization = `Bearer ${token.accessToken}`
        }
        config.headers = headers
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

vonggaAxios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        console.log(error)
        if (error?.response?.status !== 401) return Promise.reject(error)
        try {
            let refreshToken = ''
            if (isClient()) {
                refreshToken = clientToken.getToken().refreshToken
            } else {
                refreshToken = (await serverToken.getToken()).refreshToken
            }

            await axios.post(`${process.env.NEXT_PUBLIC_VONGGA_API_URL}/auth/refresh`, { refreshToken })
                .then((response) => {
                    const token = response.data
                    if (isClient()) {
                        clientToken.setToken(token)
                    } else {
                        serverToken.setToken(token)
                    }
                    const retryConfig = error.config
                    retryConfig.headers.Authorization = `Bearer ${token.accessToken}`
                    return axios(retryConfig)
                })
                .catch((error) => {
                    console.error('Error refreshing token expired: ', {
                        message: error?.response?.data?.message,
                        status: error?.response?.status
                    })
                    if (isClient()) {
                        clientToken.clearToken()
                        localStorage.removeItem('auth-storage')
                        window.location.href = '/'
                    }
                    return Promise.reject(error)
                })


        } catch (error) {
            return Promise.reject(error)
        }
    }
)

export default vonggaAxios
