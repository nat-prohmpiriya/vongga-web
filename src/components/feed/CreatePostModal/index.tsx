'use client'

import { useState, forwardRef, useImperativeHandle, useEffect, ReactNode, CSSProperties, useRef } from 'react'
import Image from 'next/image'
import { IoClose, IoCloseCircle } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdPhotos } from 'react-icons/io'
import { FaUserTag } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { PiGifBold } from 'react-icons/pi'
import { BsThreeDots } from 'react-icons/bs'
import { useAuthStore } from '@/store/auth.store'
import postService, { CreatePost } from '@/services/post.service'
import VBtn from '@/components/common/VBtn'
import { Post, Media, SubPost } from '@/types/post'
import { useUpload } from '@/hooks/useUpload'
import { Modal, Avatar } from 'antd'

export interface CreatePostModalRef {
	open: () => void
	close: () => void
}

interface ModalProps {
	post?: Post
}

const CreatePostModal = forwardRef<CreatePostModalRef, ModalProps>((props, ref) => {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useAuthStore()
	const [isClose, setIsClose] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [post, setPost] = useState<CreatePost | null>({ content: props.post?.content || '' })
	const [mediaFiles, setMediaFiles] = useState<File[]>([])
	const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { upload, isUploading } = useUpload({
		onError: (error) => setError(error.message)
	})

	const handleFileSelect = (files: FileList | null) => {
		if (!files) return

		const newFiles = Array.from(files).filter(file => {
			const type = file.type.split('/')[0]
			return type === 'image' //|| type === 'video'
		})

		setMediaFiles(prev => [...prev, ...newFiles])

		// Create previews
		newFiles.forEach(file => {
			const reader = new FileReader()
			reader.onloadend = () => {
				setMediaPreviews(prev => [...prev, reader.result as string])
			}
			reader.readAsDataURL(file)
		})
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		handleFileSelect(e.dataTransfer.files)
	}

	const removeMedia = (index: number) => {
		setMediaFiles(prev => prev.filter((_, i) => i !== index))
		setMediaPreviews(prev => prev.filter((_, i) => i !== index))
	}

	const createSubPosts = (mediaUrls: string[]) => {

		// Create one subpost for each media (except the first one which goes to main post)
		return mediaUrls.map((url, index) => ({
			content: '',
			media: [{ url, type: 'image' as const }],
			order: index + 1,
			visibility: 'public',
		}))
	}

	const handleSubmitPost = async () => {
		try {
			if (!post) return
			setLoading(true)

			// Upload all media files
			let mediaUrls: string[] = []
			if (mediaFiles.length > 0) {
				const uploadResults = await upload(mediaFiles, 'postMedia') as { url: string }[]
				mediaUrls = uploadResults.map(result => result.url)
			}

			let postData: CreatePost
			if (mediaUrls.length > 1) {
				// First media goes to main post, rest go to individual subposts
				const [mainPostMedia, ...subPostMedia] = mediaUrls
				postData = {
					...post,
					media: [{ url: mainPostMedia, type: 'image' as const }],
					subPosts: createSubPosts(subPostMedia)
				}
			} else {
				// Single media goes to main post
				postData = {
					...post,
					media: mediaUrls.map(url => ({ url, type: 'image' as const }))
				}
			}

			const result = await postService.createPost(postData)
			setIsOpen(false)
			setPost(null)
			setMediaFiles([])
			setMediaPreviews([])
		} catch (error: any) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

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
		<Modal
			open={isOpen}
			onCancel={() => setIsOpen(false)}
			closable={false}
			style={{ top: 20, maxHeight: 'calc(100vh - 40px)', overflow: 'auto' }}
			width={600}
			footer={null}
		>
			<div className="relative border-b border-gray-200">
				<h2 className="text-xl font-semibold text-center mb-4">{post?.content ? 'Update post' : 'Create post'}</h2>
				<button
					onClick={() => setIsClose(true)}
					className="absolute right-4 top-1 p-1 rounded-full hover:bg-gray-100"
				>
					<IoClose size={24} />
				</button>
			</div>

			<div className="p-4">
				<div className="flex items-center gap-5 mb-4">
					<div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 ">
						<Avatar
							size={64}
							src={user?.photoProfile}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<p className="font-semibold">{user?.username}</p>
						<button className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md text-sm">
							<span>Only me</span>
						</button>
					</div>
				</div>

				<textarea
					value={post?.content}
					onChange={(e) => setPost({ ...post, content: e.target.value })}
					placeholder="What's on your mind?"
					className="w-full min-h-[100px] resize-none outline-none"
				/>

				{mediaPreviews.length > 0 && (
					<div className="grid grid-cols-2 gap-2 mb-4">
						{mediaPreviews.map((preview, index) => (
							<div key={index} className="relative">
								{mediaFiles[index]?.type.startsWith('image/') ? (
									<img src={preview} alt={`Preview ${index}`} className="w-full h-48 object-cover rounded-lg" />
								) : (
									<video src={preview} className="w-full h-48 object-cover rounded-lg" controls />
								)}
								<button
									onClick={() => removeMedia(index)}
									className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
								>
									<IoCloseCircle size={20} />
								</button>
							</div>
						))}
					</div>
				)}

				<div
					className="border rounded-lg p-4 mb-4"
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<input
						type="file"
						ref={fileInputRef}
						onChange={(e) => handleFileSelect(e.target.files)}
						multiple
						accept="image/*,video/*"
						className="hidden"
					/>
					<div
						className="flex flex-col items-center justify-center gap-2 py-8 cursor-pointer"
						onClick={() => fileInputRef.current?.click()}
					>
						<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
							<IoMdPhotos />
						</div>
						<p className="text-lg font-medium">Add photos/videos</p>
						<p className="text-sm text-gray-500">or drag and drop</p>
					</div>
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
						{/* <button className="p-2 hover:bg-gray-100 rounded-full">
							<PiGifBold />
						</button>
						<button className="p-2 hover:bg-gray-100 rounded-full">
							<BsThreeDots />
						</button> */}
					</div>
				</div>

				<VBtn
					onClick={handleSubmitPost}
					loading={loading || isUploading}
					variant='primary'
					className="w-full py-2 px-4 text-white rounded-lg flex items-center justify-center"
				>
					Post
				</VBtn>
			</div>
			{/* </div>
		</div> */}
		</Modal>
	)
})

export default CreatePostModal
