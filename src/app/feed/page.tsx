import React from 'react';
import LeftSideBar from './components/LeftSideBar/index';
import ShortListBar from './components/ShortListBar';
import CreateContentBar from './components/CreateContentBar';
import RightSideBar from './components/RightSideBar';
import Posts from './components/Posts';

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4">
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
          <Posts />
        </div>
        <div className="sticky top-16 overflow-y-auto col-span-1">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}