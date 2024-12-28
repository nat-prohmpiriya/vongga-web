"use client"

import { IoNotificationsOutline } from 'react-icons/io5'
import { Avatar, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import notificationService, { notificationResponseItem } from '@/services/notification.service'
import { Badge } from 'antd'
import { formatISOToTimeAgo } from '@/utils/converTime'
import { PiUserCircleCheck } from "react-icons/pi";
import { useRouter } from 'next/navigation'
import { UserOutlined } from '@ant-design/icons';

const NotiBtn = () => {
    const [notificationsData, setNotificationsData] = useState<[notificationResponseItem] | []>([])
    const { user } = useAuthStore()
    const router = useRouter()

    const fetchNotifications = async () => {
        try {
            const result = await notificationService.getNotifications({ limit: 10, offset: 0 })
            setNotificationsData(result)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    const markNotificationAsRead = async (notificationId: string) => {
        try {
            await notificationService.markNotificationAsRead(notificationId)
            fetchNotifications()
        } catch (error) {
            console.error('Error marking notification as read:', error)
        }
    }

    const countNotRead = (notificationsData: [notificationResponseItem] | []) => {
        return notificationsData.filter((notification: notificationResponseItem) => !notification.isRead).length
    }

    useEffect(() => {
        fetchNotifications()
    }, [user])


    const content = (
        <div className="w-[350px] p-1">
            <h3 className="text-lg font-semibold mb-3 ">Notifications</h3>
            <div className="flex flex-col bg-white rounded-t-xl ">
                <div className="flex gap-4 my-3 px-4">
                    <h3 className="font-semibold">All</h3>
                    {/* <h3>Unread</h3> */}
                </div>
                {
                    notificationsData.map((notification: notificationResponseItem) => (
                        <div
                            key={notification.id}
                            className={`grid grid-cols-5 gap-4 cursor-pointer py-4 px-2 ${!notification.isRead ? 'bg-blue-50' : ''} `}
                            onClick={() => markNotificationAsRead(notification.id)}
                        >
                            <div className="col-span-1 flex flex-col justify-center">
                                <Badge count={
                                    <div className='bg-black/5 rounded-full w-8 h-8 flex items-center justify-center'>
                                        {notification.type === 'friend_request'
                                            ? <PiUserCircleCheck className="text-green-500 text-2xl" />
                                            : <IoNotificationsOutline className="text-blue-500 text-2xl" />
                                        }
                                    </div>
                                }>
                                    {
                                        notification?.sender?.photoProfile
                                            ? <Avatar size={52} src={notification?.sender?.photoProfile} className='' onClick={() => router.push(`/pages/${notification.sender.username}`)} />
                                            : <Avatar size={52} icon={<UserOutlined />} className='' onClick={() => router.push(`/pages/${notification.sender.username}`)} />
                                    }
                                </Badge>
                            </div>
                            <div className="flex flex-col col-span-4 ml-5">
                                <h3 className="font-semibold">{notification?.sender?.displayName || notification.sender.username}</h3>
                                <p className="text-gray-500">{notification.message}</p>
                                <p className="text-gray-500 text-xs mt-1 flex justify-between">
                                    <span>{formatISOToTimeAgo(notification.createdAt)} ago</span>
                                </p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div >
    )

    return (
        <Popover trigger="click" content={content} overlayInnerStyle={{ backgroundColor: '#F3F4F6' }}>
            <Badge count={countNotRead(notificationsData)}>
                <button className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300">
                    <IoNotificationsOutline className="text-xl text-gray-600" />
                </button>
            </Badge>
        </Popover>
    )
}

export default NotiBtn
