"use client"
import { Avatar, Button, Input, Select } from 'antd';
import { useState } from 'react';
import { BsSend } from "react-icons/bs";
import { FaFileImport } from "react-icons/fa";



const ChatBotPage = () => {
    const [message, setMessage] = useState('');
    const [selectedModel, setSelectedModel] = useState('claude3.5');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        console.log('Sending message:', message);
        console.log('Selected model:', selectedModel);
        setMessage('');
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const listChats = [
        // mork data message with chatgpt
        {
            message: "Hello, how can I help you today?",
            sender: "bot"
        },
        {
            message: "I need help with my order",
            sender: "user"
        },
        {
            message: "Sure, let me check your order status",
            sender: "bot"
        },
        {
            message: "Your order has been shipped",
            sender: "bot"
        },
        {
            message: "Thanks for your patience",
            sender: "user"
        },
        {

        }
    ]
    return (
        <div className='grid grid-cols-5 mt-16 h-[calc(100vh-64px)]'>
            <div className='col-span-1 bg-white h-[calc(100vh-64px)] p-4'>
                <Select
                    defaultValue="claude3.5"
                    style={{ width: '100%', height: '40px' }}
                    onChange={handleChange}
                    options={[
                        { value: 'claude3.5', label: 'Claude 3.5' },
                        { value: 'gpt4o', label: 'GPT 4' },
                        { value: 'gpt4omini', label: 'GPT 4o mini' },
                        { value: 'gemini1.5Flash', label: 'Gemini 1.5' },
                        { value: 'gemini2.0Flash', label: 'Gemini 2.0' },
                    ]}
                />

            </div>
            <div className='col-span-4 bg-gray-100 relative p-4'>
                <div className='h-[calc(100vh-180px)] overflow-y-auto border-2 border-gray-300 rounded-lg p-4'>
                    {listChats.map((chat, index) => (
                        <div key={index} className={`flex flex-row items-center align-center gap-4 mb-4 ${chat.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <Avatar shape="circle" size={40} src="https://picsum.photos/40/40" />
                            <span className='text-sm font-semibold'>{chat.sender}</span>
                            <span className='text-sm'>{chat.message}</span>
                        </div>
                    ))}
                </div>
                <div className='absolute bottom-0 left-0 p-4 h-20 w-full flex flex-row gap-4 items-center'>
                    <Input
                        type="text"
                        style={{ width: '80%', height: '48px' }}
                        placeholder="Type your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        type='primary'
                        className="flex items-center justify-center"
                        onClick={handleSendMessage}
                        style={{ height: '48px', width: '10%' }}
                    >
                        <BsSend size={20} />
                    </Button>
                    <Button
                        type='primary'
                        className="flex items-center justify-center"
                        onClick={handleSendMessage}
                        style={{ height: '48px', width: '10%' }}
                    >
                        <FaFileImport size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatBotPage