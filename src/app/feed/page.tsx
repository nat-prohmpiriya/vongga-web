import React from 'react'
import LeftSideBar from './components/LeftSideBar/index'
import ShortListBar from './components/ShortListBar'
import CreateContentBar from './components/CreateContentBar'
import RightSideBar from './components/RightSideBar'
import PostCard from './components/PostCard'
import ContainerPage from '@/components/common/ContainerPage'

export default function FeedPage() {
    return (
        <ContainerPage>
            <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-6 py-6">
                <div className="sticky top-16 overflow-y-auto col-span-1">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <LeftSideBar />
                    </div>
                </div>
                <div className="space-y-6 col-span-2">
                    <div className="bg-white rounded-xl overflow-hidden">
                        <ShortListBar />
                    </div>
                    <CreateContentBar />
                    {/* <PostCard /> */}
                </div>
                <div className="sticky top-16 overflow-y-auto col-span-1">
                    <RightSideBar />
                </div>
            </div>
        </ContainerPage>
    )
}
