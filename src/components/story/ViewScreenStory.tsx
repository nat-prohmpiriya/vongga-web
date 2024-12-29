"use client"

import { useImperativeHandle, useState, forwardRef, useEffect } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import storyService, { StoryResponse } from '@/services/story.service'

export interface ViewScreenStoryRef {
    open: () => void
    close: () => void
}

export interface ViewScreenStoryProps {
    story: StoryResponse | undefined
}

const ViewScreenStory = forwardRef<ViewScreenStoryRef, ViewScreenStoryProps>((prop, ref) => {
    const { story } = prop
    const [isViewScreenOpen, setIsViewScreenOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsViewScreenOpen(true)
            viewStory()
        },
        close: () => setIsViewScreenOpen(false),
    }))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setIsViewScreenOpen(false);
            return e.key === 'Escape'
        }
        if (isViewScreenOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewScreenOpen]);

    const viewStory = () => {
        if (story) {
            storyService.viewStory(story.id)
        }
    }

    if (!isViewScreenOpen) return null

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7">
            <div className="col-span-1 md:col-span-3 lg:col-span-5 bg-black h-screen">
                <button className='absolute top-4 left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={() => setIsViewScreenOpen(false)}>
                    <IoCloseCircleOutline className='hover:scale-125 transition-all duration-300' />
                </button>
                <img
                    src={story?.media.url}
                    alt="Story"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="col-span-0 md:col-span-2 lg:col-span-2 bg-white h-screen">
            </div>
        </div>
    )
})

export default ViewScreenStory