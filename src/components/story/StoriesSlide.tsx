'use client'

import { IoAdd } from 'react-icons/io5'
import storiesService, { CreateStory, StoryResponse } from '@/services/story.service'
import ViewScreenStory, { ViewScreenStoryRef } from './ViewScreenStory'
import CreateStoryModal, { CreateStoryModalRef } from './CreateStoryModal2'
import { useRef, useState, useEffect } from 'react'


interface StoryCardProps {
    story?: StoryResponse
    isCreate?: boolean
}


const StoryCard = (props: StoryCardProps) => {
    const { story, isCreate } = props
    const viewScreenStoryRef = useRef<ViewScreenStoryRef>(null)
    const createStoryModalRef = useRef<CreateStoryModalRef>(null)
    return (
        <div className="relative min-w-[125px] h-[175px] rounded-xl overflow-hidden group cursor-pointer">
            {isCreate
                ? (
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white" onClick={() => createStoryModalRef.current?.open()}>
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                            <IoAdd className="text-2xl text-gray-600" />
                        </div>
                        <span className="text-gray-600 font-medium">
                            Post a Story
                        </span>
                    </div>
                )
                : (
                    <div className='w-[125px] h-[175px]' onClick={() => viewScreenStoryRef.current?.open()}>
                        <img
                            src={story?.media.url}
                            alt={story?.user.displayName || 'Story'}
                            className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-md font-semibold">{story?.user?.displayName || story?.user?.username}</h3>
                        </div>
                    </div>
                )}
            <ViewScreenStory ref={viewScreenStoryRef} story={story} />
            <CreateStoryModal ref={createStoryModalRef} />
        </div>
    )
}

const StorySlide = () => {
    const [stories, setStories] = useState<StoryResponse[]>([])

    const fetchStories = async () => {
        const stories = await storiesService.getAtiveStories()
        setStories(stories)
    }

    useEffect(() => {
        fetchStories()
    }, [])

    return (
        <div className="w-full bg-white rounded-xl mb-4">
            <div className="px-6 py-4">
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                    <div className="flex-none snap-start">
                        <StoryCard
                            isCreate
                        />
                    </div>
                    {stories.map((story, index) => (
                        <div key={index} className="flex-none snap-start">
                            <StoryCard
                                story={story}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default StorySlide
