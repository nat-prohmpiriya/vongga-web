'use client';

import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FcGoogle className="text-xl" />
              <span>Sign in with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaApple className="text-xl" />
              <span>Sign in with Apple</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Email and Password Form */}
            <form className="space-y-4">
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

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-sm text-gray-500 hover:text-gray-700">
                    <div className="flex items-center gap-1">
                      <IoEyeOutline className="text-lg" />
                      Hide
                    </div>
                  </button>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                Sign in with Email
              </button>
            </form>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to the{' '}
            <a href="/terms" className="underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline">Privacy Policy</a>, including cookie use.
          </p>

          {/* Login link */}
          <div className="text-center">
            <button onClick={() => router.push("/auth/signup")} className="mt-2 block w-full text-center px-4 py-3 rounded-lg bg-gray-50 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <a href="/about" className="hover:underline">About</a>
            <a href="/help" className="hover:underline">Help Center</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/cookie" className="hover:underline">Cookie Policy</a>
            <a href="/accessibility" className="hover:underline">Accessibility</a>
            <a href="/careers" className="hover:underline">Careers</a>
            <a href="/marketing" className="hover:underline">Marketing</a>
            <a href="/developers" className="hover:underline">Developers</a>
            <a href="/settings" className="hover:underline">Settings</a>
            <span> 2023 yourwebsite</span>
          </div>
        </div>
      </div>
    </main>
  );
}
