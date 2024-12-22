'use client';

import { useRouter } from 'next/navigation';
import Btn from '@/components/common/Btn';
import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

export default function SignUp() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-8">
                {/* Logo placeholder */}
                <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto" />

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-center">Create an account</h1>
                    <p className="text-center text-sm mt-2">
                        Already have an account?{' '}
                        <Link href="/" className="text-gray-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FcGoogle className="text-xl" />
                    <span>Sign in with Google</span>
                </button>

                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaApple className="text-xl" />
                    <span>Sign in with Apple</span>
                </button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                </div>
                {/* Form */}
                <form className="space-y-4">
                    {/* Name fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                required
                            />
                        </div>
                    </div>

                    {/* Email field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            required
                        />
                    </div>

                    {/* Password fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm your password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>

                    {/* Show password checkbox */}
                    <div className="flex items-center">
                        <input
                            id="showPassword"
                            type="checkbox"
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            onChange={(e) => {
                                setShowPassword(e.target.checked);
                                setShowConfirmPassword(e.target.checked);
                            }}
                        />
                        <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-700">
                            Show password
                        </label>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="text-sm text-gray-600 hover:underline">
                            log in instead
                        </Link>
                        <Btn type="submit" variant="secondary">
                            Create an account
                        </Btn>
                    </div>
                </form>

                {/* Decorative Image */}


                {/* Footer */}
                <div className="flex justify-between text-xs text-gray-500 pt-8">
                    <div className="flex items-center gap-2">
                        <span>English (United States)</span>
                        <span>▼</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/help" className="hover:underline">Help</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/terms" className="hover:underline">Terms</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}