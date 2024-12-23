'use client'

import React from 'react'
import { IoEllipsisHorizontal } from 'react-icons/io5'

interface CommentProps {
    user: {
        name: string
        image: string
    }
    content: string
    time: string
    likes?: number
    replies?: number
}

interface PostProps {
    user: {
        name: string
        role: string
        image: string
    }
    content: string
    time: string
    image?: string
    likes: number
    comments: number
    shares: number
    commentsList: CommentProps[]
}

const Comment: React.FC<CommentProps> = ({
    user,
    content,
    time,
    likes,
    replies,
}) => (
    <div className="py-3">
        <div className="flex gap-3">
            <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2.5">
                    <h4 className="font-semibold text-sm">{user.name}</h4>
                    <p className="text-sm text-gray-600">{content}</p>
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <button className="hover:text-gray-900">
                        Like {likes && `(${likes})`}
                    </button>
                    <button className="hover:text-gray-900">Reply</button>
                    {replies && (
                        <button className="hover:text-gray-900">
                            View {replies} replies
                        </button>
                    )}
                    <span>{time}</span>
                </div>
            </div>
        </div>
    </div>
)

const Post: React.FC<PostProps> = ({
    user,
    content,
    time,
    image,
    likes,
    comments,
    shares,
    commentsList,
}) => {
    return (
        <div className="bg-white rounded-xl">
            {/* Post Header */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{user.role}</span>
                            <span>•</span>
                            <span>{time}</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2">
                    <IoEllipsisHorizontal className="text-xl" />
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="text-gray-600">{content}</p>
            </div>

            {/* Post Image */}
            {image && (
                <div className="mb-3">
                    <img
                        src={image}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-b border-gray-100">
                <button className="text-sm text-gray-500 hover:text-gray-900">
                    Liked ({likes})
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-900">
                    Comments ({comments})
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-900">
                    Share ({shares})
                </button>
            </div>

            {/* Comments Section */}
            <div className="p-4">
                {/* Add Comment */}
                <div className="flex gap-3 mb-4">
                    <img
                        src="https://picsum.photos/200?random=user"
                        alt="Your profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full bg-gray-100 rounded-full py-2 px-4 pr-12 focus:outline-none"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                            <svg
                                className="w-6 h-6 rotate-90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-1">
                    {commentsList.map((comment, index) => (
                        <Comment key={index} {...comment} />
                    ))}
                </div>

                {/* Load More Comments */}
                <button className="text-gray-500 hover:text-gray-700 text-sm mt-3">
                    Load more comments
                </button>
            </div>
        </div>
    )
}

export default Post
