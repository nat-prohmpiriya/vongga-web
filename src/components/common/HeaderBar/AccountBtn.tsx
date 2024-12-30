"use client"

import { useAuthStore } from '@/store/auth.store'
import { Popover, Avatar } from 'antd'
import { FaRegUser } from 'react-icons/fa'
import { IoSettingsOutline } from "react-icons/io5";
import authService from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from 'react';

const AccountBtn = () => {
    const { user, clearAuth } = useAuthStore()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await authService.logout()
        clearAuth()
        router.push('/')
        setOpen(false)
    }


    const content = (
        <div className="w-[355px] p-1">
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            <div className="col-span-3 bg-white rounded-xl">
                <div className="flex flex-col bg-white rounded-xl p-3">
                    <div
                        className='flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-100 cursor-pointer'
                        onClick={() => { router.push(`/pages/${user?.username}`); setOpen(false) }}
                    >
                        <FaRegUser size={18} />
                        <p className="font-semibold text-sm">{user?.displayName || user?.username}</p>
                    </div>
                    <div
                        className='flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-100 cursor-pointer'
                        onClick={() => router.push('/setting')}
                    >
                        <IoSettingsOutline size={18} />
                        <p className="font-semibold text-sm">Settings</p>
                    </div>
                    <span className='flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
                        <AiOutlineLogout size={18} />
                        <p className="font-semibold text-sm">Logout</p>
                    </span>
                </div>
            </div>
        </div>
    )
    return (
        <Popover trigger="click" open={open} onOpenChange={setOpen} content={content} overlayInnerStyle={{ backgroundColor: '#F3F4F6' }}>
            {/* User Avatar */}
            <Avatar
                size='large'
                src={user?.photoProfile}
                alt={user?.username || 'User'}
                className=" cursor-pointer"
            />
        </Popover>
    )
}

export default AccountBtn