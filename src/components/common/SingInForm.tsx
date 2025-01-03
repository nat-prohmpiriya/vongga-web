"use client";

import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import authService from '@/services/auth.service';

interface AuthFormProps {
    type: 'signup' | 'signin'
}


const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter()
    const { setUser } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            const accessToken = (await result.user.getIdTokenResult()).token
            const resultVerify = await authService.verifyTokenFirebase(accessToken)
            if (!resultVerify) {
                throw new Error('Invalid Firebase token')
            }
            setUser(resultVerify.user)
            console.log('Signed in successfully!')
            router.push('/feed')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    required
                />
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        <div className="flex items-center gap-1">
                            {showPassword ? (
                                <IoEyeOffOutline className="text-lg" />
                            ) : (
                                <IoEyeOutline className="text-lg" />
                            )}
                            {showPassword ? 'Hide' : 'Show'}
                        </div>
                    </button>
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    required
                />
                <p className="mt-1 text-xs text-gray-500">
                    Use 8 or more characters with a mix of
                    letters, numbers & symbols
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
                {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        href="/auth/signup"
                        className="text-black hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default AuthForm