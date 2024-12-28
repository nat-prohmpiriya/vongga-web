'use client'

import BaseProp from '@/types/baseProp'
import type { Post } from '@/types/post'
import { useAuthStore } from '@/store/auth.store'
import VAvatar from '@/components/common/VAvatar'
import CreatePostModal, { CreatePostModalRef } from './CreatePostModal'
import { useRef, useState } from 'react'
import { PostVisibility } from '@/types/post'
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";
import { useRouter } from 'next/navigation'
import { VscSend } from "react-icons/vsc";
import commentService from '@/services/comment.service'
import PostModal, { PostModalRef } from '@/components/feed/PostModal'
import { useEffect } from 'react'
import { Comment } from '@/types/comment'
import CommentsBox from './CommentContent'
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import ReactionButton from '../common/ReactionButton'
import PostContent from './PostContent'
import postService from '@/services/post.service'

interface PostProps extends BaseProp {
    post: Post
    fetchPosts?: () => void
}

export default function PostCard(props: PostProps) {
    const { user } = useAuthStore()
    const createPostModalRef = useRef<CreatePostModalRef>(null)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const postModalRef = useRef<PostModalRef>(null)


    const handlerSubmitComment = async () => {
        if (!comment || !props.post?.id) return
        const result = await commentService.createComment({ content: comment, postId: props.post?.id })
        if (result) {
            setComment('')
            refreshComments()
        } else {
            console.error('Create comment error')
        }
    }

    const refreshComments = async () => {
        const result = await commentService.getComments(props.post?.id)
        if (result) {
            setComments(result)
        } else {
            console.log('Get comments error')
        }
    }

    const handleDeletePost = async (id: string) => {
        try {
            const result = await postService.deletePost(id)
            props?.fetchPosts?.()
        } catch (error: any) {
            console.log('Delete post error', error)
        }
    }

    const handleDeleteComment = async (id: string) => {
        try {
            const result = await commentService.deleteComment(id)
            refreshComments()
        } catch (error: any) {
            console.log('Delete comment error', error)
        }
    }

    useEffect(() => {
        refreshComments()
    }, [])



    return (
        <div className="bg-white rounded-xl shadow-sm mb-4">
            {/* Post Header */}
            <PostContent post={props.post} postType='card' deletePost={handleDeletePost} />

            {/* Post Stats */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <ReactionButton postId={props.post?.id} />
                    <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-3 " onClick={() => postModalRef.current?.open(true)}>
                        <FaComment className='text-lg' />Comments ({props.post?.commentCount || 0})
                    </button>
                </div>
                <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-3">
                    <IoMdShareAlt className='text-lg' />Share ({props?.post?.shareCount || 0})
                </button>
            </div>

            {/* Comments Section */}
            <div className="p-4">
                {/* Add Comment */}
                <div className="flex gap-3 mb-4">
                    <VAvatar
                        imageUrl={user?.photoProfile}
                        alt={user?.username || ''}
                        name={user?.username || ''}
                    />
                    <div className="flex-1 flex">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-gray-100 rounded-full py-2 px-4 pr-12 focus:outline-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="-ml-10 " onClick={handlerSubmitComment}>
                            <VscSend className='hover:scale-125 text-lg text-gray-500 hover:text-gray-900' />
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-1">
                    {comments.map((comment) => (
                        <CommentsBox
                            comment={comment}
                            key={comment.id}
                            onReplyAdded={refreshComments}
                            deleteComment={handleDeleteComment}
                        />
                    ))}
                </div>

                <button className="text-gray-500 hover:text-gray-700 text-sm mt-3">
                    Load more comments
                </button>
            </div>
            <CreatePostModal ref={createPostModalRef} post={props.post} />
            <PostModal ref={postModalRef} comments={comments} post={props.post} deletePost={handleDeletePost} />
        </div>
    )
}
