"use client"
import CreateContentBar from '@/components/feed/CreateContentBar'
import PostCard from '@/components/feed/PostCard'
import BaseProp from '@/types/baseProp'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useState } from 'react'
import postService from '@/services/post.service'
import { Post } from '@/types/post'
import { Row, Col } from 'antd'


interface PostSectionProps extends BaseProp {
    profilePageId: string
}

export default function PostSection(props: PostSectionProps) {
    const { user } = useAuthStore()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        if (props.profilePageId)
            (async () => {
                const posts = await postService.getPosts({ userId: props.profilePageId })
                setPosts(posts)
            })()
    }, [props.profilePageId])

    return (
        <Row justify='center'>
            <Col xs={24} sm={24} md={20}>
                <Row gutter={[16, 16]} className=''>
                    <Col xs={24} sm={24} md={10}>
                        <div className="">
                            <div className="p-4 mb-4 bg-white rounded">
                                <h2 className="text-lg font-semibold mb-4">About</h2>
                            </div>
                            <div className="p-4 mb-4 bg-white rounded">
                                <h2 className="text-lg font-semibold mb-4">Friends</h2>
                            </div>
                            <div className="p-4 mb-4 bg-white rounded">
                                <h2 className="text-lg font-semibold mb-4">Gallery</h2>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={14}>
                        <div className={`mx-auto ${props.className}`}>
                            {user?.id === props.profilePageId && <CreateContentBar />}
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold mb-4">Latest Updates</h2>
                            </div>
                            {
                                posts?.map((post, index) => (
                                    <PostCard key={index} post={post} />
                                ))
                            }
                        </div>
                    </Col>

                </Row>
            </Col>
        </Row>
    )
}
