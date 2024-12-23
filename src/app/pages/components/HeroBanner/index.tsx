'use client'

import { BsThreeDots } from 'react-icons/bs'
import { FaPen } from 'react-icons/fa6'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { IoLocationOutline } from 'react-icons/io5'
import { LuCalendarDays } from 'react-icons/lu'
import { User } from '@/types/user'
import BaseProp from '@/types/baseProp'
import { useRouter } from 'next/navigation'

interface HeroBannerProps extends BaseProp {
	user: User
}

const HeroBanner = ({ user }: HeroBannerProps) => {
	const router = useRouter()

	const tabs = [
		{ name: 'Feed', href: '#', count: null, value: 'feed' },
		{ name: 'Shop', href: '#', count: null, value: 'shop' },
		{ name: 'Connections', href: '#', count: '300', value: 'connections' },
		{ name: 'Articles', href: '#', count: null, value: 'articles' },
		{ name: 'Media', href: '#', count: null, value: 'media' },
		{ name: 'Videos', href: '#', count: null, value: 'videos' },
		{ name: 'Events', href: '#', count: null, value: 'events' },
		{ name: 'About', href: '#', count: null, value: 'about' },
	]

	const handleTabClick = (tab: { value: string }) => {
		console.log('Tab clicked:', tab.value)
	}

	return (
		<div className="p-4 bg-white rounded-md">
			{/* Cover Image */}
			<div className="relative h-60">
				<img
					src={user.photoCover}
					alt="Cover"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Profile Section */}
			<div className="px-8 pb-4">
				<div className="flex justify-between items-start -mt-20">
					{/* Profile Image and Info */}
					<div className="flex gap-4">
						<div className="relative">
							<img
								src={user.photoProfile}
								alt={user.username}
								className="w-40 h-40 rounded-full border-4 border-white object-cover"
							/>
						</div>
						<div className="mt-24">
							<div className="flex items-center gap-2">
								<h1 className="text-2xl font-semibold">
									{user.username}
								</h1>
								{user.isVerified && (
									<span className="text-blue-500">
										<svg
											className="w-5 h-5"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
										</svg>
									</span>
								)}
							</div>
							<p className="text-gray-600">
								{user.friendsCount} connections
							</p>
							<div className="flex items-center gap-6 mt-2 text-gray-600">
								<div className="flex items-center gap-1">
									<HiOutlineBriefcase className="text-lg" />
									<span>{user.bio}</span>
								</div>
								<div className="flex items-center gap-1">
									<IoLocationOutline className="text-lg" />
									{/* <span>{user.location.coordinates}</span> */}
								</div>
								<div className="flex items-center gap-1">
									<LuCalendarDays className="text-lg" />
									<span>Joined on {user.createdAt}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2 mt-24">
						<button className="px-6 py-2 bg-pink-50 text-pink-600 rounded-lg font-medium flex items-center gap-2">
							<FaPen className="text-sm" />
							Edit profile
						</button>
						<button className="p-2 bg-gray-100 rounded-lg">
							<BsThreeDots />
						</button>
					</div>
				</div>
			</div>

			{/* Tab Bar */}
			<div className="px-8 flex gap-4 ">
				{tabs.map((tab) => (
					<span
						key={tab.value}
						className="px-4 py-2 cursor-pointer "
						onClick={() => handleTabClick(tab)}
					>
						{tab.name}
					</span>
				))}
			</div>
		</div>
	)
}

export default HeroBanner
