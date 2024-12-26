'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import GoogleButton from '@/components/common/GoogleButton'
import AppleButton from '@/components/common/AppleButton'
import SignUpForm from '@/components/common/SignUpForm'
import { Divider } from 'antd'

export default function SignUp() {
    const router = useRouter()

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-8">
                {/* Logo placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl font-semibold">V</span>
                </div>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-center">
                        Create an account
                    </h1>
                    <p className="text-center text-sm mt-2">
                        Already have an account?{' '}
                        <Link href="/" className="text-gray-600 hover:underline" >
                            Sign in
                        </Link>
                    </p>
                </div>
                <GoogleButton state="signUp" />
                {/* <AppleButton state="signUp" /> */}
                <Divider>
                    <span className="px-2 bg-white text-gray-500">OR</span>
                </Divider>
                <SignUpForm />

                {/* Footer */}
                <div className="flex justify-between text-xs text-gray-500 pt-8">
                    <div className="flex items-center gap-2">
                        <span>English (United States)</span>
                        <span>▼</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/help" className="hover:underline">
                            Help
                        </Link>
                        <Link href="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
