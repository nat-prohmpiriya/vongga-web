"use client"

import { Post } from '@/types/post'
import { useRouter } from 'next/navigation'
import { formatISOToTimeAgo } from '@/utils/converTime'
import { PostVisibility } from '@/types/post'
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";
import { FaComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import ReactionButton from '../common/ReactionButton'
import VAvatar from '../common/VAvatar'
import DynamicPostImage from './DynamicPostImage'

export type PostType = 'card' | 'modal' | 'viewMedia'

interface PostContentProps {
    post: Post
    postType: PostType
}

const PostContent = (prop: PostContentProps) => {
    const { post, postType } = prop
    const subposts = post?.subPosts
    const router = useRouter()

    const statusPost = (value: PostVisibility) => {
        if (value === 'public') {
            return <GiWorld className="text-xl" />
        } else {
            return <RiGitRepositoryPrivateLine className="text-md" />
        }
    }

    return (
        <div>
            <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                    <VAvatar
                        imageUrl={post?.user?.photoProfile}
                        alt={post?.user?.username || ''}
                        name={post?.user?.username || ''}
                        onClick={() => { router.push(`/pages/${post?.user?.username}`) }}
                    />
                    <div>
                        {/* <h3 className="font-semibold">{user.name}</h3> */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{formatISOToTimeAgo(post?.createdAt)}</span>
                            <span className="flex items-center gap-1">
                                <span className="text-gray-400 ">{statusPost(post?.visibility)}</span>
                                <span className="font-semibold text-gray-400 text-xs">
                                    {post?.visibility === 'public' ? 'Public' : 'Private'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="text-gray-600">{post?.content}</p>
            </div>

            <DynamicPostImage post={post} />
            {/* post stats */}
            {postType === 'modal' && (
                <div className="px-4 py-3 flex items-center justify-between border-t border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <ReactionButton postId={post?.id} />
                        <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-3 ">
                            <FaComment className='text-lg' />Comments ({post?.commentCount || 0})
                        </button>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-3">
                        <IoMdShareAlt className='text-lg' />Share ({post?.shareCount || 0})
                    </button>
                </div>
            )}
        </div>
    )
}

export default PostContent