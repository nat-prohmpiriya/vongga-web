'use client'

import { FaRegCommentDots } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { BsCart3 } from 'react-icons/bs'
import NotiBtn from './NotiButton'
import MenuBtn from './MenuBtn'
import { useAuthStore } from '@/store/auth.store'
import { useState, useEffect } from 'react'
import AccountBtn from './AccountBtn'
import { RiRobot3Line } from "react-icons/ri";

const HeaderBar = () => {
	const router = useRouter()
	const { user } = useAuthStore()
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
					<span className="font-semibold text-black">
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
					className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300"
					onClick={() => router.push('/cart')}
				>
					<BsCart3 className="text-xl text-gray-600" />
				</button>
				<button
					className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300"
					onClick={() => router.push('/chatbot')}
				>
					<RiRobot3Line className="text-xl text-gray-600" />
				</button>
				<button
					className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300"
					onClick={() => router.push('/chat')}
				>
					<FaRegCommentDots className="text-xl text-gray-600" />
				</button>
				<NotiBtn />
				<AccountBtn />
			</div>
		</div>
	)
}

export default HeaderBar
