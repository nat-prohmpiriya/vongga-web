'use client'

import React from 'react'
import Image from 'next/image'
import { FaCirclePlay } from 'react-icons/fa6'

interface Photo {
    id: string
    imageUrl: string
    likes: number
    comments: number
}

interface GallerySectionProps {
    photos?: Photo[]
}

const GallerySection: React.FC<GallerySectionProps> = () => {
    const photos = () => {
        // create list number 10
        const listNumberRandom = Math.floor(Math.random() * 100) + 1
        return Array.from({ length: listNumberRandom }, (_, index) => ({
            id: `photo-${index + 1}`,
            imageUrl: `https://picsum.photos/200?random=${index + 1}`,
            likes: Math.floor(Math.random() * 100) + 1,
            comments: Math.floor(Math.random() * 100) + 1,
        }))
    }

    return (
        <div className="p-4 bg-white rounded-md">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold">Videos</h2>
                    <h2 className="text-xl font-semibold">Shorts</h2>
                    <h2 className="text-xl font-semibold">Live</h2>
                </div>
                <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    + Upload Video
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {/* Add Photo Button */}
                {/* <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="text-blue-600 mb-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm text-gray-600">Add photo</span>
        </div> */}

                {/* Photo Grid */}
                {photos().map((photo) => (
                    <div
                        key={photo.id}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                    >
                        <Image
                            src={photo.imageUrl}
                            alt="Gallery photo"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-0 left-0 from-black/50  p-3 flex items-center justify-between text-white">
                            <span className="text-white text-sm">1:30</span>
                        </div>
                        <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                            <FaCirclePlay
                                className="w-8 h-8"
                                style={{ color: 'red' }}
                            />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                            <div className="flex gap-4 text-white">
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                    <span className="text-sm">
                                        {photo.likes}K
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm">
                                        {photo.comments}K
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm px-2">Views</span>
                                    <span className="text-sm">2.3M</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GallerySection
