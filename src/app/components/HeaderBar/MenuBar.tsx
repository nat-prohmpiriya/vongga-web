import { IoAppsOutline } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GrGroup } from "react-icons/gr";
import { MdWorkspacePremium } from "react-icons/md";
import { PiVideoLight } from "react-icons/pi";
import { CgGames } from "react-icons/cg";
import Link from 'next/link';
import { Popover } from "flowbite-react";
import { IoCreateOutline } from "react-icons/io5";
import { BiBookOpen } from "react-icons/bi";
import { BsPlayBtn } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { BiFlag } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

export default function MenuBar() {
    const listBtn = [
        { name: 'Feed', description: 'Lorem ipsum dolor sit amet.', icon: <IoHomeOutline className="text-xl" />, href: '/feed' },
        { name: 'Connections', description: 'Lorem ipsum dolor sit amet.', icon: <FaRegUser className="text-xl"/>, href: '/connections' },
        { name: 'Groups', description: 'Lorem ipsum dolor sit amet.', icon: <GrGroup className="text-xl" />, href: '/groups' },
        { name: 'Articles', description: 'Lorem ipsum dolor sit amet.', icon: <IoNewspaperOutline className="text-xl" /> , href: '/articles'},
        { name: 'Watch', description: 'Lorem ipsum dolor sit amet.', icon: <PiVideoLight className="text-xl" /> , href: '/watch'},
        { name: 'Events', description: 'Lorem ipsum dolor sit amet.', icon: <IoCalendarOutline className="text-xl" />, href: '/events' },
        { name: 'Marketplace', description: 'Lorem ipsum dolor sit amet.', icon: <IoStorefrontOutline className="text-xl" /> , href: '/marketplace'},
        // { name: 'Games', icon: <CgGames className="text-xl" /> , href: '/games'},
        { name: 'Premium', description: 'Lorem ipsum dolor sit amet.', icon: <MdWorkspacePremium className="text-xl" /> , href: '/premium'},
    ]

    const menuItems = [
        {
          id: 1,
          icon: <IoCreateOutline className="w-6 h-6" />,
          label: 'Post',
          onClick: () => {}
        },
        {
          id: 2,
          icon: <BiBookOpen className="w-6 h-6" />,
          label: 'Story',
          onClick: () => {}
        },
        {
          id: 3,
          icon: <BsPlayBtn className="w-6 h-6" />,
          label: 'Reel',
          onClick: () => {}
        },
        {
          id: 4,
          icon: <FaRegStar className="w-6 h-6" />,
          label: 'Life event',
          onClick: () => {}
        },
        {
          id: 5,
          icon: <BiFlag className="w-6 h-6" />,
          label: 'Page',
          onClick: () => {}
        },
        {
          id: 6,
          icon: <HiOutlineSpeakerphone className="w-6 h-6" />,
          label: 'Ad',
          onClick: () => {}
        },
        {
          id: 7,
          icon: <RiGroupLine className="w-6 h-6" />,
          label: 'Group',
          onClick: () => {}
        },
        {
          id: 8,
          icon: <FaRegCalendarAlt className="w-6 h-6" />,
          label: 'Event',
          onClick: () => {}
        },
        {
          id: 9,
          icon: <BsShop className="w-6 h-6" />,
          label: 'Marketplace',
          onClick: () => {}
        }
      ];
    const content = (
        <div className='p-4 w-[600px] bg-gray-100'>
            <h3 className="text-lg font-semibold">Menu</h3>
            <div className='grid grid-cols-5 p-1 gap-4 w-full'>
                <div className="col-span-3 bg-white rounded-xl p-4">
                    <h3 className="text-md font-semibold">Explore</h3>
                    {listBtn.map((item, index) => (
                        <Link key={index} href={item.href} className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-100">
                            {item.icon}
                            <div>
                                <p className='font-semibold text-sm'>{item.name}</p>
                                <p className='text-xs'>{item.description}</p>
                            </div>
                        </Link>
                    ))}
                    <div className="divide-y divide-gray-200"/>
                </div>

                <div className="col-span-2 bg-white rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-2">Create</h3>
                    {menuItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={item.onClick}>
                            <span className="w-9 h-9 p-2 rounded-full bg-gray-200 flex items-center justify-center">{item.icon}</span>
                            <div>
                                <p className='font-semibold text-sm'>{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <Popover content={content} arrow={false}>
            <button className="p-2 bg-gray-100 rounded-lg">
                <IoAppsOutline className="text-xl" />
            </button>
        </Popover>
    );
}