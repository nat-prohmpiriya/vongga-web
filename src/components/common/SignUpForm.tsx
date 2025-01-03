

import React from 'react'
import { useState, FormEvent } from 'react'
import { auth } from '@/utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { useRouter } from 'next/navigation'

const SignUpForm = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match')
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )

            router.push('/auth/login')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
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

            {/* Password fields */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        required
                    />
                </div>
            </div>
            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={
                            showConfirmPassword
                                ? 'text'
                                : 'password'
                        }
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        required
                    />
                </div>
            </div>


            <p className="text-xs text-gray-500">
                Use 8 or more characters with a mix of letters, numbers
                & symbols
            </p>

            {/* Show password checkbox */}
            <div className="flex items-center">
                <input
                    id="showPassword"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    onChange={(e) => {
                        setShowPassword(e.target.checked)
                        setShowConfirmPassword(e.target.checked)
                    }}
                />
                <label
                    htmlFor="showPassword"
                    className="ml-2 block text-sm text-gray-700"
                >
                    Show password
                </label>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
                {isLoading ? 'Creating account...' : 'Create account'}
            </button>
        </form>
    )
}

export default SignUpForm