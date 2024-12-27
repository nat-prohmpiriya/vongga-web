'use client'

import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { IoPersonAdd } from 'react-icons/io5'
import { IoEllipsisHorizontal } from 'react-icons/io5'

interface FollowUserProps {
    name: string
    role: string
    image: string
    isFollowing?: boolean
}

const FollowUser: React.FC<FollowUserProps> = ({
    name,
    role,
    image,
    isFollowing,
}) => (
    <div className="flex items-center gap-3 py-2">
        <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <p className="text-gray-500 text-xs truncate">{role}</p>
        </div>
        <button
            className={`w-8 h-8 flex items-center justify-center rounded-full ${isFollowing
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
        >
            {isFollowing ? (
                <IoPersonAdd className="text-lg" />
            ) : (
                <IoAdd className="text-lg" />
            )}
        </button>
    </div>
)

interface NewsItemProps {
    title: string
    time: string
    isPinned?: boolean
}

const NewsItem: React.FC<NewsItemProps> = ({ title, time, isPinned }) => (
    <div className="py-3">
        <h3 className="font-medium text-[15px] mb-1 hover:text-blue-600 cursor-pointer">
            {title}
        </h3>
        <p className="text-gray-500 text-xs">{time}</p>
        {isPinned && (
            <div className="mt-2">
                <img
                    src="https://picsum.photos/300/150"
                    alt="News"
                    className="rounded-xl w-full h-24 object-cover"
                />
            </div>
        )}
    </div>
)

const RightSideBar = () => {
    const users = [
        {
            name: 'Frances Guerrero',
            role: 'News anchor',
            image: 'https://picsum.photos/200?random=1',
        },
        {
            name: 'Lori Ferguson',
            role: 'Web Developer',
            image: 'https://picsum.photos/200?random=2',
        },
        {
            name: 'Samuel Bishop',
            role: 'News anchor',
            image: 'https://picsum.photos/200?random=3',
            isFollowing: true,
        },
        {
            name: 'Dennis Barrett',
            role: 'Web Developer at Google',
            image: 'https://picsum.photos/200?random=4',
        },
        {
            name: 'Judy Nguyen',
            role: 'News anchor',
            image: 'https://picsum.photos/200?random=5',
        },
    ]

    const news = [
        { title: 'Ten questions you should answer truthfully', time: '2hr' },
        { title: 'Five unbelievable facts about money', time: '3hr' },
        {
            title: 'Best Pinterest Boards for learning about business',
            time: '4hr',
            isPinned: true,
        },
        { title: 'Skills that you can learn from business', time: '6hr' },
    ]

    return (
        <div className="space-y-6">
            {/* premium ads */}
            <div className="bg-white rounded-xl p-4">
                <h2 className="font-semibold">Premium ads</h2>
            </div>
            {/* invite use chatbot */}
            <div className="bg-white rounded-xl p-4">
                <h2 className="font-semibold">Invite use Chatbot</h2>
            </div>
            {/* Who to follow */}
            <div className="bg-white rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Who to follow</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                        <IoEllipsisHorizontal className="text-xl" />
                    </button>
                </div>
                <div className="space-y-1">
                    {users.map((user, index) => (
                        <FollowUser key={index} {...user} />
                    ))}
                </div>
                <button className="w-full text-center text-blue-500 hover:text-blue-600 text-sm font-medium mt-4">
                    View more
                </button>
            </div>
        </div>
    )
}

export default RightSideBar
