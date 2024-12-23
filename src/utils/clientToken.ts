import cookies from 'js-cookie'

interface ClientTokenInterface {
    accessToken: string
    refreshToken: string
}

class ClientToken {
    getToken(): ClientTokenInterface {
        const token = { accessToken: '', refreshToken: '' }
        if (typeof window == 'undefined') return token
        token.accessToken = localStorage.getItem('accessToken') || ''
        token.refreshToken = localStorage.getItem('refreshToken') || ''
        return token
    }

    setToken({ accessToken, refreshToken }: ClientTokenInterface) {
        if (typeof window == 'undefined') return
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        cookies.set('accessToken', accessToken)
        cookies.set('refreshToken', refreshToken)
    }
    clearToken() {
        if (typeof window == 'undefined') return
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        cookies.remove('accessToken')
        cookies.remove('refreshToken')
    }
}

export default new ClientToken()
