'use client'

import React from 'react'
import { FaRegCommentDots } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { BsCart3 } from 'react-icons/bs'
import NotiBtn from './NotiBtn'
import MenuBtn from './MenuBtn'
import { useAuthStore } from '@/store/auth.store'
import { useState, useEffect } from 'react'

const HeaderBar = () => {
	const imgUrl = 'https://picsum.photos/200?random=1'
	const router = useRouter()
	const { user } = useAuthStore()
	const [imageSrc, setImageSrc] = useState(imgUrl)
	const [isHide, setIsHide] = useState(false)
	const parthname = usePathname()

	useEffect(() => {
		if (parthname.includes('/auth') || parthname === '/') {
			setIsHide(true)
		} else {
			setIsHide(false)
		}
	}, [parthname])

	const goToFeedPage = () => {
		router.push('/feed')
	}

	if (isHide) {
		return null
	}

	return (
		<div className="w-full h-16 bg-white border-b flex items-center px-4 grid grid-cols-3 fixed top-0 left-0 right-0 z-50">
			{/* Left section */}
			<div className="col-span-1">
				<span
					className="p-2 cursor-pointer rounded-lg"
					onClick={() => goToFeedPage()}
				>
					<span className="font-semibold text-green-200">
						SABAIMAI
					</span>
				</span>
			</div>

			{/* Center section - Search */}
			<div className="col-span-1">
				{/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div> */}
			</div>

			{/* Right section */}
			<div className="col-span-1 flex items-center justify-end gap-5">
				<MenuBtn />
				<button
					className="p-2 bg-gray-100 rounded-lg"
					onClick={() => router.push('/cart')}
				>
					<BsCart3 className="text-xl text-gray-600" />
				</button>
				<button
					className="p-2 bg-gray-100 rounded-lg"
					onClick={() => router.push('/chat')}
				>
					<FaRegCommentDots className="text-xl text-gray-600" />
				</button>
				<NotiBtn />
				<div className="w-8 h-8 rounded-full overflow-hidden">
					{user?.photoProfile ? (
						<img
							src={user?.photoProfile}
							alt={user?.username || 'User'}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="text-gray-400 rounded-full w-8 h-8">
							{user?.username?.charAt(0) || 'A'}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default HeaderBar
