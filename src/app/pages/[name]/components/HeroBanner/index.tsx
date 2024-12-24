"use client"
import { BsThreeDots } from 'react-icons/bs'
import { FaPen } from 'react-icons/fa6'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { IoLocationOutline } from 'react-icons/io5'
import { LuCalendarDays } from 'react-icons/lu'
import { User } from '@/types/user'
import BaseProp from '@/types/baseProp'
import { MdVerified } from "react-icons/md";
import { formatISOToDate } from '@/utils/converTime'
import VBtn from '@/components/common/VBtn'
import { MdAddPhotoAlternate } from "react-icons/md";
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import UpdatePhotoModal, { UpdatePhotoModalRef } from '../UpdatePhotoModal'
import UpdateProfileModal, { UpdateProfileModalRef } from '../UpdateProfileModal'

interface Props extends BaseProp {
	user: User
}

const HeroBanner = ({ user }: Props) => {
	const router = useRouter()
	const [currentTab, setCurrentTab] = useState('post');
	const updatePhotoModalRef = useRef<UpdatePhotoModalRef>(null)
	const updateProfileModalRef = useRef<UpdateProfileModalRef>(null)

	const tabs = [
		{ name: 'Post', href: '#', count: null, value: 'posts' },
		{ name: 'Shop', href: '#', count: null, value: 'shop' },
		{ name: 'Friends', href: '#', count: '', value: 'friends' },
		{ name: 'Articles', href: '#', count: null, value: 'articles' },
		{ name: 'Media', href: '#', count: null, value: 'gallery' },
		{ name: 'Videos', href: '#', count: null, value: 'videos' },
		{ name: 'Events', href: '#', count: null, value: 'events' },
		{ name: 'About', href: '#', count: null, value: 'about' },
	]

	const handleTabClick = (value: string) => {
		setCurrentTab(value)
		router.push(`/pages/${user.username}/${value}`)
	}

	if (!user?.username) {
		return <div>Loading...</div>
	}

	return (
		<div className="bg-white">
			{/* Cover Image */}
			<div className="relative h-60">
				<img
					src={user?.photoCover}
					alt={user?.username}
					className="w-full h-full object-cover"
				/>
				<VBtn
					variant="secondary"
					className='absolute bottom-4 right-4 flex items-center gap-4 w-35 h-10'
					onClick={() => updatePhotoModalRef.current?.open('photoCover')}
				>
					<MdAddPhotoAlternate className="text-xl" />
					Edit Cover
				</VBtn>
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
							<div
								className='absolute bottom-7 right-3 cursor-pointer bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black'
								onClick={() => updatePhotoModalRef.current?.open('photoProfile')}
							>
								<MdAddPhotoAlternate className=" text-2xl" />
							</div>
						</div>
						<div className="mt-24">
							<div className="flex items-center gap-2">
								<h1 className="text-2xl font-semibold">
									{user.username}
								</h1>
								{user.isVerified && <MdVerified size={30} className="text-blue-500" />}
							</div>
							<p className="text-gray-600 text-sm">
								{user.friendsCount} friends
							</p>
							<div className="flex items-center gap-6 mt-2 text-gray-600">
								<div className="flex items-center gap-1">
									<HiOutlineBriefcase className="text-lg" />
									<span className='text-sm'>{user.occupation}</span>
								</div>
								<div className="flex items-center gap-1">
									<IoLocationOutline className="text-lg" />
									<span className='text-sm'>{user.live?.city}, {user.live?.country}</span>
								</div>
								<div className="flex items-center gap-1">
									<LuCalendarDays className="text-lg" />
									<span className='text-sm'>Joined on {formatISOToDate(user.createdAt)}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2 mt-24">
						<VBtn variant="primary" className='flex items-center gap-4 w-35 h-10' onClick={() => updateProfileModalRef.current?.open()}>
							<FaPen className="text-sm" />
							Edit profile
						</VBtn>
						<VBtn variant="secondary" className='flex items-center gap-4 w-15 justify-center h-10'>
							<BsThreeDots />
						</VBtn>
					</div>
				</div>
			</div>

			{/* Tab Bar */}
			<div className="border-b border-gray-200 mt-4" />
			<div className="px-8 flex gap-4 ">
				{tabs.map((tab) => (
					<span
						key={tab.value}
						className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${currentTab === tab.value ? 'font-semibold bg-gray-100' : ''}`}
						onClick={() => handleTabClick(tab.value)}
					>
						{tab.name}
					</span>
				))}
			</div>
			<UpdatePhotoModal ref={updatePhotoModalRef} />
			<UpdateProfileModal ref={updateProfileModalRef} />
		</div >
	)
}

export default HeroBanner
