"use client"

import { IoNotificationsOutline } from 'react-icons/io5'
import { Popover } from 'antd'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import notificationService, { notificationResponseItem } from '@/services/notification.service'
import { Badge } from 'antd'


const NotiBtn = () => {
    const [notificationsData, setNotificationsData] = useState<Notification[]>([])
    const { user } = useAuthStore()

    const fetchNotifications = async () => {
        try {
            const result = await notificationService.getNotifications({ limit: 10, offset: 0 })
            setNotificationsData(result)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    useEffect(() => {
        fetchNotifications()
        console.log(notificationsData)
    }, [user])


    const content = (
        <div className="w-[500px] p-1">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <div className="col-span-3 bg-white rounded-xl">
                <div className="flex flex-col bg-white rounded-xl p-3">
                    <div className="flex gap-4 my-3">
                        <h3>All</h3>
                        <h3>Unread</h3>
                    </div>
                    {JSON.stringify(notificationsData, null, 2)}
                </div>
            </div>
        </div>
    )

    return (
        <Popover trigger="hover" content={content} overlayInnerStyle={{ backgroundColor: '#F3F4F6' }}>
            <Badge count={notificationsData.length}>
                <button className="p-2 bg-gray-100 rounded-lg  hover:scale-125 transition-transform duration-300">
                    <IoNotificationsOutline className="text-xl text-gray-600" />
                </button>
            </Badge>
        </Popover>
    )
}

export default NotiBtn
