"use client"

import { useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { auth } from '@/utils/firebase'
import { OAuthProvider, signInWithPopup } from 'firebase/auth'
import authService from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'

interface AppleButtonProps {
    state: 'signIn' | 'signUp'
}

const AppleButton = ({ state }: AppleButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const appleProvider = new OAuthProvider('apple.com')
    const { setUser } = useAuthStore()
    const router = useRouter()

    const handleAppleSignIn = async () => {
        try {
            setIsLoading(true)
            const result = await signInWithPopup(auth, appleProvider)
            const accessToken = (await result.user.getIdTokenResult()).token
            const resultVerify = await authService.verifyTokenFirebase(accessToken)
            if (!resultVerify) {
                throw new Error('Invalid Firebase token')
            }
            setUser(resultVerify.user)
            console.log('Signed in with Apple successfully!')
            router.push('/feed')
        } catch (error: any) {
            console.error('Error signing in with Apple: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleAppleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            type='button'
            disabled={isLoading}
        >
            <FaApple className="text-xl" />
            <span>{state === 'signIn' ? 'Sign in' : 'Sign up'} with Apple</span>
        </button>
    )
}

export default AppleButton