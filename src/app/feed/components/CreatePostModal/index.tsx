'use client'

import { useState, forwardRef, useImperativeHandle, useEffect, ReactNode, CSSProperties } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdPhotos } from 'react-icons/io'
import { FaUserTag } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { PiGifBold } from 'react-icons/pi'
import { BsThreeDots } from 'react-icons/bs'
import { useAuthStore } from '@/store/auth.store'
import VBtn from '@/components/common/VBtn'

export interface CreatePostModalRef {
	open: () => void
	close: () => void
}

interface ModalProps {

}

const CreatePostModal = forwardRef<CreatePostModalRef, ModalProps>(({ }, ref) => {
	const [isOpen, setIsOpen] = useState(false)
	const [content, setContent] = useState('')
	const { user } = useAuthStore()
	const [isClose, setIsClose] = useState(false)

	useImperativeHandle(ref, () => ({
		open: () => {
			setIsOpen(true)
		},
		close: () => {
			setIsOpen(false)
		}
	}))

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
		if (isOpen) window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen])


	useEffect(() => {
		if (isClose) {
			setIsOpen(false)
			setIsClose(false)
		}
	}, [isClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative bg-white rounded-lg shadow-lg w-[500px]">
				<div className="relative border-b border-gray-200 p-4">
					<h2 className="text-xl font-semibold text-center">Create post</h2>
					<button
						onClick={() => setIsClose(true)}
						className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
					>
						<IoClose size={24} />
					</button>
				</div>

				<div className="p-4">
					<div className="flex items-center gap-2 mb-4">
						<div className="w-10 h-10 rounded-full overflow-hidden">
							<Image
								src={user?.photoProfile || ''}
								alt="User avatar"
								width={40}
								height={40}
							/>
						</div>
						<div>
							<p className="font-semibold">Nat Prohmpiriya</p>
							<button className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
								<span>Only me</span>
							</button>
						</div>
					</div>

					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="What's on your mind?"
						className="w-full min-h-[100px] resize-none outline-none"
					/>

					<div className="border rounded-lg p-4 mb-4">
						<div className="flex flex-col items-center justify-center gap-2 py-8">
							<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<IoMdPhotos />
							</div>
							<p className="text-lg font-medium">Add photos/videos</p>
							<p className="text-sm text-gray-500">or drag and drop</p>
						</div>
						<button className="flex items-center gap-2 w-full py-2 px-4 bg-gray-100 rounded-md">
							<span className="text-sm">Add photos and videos from your mobile device.</span>
							<span className="ml-auto text-sm font-semibold">Add</span>
						</button>
					</div>

					<div className="flex items-center justify-between border rounded-lg p-2 mb-4">
						<span>Add to your post</span>
						<div className="flex gap-2">
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<IoMdPhotos />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<FaUserTag />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<BsEmojiSmile />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<IoLocationSharp />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<PiGifBold />
							</button>
							<button className="p-2 hover:bg-gray-100 rounded-full">
								<BsThreeDots />
							</button>
						</div>
					</div>

					<VBtn variant='primary' className="w-full py-2 px-4 text-white rounded-lg flex items-center justify-center">
						Post
					</VBtn>
				</div>
			</div>
		</div>
	)
})

export default CreatePostModal
