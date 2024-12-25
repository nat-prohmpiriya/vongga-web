import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { User } from '../types/user'

interface AuthState {
    user: User | null
    setUser: (user: User) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (user: User) => set({ user }),
                clearAuth: () => set({ user: null }),
            }),
            {
                name: 'auth-storage',
            }
        )
    )
)
