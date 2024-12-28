
"use client"

import React from 'react'
import { Button, Popover } from 'antd'
import { AiOutlineMessage } from "react-icons/ai";


const ChatButton = () => {
    const content = <div>Chat content</div>
    return (
        <Popover title="Chat" trigger={'click'} content={content}>
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