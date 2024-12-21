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

export default function AppsBtn() {
    const listBtn = [
        { name: 'Feed', icon: <IoHomeOutline className="text-xl" />, href: '/feed' },
        { name: 'Connections', icon: <FaRegUser className="text-xl"/>, href: '/connections' },
        { name: 'Groups', icon: <GrGroup className="text-xl" />, href: '/groups' },
        { name: 'Articles', icon: <IoNewspaperOutline className="text-xl" /> , href: '/articles'},
        { name: 'Watch', icon: <PiVideoLight className="text-xl" /> , href: '/watch'},
        { name: 'Events', icon: <IoCalendarOutline className="text-xl" />, href: '/events' },
        { name: 'Marketplace', icon: <IoStorefrontOutline className="text-xl" /> , href: '/marketplace'},
        { name: 'Games', icon: <CgGames className="text-xl" /> , href: '/games'},
        { name: 'Premium', icon: <MdWorkspacePremium className="text-xl" /> , href: '/premium'},
    ]
    const content = (
        <div className="grid grid-cols-3 gap-2 p-2">
            {listBtn.map((item, index) => (
                <Link key={index} href={item.href} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                    {item.icon}
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
    )

    return (
        <Popover content={content} arrow={false} >
            <button className="p-2 bg-gray-100 rounded-lg">
                <IoAppsOutline className="text-xl" />
            </button>
        </Popover>
    );
}