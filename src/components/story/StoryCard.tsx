"use client";

import { CreateStory } from '@/services/story.service'
import Image from 'next/image'

interface StoryCardProps {
    story: CreateStory
}

const StoryCard = ({ story }: StoryCardProps) => {
    return (
        <div className='flex flex-col rounded-xl shadow-lg'>
            <div className='w-[125px] rounded-xl bg-gray-200 h-[175px] relative hover:brightness-125 hover:scale-105 transition-all duration-300 cursor-pointer'>
                <Image src={story.mediaUrl} alt={story.caption} fill className='object-cover rounded-xl' />
            </div>
        </div>
    )
}

export default StoryCard