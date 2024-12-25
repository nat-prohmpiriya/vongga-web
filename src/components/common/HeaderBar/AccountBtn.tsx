
import { useAuthStore } from '@/store/auth.store'
import { Popover, Avatar } from 'antd'
import { FaRegUser } from 'react-icons/fa'
import { IoSettingsOutline } from "react-icons/io5";
import authService from '@/services/auth.service';
import { useRouter } from 'next/navigation';


const AccountBtn = () => {
    const { user, clearAuth } = useAuthStore()
    const router = useRouter()

    const handleLogout = async () => {
        await authService.logout()
        clearAuth()
        router.push('/')
    }

    const content = (
        <div className="p-4 w-[200px] bg-gray-100">
            <h3 className="text-lg font-semibold">Account</h3>
            <div className='bg-white p-4 rounded-lg'>
                <div className="flex flex-col gap-4 my-3">
                    <div className='flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={() => router.push(`/pages/${user?.username}`)}>
                        <FaRegUser />
                        <p className="font-semibold text-sm">profile</p>
                    </div>
                    <div className='flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={() => router.push('/setting')}>
                        <IoSettingsOutline />
                        <p className="font-semibold text-sm">Settings</p>
                    </div>
                    <span className='flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
                        <FaRegUser />
                        <p className="font-semibold text-sm">Logout</p>
                    </span>
                </div>
            </div>
        </div>
    )
    return (
        <Popover arrow={false} trigger="click" content={content}>
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 shadow-md">
                <Avatar
                    src={user?.photoProfile}
                    alt={user?.username || 'User'}
                    className="w-full h-full object-cover cursor-pointer "
                />
            </div>
        </Popover>
    )
}

export default AccountBtn