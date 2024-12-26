"use client"

import { Post } from '@/types/post'
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSearchParams, usePathname } from 'next/navigation'
import CommentsBox from './CommentsBox';
import PostContent from './PostContent';

export interface ViewMediaRef {
    open: () => void
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

    useImperativeHandle(ref, () => ({
        open() {
            (window as Window).history.replaceState(null, '', pathname + `?media=${post.id}`)
            setIsOpen(true)
        },
        close() {
            setIsOpen(false)
        }
    }))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    useEffect(() => { }, [])

    useEffect(() => {
        if (!queryMedia) setIsOpen(false)
    }, [queryMedia])

    if (!isOpen) return null

    const handlerClose = () => {
        (window as Window).history.replaceState(null, '', pathname)
        setIsOpen(false)
    }

    return (
        <div className='fixed inset-0 z-[9999] overflow-y-auto bg-black/50 w-screen h-screen grid grid-cols-7'>
            <div className='col-span-5 bg-black'>
                <button className='absolute top-4 left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={handlerClose}>
                    <IoCloseCircleOutline />
                </button>
                <img src={post.media?.[0].url} className='w-full h-full object-cover' />
            </div>
            <div className='col-span-2 bg-white'>
                <PostContent post={post} postType='viewMedia' />
                {/* {
                    (prop.comments || []).map((comment) => (
                        <CommentsBox key={comment.id} comment={comment} />
                    ))
                } */}
            </div>
        </div>
    )
})

export default ViewMedia 