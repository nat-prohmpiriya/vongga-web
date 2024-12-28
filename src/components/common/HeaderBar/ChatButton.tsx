
"use client"

import React from 'react'
import { Button, Popover } from 'antd'
import { AiOutlineMessage } from "react-icons/ai";


const ChatButton = () => {
    return (
        <Popover title="Chat" trigger={'click'} content={<div>Chat content</div>}>
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