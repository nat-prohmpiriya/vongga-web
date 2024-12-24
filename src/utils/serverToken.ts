

interface ServerTokenInterface {
    accessToken: string
    refreshToken: string
}

class ServerToken {
    async getToken(): Promise<ServerTokenInterface> {
        const { cookies } = require('next/headers')
        const token = {
            accessToken: '',
            refreshToken: '',
        }
        if (typeof window !== 'undefined') return token

        token.accessToken = (await cookies()).get('accessToken')?.value || ''
        token.refreshToken = (await cookies()).get('refreshToken')?.value || ''

        return token
    }
    async setToken(token: ServerTokenInterface) {
        const { cookies } = require('next/headers')
        if (typeof window !== 'undefined') return
            ; (await cookies()).set('accessToken', token.accessToken)
            ; (await cookies()).set('refreshToken', token.refreshToken)
    }

    async clearToken() {
        const { cookies } = require('next/headers')
        if (typeof window !== 'undefined') return
            ; (await cookies()).delete('accessToken')
            ; (await cookies()).delete('refreshToken')
    }
}

export default new ServerToken()
