"use client"
import LeftSideBar from '@/components/feed/LeftSideBar/index'
import StorySlider from '@/components/story/StoriesSlide'
import CreateContentBar from '@/components/feed/CreateContentBar'
import RightSideBar from '@/components/feed/RightSideBar'
import PostCard from '@/components/feed/PostCard'
import ContainerPage from '@/components/common/ContainerPage'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/types/post'
import postService from '@/services/post.service'
import clientToken from '@/utils/clientToken'
import userService from '@/services/user.service'
import { UserCardList } from '@/components/page/UserCardSlide'
import { usersCardList } from '@/data/users'

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
    }, [user])

    const handlerFetchPosts = async () => {
        if (!user) return console.warn('user not found')
        const posts = await postService.getPosts({ userId: user?.id })
        setPosts(posts)
    }


    return (
        <ContainerPage>
            <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-6 py-4">
                <div className="sticky top-16 overflow-y-auto col-span-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <LeftSideBar />
                    </div>
                </div>
                {/* Content Center */}
                <div className="space-y-6 col-span-2">
                    <StorySlider />
                    <CreateContentBar />
                    <UserCardList users={usersCardList} />

                    {/* Posts */}
                    {
                        posts?.map((post, index) => (
                            <PostCard key={index} post={post} fetchPosts={handlerFetchPosts} />
                        ))
                    }
                </div>
                <div className=" top-16  col-span-1">
                    <RightSideBar />
                </div>
            </div>
        </ContainerPage>
    )
}
