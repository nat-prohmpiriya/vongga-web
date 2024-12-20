'use client';

import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { IoEarthOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import Image from 'next/image';

const LeftSideBar = () => {
  return (
    <div>
      {/* Profile Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-28">
          <img
            src="https://picsum.photos/800/200"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Profile Picture */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://picsum.photos/200"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-14 text-center px-4">
        <h2 className="text-xl font-bold mb-1">Sam Lanson</h2>
        <p className="text-gray-600 text-sm mb-3">Web Developer at Stackbros</p>
        <p className="text-gray-500 text-xs mb-6">
          I'd love to change the world, but they won't give me the source code.
        </p>

        {/* Stats */}
        <div className="flex justify-between mb-6 px-4">
          <div>
            <div className="text-lg font-bold">256</div>
            <div className="text-gray-600 text-sm">Post</div>
          </div>
          <div>
            <div className="text-lg font-bold">2.5K</div>
            <div className="text-gray-600 text-sm">Followers</div>
          </div>
          <div>
            <div className="text-lg font-bold">365</div>
            <div className="text-gray-600 text-sm">Following</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-2">
        <a href="/feed" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl mb-1">
          <IoHomeOutline className="text-xl" />
          <span className="font-medium">Feed</span>
        </a>
        <a href="/connections" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <FaRegUser className="text-xl" />
          <span>Connections</span>
        </a>
        <a href="/news" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <IoEarthOutline className="text-xl" />
          <span>Latest News</span>
        </a>
        <a href="/events" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <IoCalendarOutline className="text-xl" />
          <span>Events</span>
        </a>
        <a href="/groups" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <IoChatbubbleEllipsesOutline className="text-xl" />
          <span>Groups</span>
        </a>
        <a href="/notifications" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <IoNotificationsOutline className="text-xl" />
          <span>Notifications</span>
        </a>
        <a href="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl mb-1 text-gray-700">
          <IoSettingsOutline className="text-xl" />
          <span>Settings</span>
        </a>
      </nav>

      {/* View Profile Button */}
      <div className="mt-6 px-4 pb-4">
        <a
          href="/profile"
          className="block w-full py-2.5 text-center text-blue-500 hover:text-blue-600 font-medium"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default LeftSideBar;
