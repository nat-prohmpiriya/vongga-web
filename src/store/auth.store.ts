import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  image: any
  uid: string
  email: string | null
  displayName: string | null
  photoUrl: string | null
  username: string | null
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
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
