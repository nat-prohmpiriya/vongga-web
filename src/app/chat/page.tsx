'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoCall, IoVideocam, IoInformationCircle } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';

export default function ChatPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-[360px] border-r">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Chats</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <BsThreeDots className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <IoIosSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Search Messenger"
              className="w-full p-2 bg-gray-100 rounded-full"
            />
          </div>
        </div>
        {/* Chat List */}
        <div className="overflow-y-auto">
          {/* Chat items would go here */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 relative">
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold">Chat Name</h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <IoCall className="w-6 h-6 text-blue-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <IoVideocam className="w-6 h-6 text-blue-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <IoInformationCircle className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm flex items-center gap-2">
              <FaLock className="w-3 h-3" />
              End-to-end encrypted
            </div>
          </div>
          {/* Messages would go here */}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Aa"
              className="flex-1 p-2 rounded-full bg-gray-100"
            />
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BiLike className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[320px] border-l p-4">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 mb-3"></div>
          <h3 className="font-semibold mb-1">Chat Name</h3>
          <p className="text-sm text-gray-500">Active now</p>
          
          <div className="flex gap-4 mt-4">
            <button className="flex flex-col items-center">
              <div className="p-2 hover:bg-gray-100 rounded-full">
                <IoIosSearch className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">Search</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="p-2 hover:bg-gray-100 rounded-full">
                <IoInformationCircle className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">Profile</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="p-2 hover:bg-gray-100 rounded-full">
                <BsThreeDots className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1">More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}