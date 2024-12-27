"use client"

import { Post } from '@/types/post'
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSearchParams, usePathname } from 'next/navigation'
import CommentsBox from './CommentContent';
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { Avatar } from 'antd';
import { formatISOToTimeAgo } from '@/utils/converTime';
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { GiWorld } from "react-icons/gi";

export type PostVisibility = 'public' | 'private'

export interface ViewMediaRef {
    open: (index: number) => void
    close: () => void
}

interface ViewMediaProps {
    post: Post
}

const ViewMedia = forwardRef<ViewMediaRef, ViewMediaProps>((prop, ref) => {
    const { post } = prop
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryMedia = searchParams.get('media')
    const listSubposts = post.subPosts || []
    const allposts = [post, ...listSubposts]
    const [currentPostIndex, setCurrentPostIndex] = useState(0)
    const [currentPost, setCurrentPost] = useState(allposts[currentPostIndex])

    useImperativeHandle(ref, () => ({
        open(index: number) {
            (window as Window).history.replaceState(null, '', pathname + `?media=${post.id}`)
            setCurrentPostIndex(index)
            setIsOpen(true)
        },
        close() {
            setIsOpen(false)
        }
    }))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setIsOpen(false);
            const deleteQueryMedia = pathname.replace(`?media=${queryMedia}`, '');
            (window as Window).history.replaceState(null, '', deleteQueryMedia)
            return e.key === 'Escape'
        }
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'ArrowRight') {
                setCurrentPostIndex(prev => prev < allposts.length - 1 ? prev + 1 : prev)
            }
            if (event.key === 'ArrowLeft') {
                setCurrentPostIndex(prev => prev > 0 ? prev - 1 : prev)
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    useEffect(() => {
        if (!queryMedia) setIsOpen(false);
    }, [queryMedia])

    useEffect(() => {
        setCurrentPost(allposts[currentPostIndex])
    }, [currentPostIndex])

    if (!isOpen) return null

    const handlerClose = () => {
        (window as Window).history.replaceState(null, '', pathname)
        setIsOpen(false)
    }

    const handlerNext = () => {
        if (currentPostIndex === allposts.length - 1) return setCurrentPostIndex(0)
        setCurrentPostIndex((prev) => prev + 1)
    }

    const handlerPrev = () => {
        if (currentPostIndex === 0) return setCurrentPostIndex(allposts.length - 1)
        setCurrentPostIndex((prev) => prev - 1)
    }


    return (
        <div className='fixed inset-0 z-[9999] overflow-y-auto bg-black/50 w-screen h-screen grid grid-cols-7'>
            <div className='col-span-5 bg-black flex justify-center relative h-screen '>
                <button className='absolute top-4 left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={handlerClose}>
                    <IoCloseCircleOutline className='hover:scale-125 transition-all duration-300' />
                </button>
                <button className='absolute top-[calc(50%)] right-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={handlerNext}>
                    <IoArrowForwardCircleOutline className='hover:scale-125 transition-all duration-300' />
                </button>
                <button className='absolute top-[calc(50%)] left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={handlerPrev}>
                    <IoArrowBackCircleOutline className='hover:scale-125 transition-all duration-300' />
                </button>
                <img src={allposts[currentPostIndex]?.media?.[0].url} className='object-contain' />
            </div>
            <div className='col-span-2 bg-white p-4'>
                <div className='flex items-center gap-2 mb-4'>
                    <Avatar size='large' src={post?.user?.photoProfile} />
                    <div className='font-semibold'>{post?.user?.username}</div>
                    <div>{formatISOToTimeAgo(post?.createdAt || '')}</div>
                    <span className="flex items-center gap-1">
                        <span className="text-gray-400 ">{post?.visibility === 'public' ? <GiWorld className="text-xl" /> : <RiGitRepositoryPrivateLine className="text-md" />}</span>
                        <span className="font-semibold text-gray-400 text-xs">
                            {post?.visibility === 'public' ? 'Public' : 'Private'}
                        </span>
                    </span>
                </div>
                <div>
                    {currentPost?.content || currentPost?.id}
                </div>
                <div>
                    {allposts[currentPostIndex]?.content}
                </div>

                {/* status post */}
            </div>
        </div>
    )
})

export default ViewMedia 