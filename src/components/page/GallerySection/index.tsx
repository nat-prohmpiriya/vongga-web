'use client'

import { Post } from '@/types/post'
import { useEffect, useState } from 'react'
import postService from '@/services/post.service'
import Image from 'next/image'
import ViewMedia from '@/components/feed/ViewMedia'

interface GallerySectionProps {
    profilePageId: string
}

const GallerySection = (props: GallerySectionProps) => {

    const [photoPost, setPhotoPost] = useState<Post[] | null>(null)
    const [currentPost, setCurrentPost] = useState<Post>()

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
                        <div key={index} className="">
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
            <ViewMedia post={currentPost} />
        </div>
    )
}

export default GallerySection
