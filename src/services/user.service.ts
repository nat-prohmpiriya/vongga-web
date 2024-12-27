import vonggaAxios from '@/utils/vonggaAxios'
import { User } from '@/types/user'

interface UserListRequest {
    page: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
    search: string;
}

export interface UserList {
    id: string;
    username: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    photoProfile: string;
    photoCover: string;
    followersCount: number;
    followingCount: number;
    friendsCount: number;
}

export interface UserListResponse {
    users: UserList[];
    totalCount: number;
    page: number;
    pageSize: number;
}

class UserService {
    async getUserInfoByUsername(username: string): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/${username}`)
            return response.data.user
        } catch (error: any) {
            console.error('getUserInfoByUsername error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
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
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getMyProfile(): Promise<User | null> {
        try {
            const response = await vonggaAxios.get(`/users/me`)
            return response?.data?.user
        } catch (error: any) {
            console.error('getMyProfile error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getUsers(req: UserListRequest): Promise<UserListResponse | null> {
        try {
            const response = await vonggaAxios.get(`/users/list?page=${req.page}&pageSize=${req.pageSize}&sortBy=${req.sortBy}&sortDir=${req.sortDir}&search=${req.search}`)
            return response.data
        } catch (error: any) {
            console.error('getUsers error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
}

export default new UserService()
