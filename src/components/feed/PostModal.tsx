"use client"

import React, { forwardRef, useImperativeHandle, useState, useEffect, ReactNode, CSSProperties } from 'react'
import { Post, PostVisibility } from '@/types/post'
import { useAuthStore } from '@/store/auth.store'
import VAvatar from '@/components/common/VAvatar'
import { IoMdGlobe } from "react-icons/io"
import { RiGitRepositoryPrivateLine } from "react-icons/ri"
import { IoClose } from "react-icons/io5"
import { IoMdImages } from "react-icons/io"
import { VscSend } from "react-icons/vsc"
import { useUpload } from '@/hooks/useUpload'

export interface PostModalRef {
    open: () => void
    close: () => void
}

interface ModalProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
    onOpen?: () => void
    onClose?: () => void
    onSuccess?: (post: Post) => void
    post: Post
}

const PostModal = forwardRef<PostModalRef, ModalProps>(({ className = '', style, onOpen, onClose, onSuccess }, ref) => {
    const { user } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const [visibility, setVisibility] = useState<PostVisibility>('public')
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])

    const { upload, isUploading } = useUpload({
        onSuccess: (url) => {
            // Handle upload success
        }
    })

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true)
            setContent('')
            setSelectedFiles([])
            setPreviewUrls([])
            onOpen?.()
        },
        close: () => {
            setIsOpen(false)
            onClose?.()
        }
    }))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
        if (isOpen) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            const validFiles = files.filter(file => {
                if (file.size > 5 * 1024 * 1024) return false // 5MB limit
                if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return false
                return true
            })

            setSelectedFiles(prev => [...prev, ...validFiles])
            const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file))
            setPreviewUrls(prev => [...prev, ...newPreviewUrls])
        }
    }

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        if (!content && selectedFiles.length === 0) return
        // Handle post creation
        setIsOpen(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`relative bg-white rounded-lg shadow-lg w-[600px] ${className}`} style={style}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Create Post</h2>
                    <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-500 hover:text-gray-700">
                        <IoClose />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <VAvatar
                            imageUrl={user?.photoProfile}
                            name={user?.username || ''}
                            alt={user?.username}
                        />
                        <div>
                            <h3 className="font-semibold">{user?.displayName || user?.username}</h3>
                            <button
                                className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full"
                                onClick={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
                            >
                                {visibility === 'public' ? (
                                    <>
                                        <IoMdGlobe className="text-lg" />
                                        <span>Public</span>
                                    </>
                                ) : (
                                    <>
                                        <RiGitRepositoryPrivateLine className="text-lg" />
                                        <span>Private</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Text Input */}
                    <textarea
                        className="w-full min-h-[150px] text-gray-700 placeholder-gray-400 border-none focus:ring-0 resize-none"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    {/* Media Preview */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img src={url} alt="" className="w-full h-48 object-cover rounded-lg" />
                                    <button
                                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-1"
                                        onClick={() => handleRemoveFile(index)}
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex justify-between items-center">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <IoMdImages className="text-2xl text-gray-500 hover:text-gray-700" />
                        </label>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={isUploading || (!content && selectedFiles.length === 0)}
                        >
                            <span>Post</span>
                            <VscSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

PostModal.displayName = 'PostModal'

export default PostModal