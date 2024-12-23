'use client'

import { useParams } from 'next/navigation'
import {
    FaPlay,
    FaPause,
    FaForward,
    FaBackward,
    FaExpand,
    FaCompress,
    FaVolumeUp,
    FaVolumeMute,
} from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'

export default function WatchDetailPage() {
    const params = useParams()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime)
            setDuration(videoRef.current.duration)
        }
    }

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect()
            const pos = (e.clientX - rect.left) / rect.width
            videoRef.current.currentTime = pos * videoRef.current.duration
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        if (videoRef.current) {
            videoRef.current.volume = newVolume
            setVolume(newVolume)
            setIsMuted(newVolume === 0)
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const relatedVideos = () => {
        return Array.from({ length: 10 }).map((_, index) => (
            <div key={uuidv4()} className="flex gap-2 mb-4 cursor-pointer">
                <img
                    src={`https://picsum.photos/200/150?random=${index}`}
                    alt="thumbnail"
                    className="w-40 h-24 object-cover rounded-lg"
                />
                <div>
                    <h3 className="font-medium text-sm">
                        Video Title {index + 1}
                    </h3>
                    <p className="text-gray-500 text-xs">Channel Name</p>
                    <p className="text-gray-500 text-xs">
                        123K views • 2 days ago
                    </p>
                </div>
            </div>
        ))
    }

    const comments = [
        {
            id: uuidv4(),
            user: {
                name: '@YSS1516_',
                avatar: 'https://picsum.photos/50/50?random=1',
                timeAgo: '19 นาทีที่ผ่านมา',
            },
            content:
                'เห็นเวิ่นๆเชยจระทำสามารถีวิตรมแม่น้ำไง โดยเชยจระทำกันเอง ขอบคุณสำเค้าภาพ',
            likes: 2,
            replies: [],
        },
        {
            id: uuidv4(),
            user: {
                name: '@สุชาศิลผลตรี',
                avatar: 'https://picsum.photos/50/50?random=2',
                timeAgo: '45 นาทีที่ผ่านมา',
            },
            content:
                'แพล่งๆกำไป สีเขา เลื่อนๆ ทั้งนั้น ถ่าไปที่ศูนย์แล้วเองด้วยครับ เซรม ม่นเลื่อน',
            likes: 7,
            replies: [],
        },
        {
            id: uuidv4(),
            user: {
                name: '@teerapat2566',
                avatar: 'https://picsum.photos/50/50?random=3',
                timeAgo: '6 นาทีที่ผ่านมา',
            },
            content:
                'น่ารักแล้วยังรักเมษตรอีก สุดยอดน้องแม่งคนไทยได้ดี ขอให้ใช้ชีวิตเจริญรุ่งเรืองการงานการเงินก้าวหน้ายิ่งๆขึ้น ว่าชอบ ติดตามครับ',
            likes: 1,
            replies: [],
        },
    ]

    const CommentSection = () => {
        return (
            <div className="bg-white p-4 mt-4 rounded-lg">
                <h2 className="font-bold mb-4">
                    ความคิดเห็น {comments.length} รายการ
                </h2>

                {/* Add comment input */}
                <div className="flex gap-4 mb-6">
                    <img
                        src="https://picsum.photos/50/50?random=0"
                        alt="user avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="เพิ่มความคิดเห็น..."
                            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Comments list */}
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <img
                                src={comment.user.avatar}
                                alt="user avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {comment.user.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {comment.user.timeAgo}
                                    </span>
                                </div>
                                <p className="mt-1">{comment.content}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1">
                                        <button className="hover:bg-gray-100 p-2 rounded-full">
                                            <AiOutlineLike className="text-lg" />
                                        </button>
                                        <span className="text-sm">
                                            {comment.likes}
                                        </span>
                                        <button className="hover:bg-gray-100 p-2 rounded-full">
                                            <AiOutlineDislike className="text-lg" />
                                        </button>
                                    </div>
                                    <button className="text-sm hover:bg-gray-100 px-3 py-1 rounded-full">
                                        ตอบกลับ
                                    </button>
                                </div>
                            </div>
                            <button className="hover:bg-gray-100 p-2 rounded-full h-fit">
                                <BsThreeDotsVertical />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
            <div className="col-span-3">
                <div className="bg-black relative group">
                    <video
                        ref={videoRef}
                        className="w-full"
                        onTimeUpdate={handleTimeUpdate}
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                    />

                    {/* Custom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Progress Bar */}
                        <div
                            ref={progressBarRef}
                            className="w-full h-1 bg-gray-400 cursor-pointer mb-4"
                            onClick={handleProgressBarClick}
                        >
                            <div
                                className="h-full bg-red-600"
                                style={{
                                    width: `${(currentTime / duration) * 100}%`,
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="hover:text-gray-300"
                                >
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button className="hover:text-gray-300">
                                    <FaBackward />
                                </button>
                                <button className="hover:text-gray-300">
                                    <FaForward />
                                </button>
                                <div className="flex items-center gap-2">
                                    <button onClick={toggleMute}>
                                        {isMuted ? (
                                            <FaVolumeMute />
                                        ) : (
                                            <FaVolumeUp />
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-20"
                                    />
                                </div>
                                <span className="text-sm">
                                    {formatTime(currentTime)} /{' '}
                                    {formatTime(duration)}
                                </span>
                            </div>
                            <button
                                onClick={toggleFullscreen}
                                className="hover:text-gray-300"
                            >
                                {isFullscreen ? <FaCompress /> : <FaExpand />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Video Info */}
                <div className="bg-white p-4 mt-4 rounded-lg">
                    <h1 className="text-xl font-bold mb-2">Video Title</h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://picsum.photos/50"
                                alt="channel avatar"
                                className="rounded-full w-12 h-12"
                            />
                            <div>
                                <h3 className="font-medium">Channel Name</h3>
                                <p className="text-gray-500 text-sm">
                                    1.2M subscribers
                                </p>
                            </div>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-gray-100 px-4 py-2 rounded-full">
                                Like
                            </button>
                            <button className="bg-gray-100 px-4 py-2 rounded-full">
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add Comment Section */}
                <CommentSection />
            </div>

            {/* Related Videos */}
            <div className="col-span-1">
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="font-bold mb-4">Related Videos</h2>
                    {relatedVideos()}
                </div>
            </div>
        </div>
    )
}
