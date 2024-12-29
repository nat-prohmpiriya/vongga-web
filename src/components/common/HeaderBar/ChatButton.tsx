
"use client"

import React from 'react'
import { Button, Popover } from 'antd'
import { AiOutlineMessage } from "react-icons/ai";
import { useRouter } from 'next/navigation';

const ChatButton = () => {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);
    const content = (
        <div className="w-[355px] p-1">
            <div className="flex flex-col bg-white rounded-md h-[400px] ">

            </div>
        </div>
    )
    return (

        <Popover
            open={open}
            onOpenChange={setOpen}
            title={<span className='font-semibold cursor-pointer' onClick={() => { router.push('/chat'); setOpen(false); }}>Chat</span>}
            trigger="click"
            content={content}
            overlayInnerStyle={{ backgroundColor: '#F3F4F6' }}
        >
            <Button
                color="default"
                variant="filled"
                icon={<AiOutlineMessage size={24} />}
                shape='circle'
                size='large'
            />
        </Popover>
    )
}

export default ChatButton