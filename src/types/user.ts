export type AuthProvider = 'google' | 'apple' | 'email'

export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export type InterestedIn = 'MALE' | 'FEMALE' | 'OTHER'

export interface GeoLocation {
    type: string
    coordinates: number[]
}

export interface DatingPhoto {
    url: string
    isMain: boolean
    isApproved: boolean
}

export interface Live {
    city: string
    country: string
}

export interface User {
    id: string
    username: string
    displayName: string
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
    dateOfBirth: string // ISO date string
    gender: Gender
    interestedIn: InterestedIn[]
    location: GeoLocation
    relationStatus: string
    height: number
    interests: string[]
    occupation: string
    education: string
    datingPhotos: DatingPhoto[]
    isVerified: boolean
    isActive: boolean
    phoneNumber?: string
    live: Live
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    version: number
}
