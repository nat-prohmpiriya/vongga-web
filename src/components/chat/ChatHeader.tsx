"use client"

import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import { ChatRoom, User } from '@/types/chat'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'

interface ChatHeaderProps {
    currentChatRoom: ChatRoom | null
    setCurrentChatRoom: (room: ChatRoom | null) => void
}

export default function ChatHeader({ currentChatRoom, setCurrentChatRoom }: ChatHeaderProps) {
    const { user } = useAuthStore()
    const [talkingWith, setTalkingWith] = useState<User | null>(null)

    useEffect(() => {
        if (currentChatRoom) {
            const member = currentChatRoom.users.find(m => m.id !== user?.id)
            if (member) {
                setTalkingWith(member)
            }
        }
    }, [currentChatRoom])


    if (!currentChatRoom) {
        return (
            <div className='p-4 border-b'>
                <div className='text-center text-gray-500'>
                    Select a chat or start a new conversation
                </div>
            </div>
        )
    }

    return (
        <div className='p-4 border-b flex justify-between'>
            <div className='flex items-center gap-3'>
                <Badge dot status="success" offset={[-2, 32]}>
                    <Avatar
                        src={talkingWith?.photoProfile || undefined}
                        icon={talkingWith?.photoProfile ? undefined : <UserOutlined />}
                    />
                </Badge>
                <div>
                    <div className='font-medium'>{talkingWith?.username}</div>
                    <div className='text-xs text-gray-500'>Online</div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <button className='p-2 hover:bg-gray-200 bg-gray-100 h-8 w-8 flex items-center justify-center rounded-full' onClick={() => { setTalkingWith(null); setCurrentChatRoom(null) }}>X</button>
            </div>
        </div>
    )
}
