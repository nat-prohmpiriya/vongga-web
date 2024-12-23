'use client'

import React from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { IoVideocamOutline } from 'react-icons/io5'
import { IoCalendarOutline } from 'react-icons/io5'
import { IoHappyOutline } from 'react-icons/io5'
import { IoEllipsisHorizontalOutline } from 'react-icons/io5'

const CreateContentBar = () => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            {/* Input Area */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src="https://picsum.photos/100"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Share your thoughts..."
                        className="w-full px-4 py-2 bg-gray-100 rounded-full text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <IoImageOutline className="text-xl text-green-500" />
                    <span>Photo</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <IoVideocamOutline className="text-xl text-blue-500" />
                    <span>Video</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <IoCalendarOutline className="text-xl text-red-500" />
                    <span>Event</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <IoHappyOutline className="text-xl text-yellow-500" />
                    <span>Feeling /Activity</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <IoEllipsisHorizontalOutline className="text-xl" />
                </button>
            </div>
        </div>
    )
}

export default CreateContentBar
