'use client';

import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { BsCart3 } from "react-icons/bs";
import NotiBtn from "./NotiBtn";
import MenuBtn from "./MenuBtn";
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';

const HeaderBar = () => {
  const imgUrl = "https://picsum.photos/200?random=1";
  const router = useRouter();
  const { user} = useAuthStore();
  const [imageSrc, setImageSrc] = useState(user?.photoUrl || imgUrl);

 

  const goToFeedPage = () => {
    router.push('/feed');
  };


  return (
    <div className="w-full h-16 bg-white border-b flex items-center px-4 grid grid-cols-3">
        {/* Left section */}
        <div className="col-span-1">
          <span className="p-2 cursor-pointer rounded-lg" onClick={() => goToFeedPage()}>
            <span className="font-semibold text-green-200">SABAIMAI</span>
          </span>
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
          <MenuBtn/>
          <button className="p-2 bg-gray-100 rounded-lg" onClick={() => router.push('/cart')}>
            <BsCart3 className="text-xl text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg" onClick={() => router.push('/chat')}>
            <FaRegCommentDots className="text-xl text-gray-600" />
          </button>
          <NotiBtn/>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            {
              user?.photoUrl 
                ? <img src={imageSrc} alt={user?.displayName || 'User'} className="w-full h-full object-cover" onError={() => setImageSrc(imgUrl)}/> 
                : <div className="text-gray-400 rounded-full w-8 h-8"> { user?.displayName?.charAt(0) || 'A'}</div>
            }
          </div>
        </div>
    </div>
  );
};

export default HeaderBar;
