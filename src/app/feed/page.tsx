"use client"
import LeftSideBar from './components/LeftSideBar/index'
import ShortListBar from './components/ShortListBar'
import CreateContentBar from './components/CreateContentBar'
import RightSideBar from './components/RightSideBar'
import PostCard from './components/PostCard'
import ContainerPage from '@/components/common/ContainerPage'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/types/post'
import postService from '@/services/post.service'
import clientToken from '@/utils/clientToken'
import userService from '@/services/user.service'

export default function FeedPage() {
    const { user, setUser } = useAuthStore()
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        (async () => {
            if (!user) return
            const posts = await postService.getPosts({ userId: user?.id })
            setPosts(posts)
        })()
    }, [user])

    if (!user) {
        const token = clientToken.getToken()
        if (!token.refreshToken) {
            router.push('/')
        } else if (!user) {
            (async () => {
                const userInfo = await userService.getMyProfile()
                if (!userInfo) return router.push('/')
                setUser(userInfo)
            })()
        }
    }
    return (
        <ContainerPage>
            <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-6 py-4">
                <div className="sticky top-16 overflow-y-auto col-span-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <LeftSideBar />
                    </div>
                </div>
                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <ShortListBar />
                    </div>
                    <CreateContentBar />
                    {
                        posts?.map((post, index) => (
                            <PostCard key={index} post={post} />
                        ))
                    }
                </div>
                <div className="sticky top-16 overflow-y-auto col-span-1">
                    <RightSideBar />
                </div>
            </div>
        </ContainerPage>
    )
}
