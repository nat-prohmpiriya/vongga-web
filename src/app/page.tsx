'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import AppleButton from '@/components/common/AppleButton'
import GoogleButton from '@/components/common/GoogleButton'
import AuthForm from '@/components/common/SingInForm'
import FooterLink from '@/components/common/FooterLink'
import { Divider } from 'antd'


export default function Home() {
	const router = useRouter()
	const { user } = useAuthStore()

	useEffect(() => {
		if (user) return router.push('/feed')
	}, [user])

	return (
		<main className="flex min-h-screen">
			{/* Left side - Hero Image */}
			<div className="relative flex-1 hidden lg:block">
				<Image
					src="https://picsum.photos/1200/800?random=1"
					alt="Travel inspiration"
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Right side - sign in form */}
			<div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 bg-white">
				<div className="max-w-md w-full mx-auto space-y-8">
					{/* Header */}
					<div className="text-center">
						<h1 className="text-3xl font-bold">Travel with us</h1>
						<p className="mt-2 text-xl">Join us today</p>
					</div>

					{/* Sign in buttons */}
					<div className="space-y-4">

						<GoogleButton state='signIn' />
						{/* <AppleButton state='signIn' /> */}
						<Divider>
							<span className="px-2 bg-white text-gray-500">OR</span>
						</Divider>
						<AuthForm type='signin' />
						{/* Email and Password Form */}

					</div>

					{/* Terms */}
					<p className="text-xs text-gray-500 text-center">
						By signing up, you agree to the{' '}
						<a href="/terms" className="underline">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="/privacy" className="underline">
							Privacy Policy
						</a>
						, including cookie use.
					</p>

					{/* Login link */}
					<div className="text-center">
						<button
							onClick={() => router.push('/auth/signup')}
							className="mt-2 block w-full text-center px-4 py-3 rounded-lg bg-gray-50 transition-colors"
						>
							Sign Up
						</button>
					</div>

					<FooterLink />
				</div>
			</div>
		</main>
	)
}
