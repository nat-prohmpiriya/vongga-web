'use client';

import React from 'react';
import { IoApps } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';

import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { BsCart3 } from "react-icons/bs";
import AppsBtn from "./AppsBtn";

const HeaderBar = () => {
  const router = useRouter();
  const goToFeedPage = () => {
    router.push('/feed');
  };

  return (
    <div className="w-full h-16 bg-white border-b flex items-center px-4 grid grid-cols-3">
        {/* Left section */}
        <div className="col-span-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => goToFeedPage()}>
            <IoApps className="text-2xl text-blue-600" />
          </button>
        </div>

        {/* Center section - Search */}
        <div className="col-span-1">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div> */}
        </div>

        {/* Right section */}
        <div className="col-span-1 flex items-center justify-end gap-5">
          <AppsBtn/>
          <button className="p-2 bg-gray-100 rounded-lg">
            <BsCart3 className="text-xl text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg">
            <FaRegCommentDots className="text-xl text-gray-600" />
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
  );
};

export default HeaderBar;
