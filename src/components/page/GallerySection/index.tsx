'use client'

import { Post } from '@/types/post'
import { useEffect, useState } from 'react'
import postService from '@/services/post.service'
import Image from 'next/image'
import { IoCloseCircleOutline } from "react-icons/io5";

interface GallerySectionProps {
    profilePageId: string
}

const GallerySection = (props: GallerySectionProps) => {

    const [photoPost, setPhotoPost] = useState<Post[] | null>(null)
    const [currentPost, setCurrentPost] = useState<Post>()
    const [isClickedFullImage, setIsClickedFullImage] = useState(false)

    useEffect(() => {
        fetchPostPhotos()
    }, [])

    const fetchPostPhotos = async () => {
        if (!props.profilePageId) return
        const posts = await postService.getPostImages(props.profilePageId)
        const flatPosts: Post[] = []
        posts?.forEach((post: Post) => {
            const { subPosts, ...rest } = post
            flatPosts.push(rest)
            if (subPosts) {
                subPosts.forEach(subPost => {
                    flatPosts.push(subPost as Post)
                })
            }
        })
        setPhotoPost(flatPosts)
    }


    return (
        <div className="bg-white mt-4 bg-white min-h-[500px] p-2">
            <div className="grid grid-cols-6 gap-1">
                {
                    photoPost?.map((post, index) => (
                        <div key={index} className="cursor-pointer" onClick={() => setIsClickedFullImage(true)}>
                            <Image
                                src={post?.media?.[0]?.url || ''}
                                alt="Post"
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))
                }
            </div>
            {/* show full screen image */}
            {isClickedFullImage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 grid grid-cols-7">
                    <div className="col-span-5 bg-black h-screen">
                        <button className='absolute top-4 left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={() => setIsClickedFullImage(false)}>
                            <IoCloseCircleOutline className='hover:scale-125 transition-all duration-300' />
                        </button>
                    </div>
                    <div className="col-span-2 bg-white h-screen">
                    </div>
                </div>
            )}
        </div>
    )
}

export default GallerySection
