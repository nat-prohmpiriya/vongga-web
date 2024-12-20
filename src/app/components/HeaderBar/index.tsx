'use client';

import React from 'react';
import { IoApps } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const HeaderBar = () => {
  const router = useRouter();
  const goToFeedPage = () => {
    router.push('/feed');
  };
  return (
    <div className="w-full h-16 bg-white border-b flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        {/* Left section */}
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={()=> goToFeedPage()}>
            <IoApps className="text-2xl text-blue-600" />
          </button>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-100 rounded-lg">
            <FaRegCommentDots className="text-xl text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg">
            <IoSettingsOutline className="text-xl text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg">
            <IoNotificationsOutline className="text-xl text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://picsum.photos/32/32"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
