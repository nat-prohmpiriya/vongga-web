'use client'

import React from 'react'
import { IoAdd } from 'react-icons/io5'

interface StoryCardProps {
    image?: string
    name?: string
    isCreate?: boolean
}

const StoryCard: React.FC<StoryCardProps> = ({ image, name, isCreate }) => {
    return (
        <div className="relative min-w-[125px] h-[175px] rounded-xl overflow-hidden group cursor-pointer">
            {isCreate ? (
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                        <IoAdd className="text-2xl text-gray-600" />
                    </div>
                    <span className="text-gray-600 font-medium">
                        Post a Story
                    </span>
                </div>
            ) : (
                <>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-semibold">{name}</h3>
                    </div>
                </>
            )}
        </div>
    )
}

const ShortListBar = () => {
    const stories = [
        {
            name: 'Judy Nguyen',
            image: 'https://picsum.photos/400/600?random=1',
        },
        {
            name: 'Billy Vasquez',
            image: 'https://picsum.photos/400/600?random=2',
        },
        {
            name: 'Amanda Reed',
            image: 'https://picsum.photos/400/600?random=3',
        },
        {
            name: 'Lori Wilson',
            image: 'https://picsum.photos/400/600?random=4',
        },
        {
            name: 'Lori Wilson',
            image: 'https://picsum.photos/400/600?random=5',
        },
        {
            name: 'Lori Wilson',
            image: 'https://picsum.photos/400/600?random=6',
        },
        {
            name: 'Lori Wilson',
            image: 'https://picsum.photos/400/600?random=7',
        },
    ]

    return (
        <div className="w-full">
            <div className="px-6 py-4">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    <div className="flex-none snap-start">
                        <StoryCard isCreate />
                    </div>
                    {stories.map((story, index) => (
                        <div key={index} className="flex-none snap-start">
                            <StoryCard {...story} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShortListBar
