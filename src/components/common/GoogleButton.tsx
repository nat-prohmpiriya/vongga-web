"use client"

import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { useState } from 'react'
import { auth } from '@/utils/firebase'

interface GoogleButtonProps {
    state: 'signIn' | 'signUp'
}

const GoogleButton = ({ state }: GoogleButtonProps) => {
    const router = useRouter()
    const { setUser } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true)
            const provider = new GoogleAuthProvider()
            const resultSignIn = await signInWithPopup(auth, provider)

            const accessToken = (await resultSignIn.user.getIdTokenResult()).token
            const resultVerify = await authService.verifyTokenFirebase(accessToken)
            if (!resultVerify) {
                throw new Error('Invalid Firebase token')
            }
            setUser(resultVerify.user)
            toast.success('Signed in with Google successfully!')
            router.push('/feed')
        } catch (error) {
            toast.error(error.message || 'Failed to sign in with Google')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <button
            disabled={isLoading}
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <FcGoogle className="text-xl" />
            <span>{state === 'signIn' ? 'Sign in' : 'Sign up'} with Google</span>
        </button>
    )
}

export default GoogleButton