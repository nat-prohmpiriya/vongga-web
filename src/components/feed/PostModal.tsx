"use client"

import React, { useImperativeHandle, useState, forwardRef } from 'react'
import { Modal } from 'antd'
import CommentsBox from './CommentsBox'
import type { Post } from '@/types/post'
import type { Comment } from '@/types/comment'
import PostContent from './PostContent'

export interface PostModalRef {
    open: (isOpen: boolean) => void
}

interface PostModalProps {
    post: Post
    comments: Comment[]
}


const PostModal = forwardRef<PostModalRef, PostModalProps>((prop, ref) => {
    const { post, comments } = prop

    const [isModalOpen, setIsModalOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: (isOpen: boolean) => {
            setIsModalOpen(isOpen)
        },
    }))
    return (
        <Modal width={800} title={`Post's ${post?.user?.displayName || post?.user?.username}`} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
            <div className='border-t'>
                {/* {post?.content} */}
                <PostContent post={post} postType='modal' />
                {
                    (prop.comments || []).map((comment) => (
                        <CommentsBox key={comment.id} comment={comment} />
                    ))
                }
            </div>
        </Modal>
    )
})

export default PostModal