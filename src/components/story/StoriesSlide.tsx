'use client'

import { IoAdd } from 'react-icons/io5'
import storiesService, { CreateStory, mockStories } from '@/services/story.service'
import ViewScreenStory, { ViewScreenStoryRef } from './ViewScreenStory'
import CreateStoryModal, { CreateStoryModalRef } from './CreateStoryModal'
import { useRef } from 'react'

interface StoryCardProps {
    story?: CreateStory
    isCreate?: boolean
    openModal?: () => void
    openViewScreen?: () => void
}


const StoryCard = (props: StoryCardProps) => {
    return (
        <div className="relative min-w-[125px] h-[175px] rounded-xl overflow-hidden group cursor-pointer">
            {props.isCreate ? (
                <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-white" onClick={() => props.openModal?.()}>
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                        <IoAdd className="text-2xl text-gray-600" />
                    </div>
                    <span className="text-gray-600 font-medium">
                        Post a Story
                    </span>
                </div>
            ) : (
                <div className='w-[125px] h-[175px]' onClick={() => props.openViewScreen?.()}>
                    <img
                        src={props.story?.mediaUrl}
                        alt={props.story?.mediaUrl}
                        className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-md font-semibold">display name</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

const ShortListBar = () => {
    const viewScreenStoryRef = useRef<ViewScreenStoryRef>(null)
    const createStoryModalRef = useRef<CreateStoryModalRef>(null)

    return (
        <div className="w-full bg-white rounded-xl mb-4">
            <div className="px-6 py-4">
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                    <div className="flex-none snap-start">
                        <StoryCard
                            isCreate
                            openModal={createStoryModalRef.current?.open}
                            openViewScreen={viewScreenStoryRef.current?.open}
                        />
                    </div>
                    {mockStories.map((story, index) => (
                        <div key={index} className="flex-none snap-start">
                            <StoryCard
                                story={story}
                                openModal={createStoryModalRef.current?.open}
                                openViewScreen={viewScreenStoryRef.current?.open}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ViewScreenStory ref={viewScreenStoryRef} />
            <CreateStoryModal ref={createStoryModalRef} />
        </div>
    )
}

export default ShortListBar
