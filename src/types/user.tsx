export type AuthProvider = 'google' | 'apple' | 'email'

export interface GeoLocation {
    type: string
    coordinates: number[]
}

export interface DatingPhoto {
    url: string
    isMain: boolean
    isApproved: boolean
}

export interface BaseModel {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt?: string
    isActive: boolean
    version: number
}

export interface User extends BaseModel {
    username: string
    email: string
    firstName: string
    lastName: string
    avatar: string
    bio: string
    photoProfile: string
    photoCover: string
    followersCount: number
    followingCount: number
    friendsCount: number
    provider: AuthProvider
    emailVerified: boolean
    dateOfBirth: string
    gender: string
    interestedIn: string[]
    location: GeoLocation
    relationStatus: string
    height: number
    interests: string[]
    occupation: string
    education: string
    datingPhotos: DatingPhoto[]
    isVerified: boolean
    phoneNumber?: string
}

export interface UpdateUserRequest {
    firstName?: string
    lastName?: string
    username?: string
    bio?: string
    avatar?: string
    photoProfile?: string
    photoCover?: string
    dateOfBirth?: string
    gender?: string
    interestedIn?: string[]
    location?: GeoLocation
    relationStatus?: string
    height?: number
    interests?: string[]
    occupation?: string
    education?: string
    phoneNumber?: string
}

export interface UserResponse {
    user: User
}

export interface CheckUsernameResponse {
    available: boolean
    error?: string
}
