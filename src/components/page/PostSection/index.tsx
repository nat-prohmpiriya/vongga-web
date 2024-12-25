"use client"
import CreateContentBar from '@/components/feed/CreateContentBar'
import PostCard from '@/components/feed/PostCard'
import BaseProp from '@/types/baseProp'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useState } from 'react'
import postService from '@/services/post.service'
import { Post } from '@/types/post'


interface PostSectionProps extends BaseProp {
    userProfileId: string
}

export default function PostSection(props: PostSectionProps) {
    const { user } = useAuthStore()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        if (props.userProfileId)
            (async () => {
                const posts = await postService.getPosts({ userId: props.userProfileId })
                setPosts(posts)
            })()
    }, [props.userProfileId])

    return (
        <div className='grid grid-cols-5 gap-4 mx-auto w-5/6 pt-4'>
            <div className="col-span-3 space-y-4">
                <div className={`mx-auto ${props.className}`}>
                    {user?.id === props.userProfileId && <CreateContentBar />}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-4">Latest Updates</h2>
                    </div>
                    {
                        posts?.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))
                    }
                </div>
            </div>
            <div className="col-span-2">
                <div className="bg-white rounded-xl overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Latest Updates</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
