'use client';

import { IoHomeOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GrGroup } from "react-icons/gr";
import { PiVideoLight } from "react-icons/pi";
import { CgGames } from "react-icons/cg";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';

const LeftSideBar = () => {
  const imageUrl = 'https://picsum.photos/800/200';
  const router = useRouter();
  const { user} = useAuthStore();
  const [imageSrc, setImageSrc] = useState(user?.photoUrl || imageUrl);

  const listMenu = [
    { name: 'Feed', icon: <IoHomeOutline className="text-xl" />, href: '/feed' },
    { name: 'Connections', icon: <FaRegUser className="text-xl"/>, href: '/connections' },
    { name: 'Groups', icon: <GrGroup className="text-xl" />, href: '/groups' },
    { name: 'Articles', icon: <IoNewspaperOutline className="text-xl" /> , href: '/articles'},
    { name: 'Watch', icon: <PiVideoLight className="text-xl" /> , href: '/watch'},
    { name: 'Events', icon: <IoCalendarOutline className="text-xl" />, href: '/events' },
    { name: 'Marketplace', icon: <IoStorefrontOutline className="text-xl" /> , href: '/marketplace'},
    { name: 'Games', icon: <CgGames className="text-xl" /> , href: '/games'},

  ];
  const goToProfilePage = () => {
    const displayName = user?.displayName;
    if (displayName) {
      const snakeCaseDisplayName = displayName.replace(/\s+/g, '_').toLowerCase();
      router.push(`/profile/${snakeCaseDisplayName}`);
    }
    router.push('/pages/');
  };
  return (
    <div className='pb-6'>
      {/* Profile Section */}
      <div className="relative cursor-pointer" onClick={() => goToProfilePage()}>
        {/* Cover Image */}
        <div className="h-28" >
          <img
            src="https://picsum.photos/800/200"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Profile Picture */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
            {
              user?.photoUrl && (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={() => setImageSrc(imageUrl)}
                />
              ) 
            }
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-14 text-center px-4">
        <h2 className="text-xl font-bold mb-1">{user?.displayName}</h2>
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
        {listMenu.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={
            item.href === '/feed'
              ? 'flex items-center gap-3 py-3 px-4 rounded-lg bg-blue-100 text-blue-600 '
              : 'flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100'
          }
        >
          {item.icon}
          <span className="font-medium">{item.name}</span>
        </Link>
        ))}
      </nav>
    </div>
  );
};

export default LeftSideBar;
