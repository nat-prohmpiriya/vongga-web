"use client"
import LeftSideBar from '@/components/feed/LeftSideBar/index'
import StoriesSlide from '@/components/story/StoriesSlide'
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
import { Row, Col, Button } from 'antd'

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
        <Row gutter={[16, 16]} className='min-h-[100vh] bg-gray-100 pt-4'>
            <Col xs={0} sm={0} md={6} className="">
                <div className="bg-white rounded-xl overflow-hidden">
                    <LeftSideBar />
                </div>
            </Col>
            {/* Content Center */}
            <Col xs={24} sm={24} md={12}>
                <StoriesSlide />
                <CreateContentBar />
                <UserCardList users={usersCardList} />

                {/* Posts */}
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-4">Latest Updates</h2>
                </div>
                {
                    posts?.map((post, index) => (
                        <PostCard key={index} post={post} fetchPosts={handlerFetchPosts} />
                    ))
                }
            </Col>
            <Col xs={0} sm={0} md={6} className="">
                <RightSideBar />
            </Col>
        </Row>
    )
}
