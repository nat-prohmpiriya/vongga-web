"use client"

import storyService, { CreateStory, mockStories } from '@/services/story.service'
import StoryCard from './StoryCard'
import CreateStoryCard from './CreateStoryCard'

const StoriesSlide = () => {
    return (
        <div className="p-4 bg-white rounded-md h-[200px] w-full overflow-x-auto no-scrollbar flex gap-4">
            <CreateStoryCard />
            {
                mockStories.map((story, index) => <StoryCard story={story} key={index} />)
            }
        </div>
    )
}

export default StoriesSlide