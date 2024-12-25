'use client'

import BaseProp from '@/types/baseProp'
import type { Post } from '@/types/post'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { useAuthStore } from '@/store/auth.store'
import VAvatar from '@/components/common/VAvatar'
import CreatePostModal, { CreatePostModalRef } from './CreatePostModal'
import { useRef, useState } from 'react'
import { formatISOToTimeAgo } from '@/utils/converTime'
import { PostVisibility } from '@/types/post'
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";
import { Popover } from 'antd'
import { useRouter } from 'next/navigation'
import { VscSend } from "react-icons/vsc";
import commentService from '@/services/comment.service'
import PostModal, { PostModalRef } from '@/components/feed/PostModal'
import { useEffect } from 'react'
import { Comment } from '@/types/comment'
import CommentsBox from './CommentsBox'
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import ReactionButton from '../common/ReactionButton'


interface PostProps extends BaseProp {
    post: Post
}

export default function PostCard(props: PostProps) {
    const { user } = useAuthStore()
    const createPostModalRef = useRef<CreatePostModalRef>(null)
    const router = useRouter()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const postModalRef = useRef<PostModalRef>(null)

    const statusPost = (value: PostVisibility) => {
        if (value === 'public') {
            return <GiWorld className="text-xl" />
        } else {
            return <RiGitRepositoryPrivateLine className="text-md" />
        }
    }

    const contentPopover = (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="text-sm text-gray-600 mb-2 cursor-pointer" onClick={() => createPostModalRef.current?.open()}>Update</p>
            <p className="text-sm text-gray-600 cursor-pointer" onClick={() => { }}>Delete</p>
        </div>
    )

    const handlerSubmitComment = async () => {
        if (!comment || !props.post?.id) return
        const result = await commentService.createComment({ content: comment, postId: props.post?.id })
        if (result) {
            setComment('')
            console.log('Create comment success')
        } else {
            console.error('Create comment error')
        }
    }

    useEffect(() => {
        (async () => {
            const result = await commentService.getComments(props.post?.id)
            console.log(result)
            if (result) {
                setComments(result)
            } else {
                console.log('Get comments error')
            }
        })()
    }, [])

    return (
        <div className="bg-white rounded-xl shadow-sm mb-4">
            {/* Post Header */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                    <VAvatar
                        imageUrl={props.post?.user?.photoProfile}
                        alt={props.post?.user?.username || ''}
                        name={props.post?.user?.username || ''}
                        onClick={() => { router.push(`/pages/${props.post?.user?.username}`) }}
                    />
                    <div>
                        {/* <h3 className="font-semibold">{user.name}</h3> */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{formatISOToTimeAgo(props.post?.createdAt)}</span>
                            <span className="flex items-center gap-1">
                                <span className="text-gray-400 ">{statusPost(props.post?.visibility)}</span>
                                <span className="font-semibold text-gray-400 text-xs">
                                    {props.post?.visibility === 'public' ? 'Public' : 'Private'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <Popover arrow={false} content={contentPopover}>
                    <button className="text-gray-400 hover:text-gray-600 p-2">
                        <IoEllipsisHorizontal className="text-xl" />
                    </button>
                </Popover>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="text-gray-600">{props.post?.content}</p>
            </div>

            {/* Post Image */}
            {props.post?.media?.[0]?.url && (
                <div className="mb-3">
                    <img
                        src={props.post.media[0].url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <ReactionButton postId={props.post?.id} />
                    <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-3 " onClick={() => postModalRef.current?.open()}>
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
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-gray-100 rounded-full py-2 px-4 pr-12 focus:outline-none"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xl" onClick={handlerSubmitComment}>
                            <VscSend />
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-1">
                    {comments.map((comment) => <CommentsBox comment={comment} key={comment.id} />)}
                </div>

                <button className="text-gray-500 hover:text-gray-700 text-sm mt-3">
                    Load more comments
                </button>
            </div>
            <CreatePostModal ref={createPostModalRef} post={props.post} />
            <PostModal ref={postModalRef} post={props.post} />
        </div>
    )
}

