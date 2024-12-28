"use client"

import { useImperativeHandle, useState, forwardRef, useEffect } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { usePathname, useSearchParams } from 'next/navigation'

export interface ViewScreenStoryRef {
    open: () => void
    close: () => void
}

export interface ViewScreenStoryProps {

}

const ViewScreenStory = forwardRef<ViewScreenStoryRef, ViewScreenStoryProps>((prop, ref) => {
    const [isViewScreenOpen, setIsViewScreenOpen] = useState(false)

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const queryMedia = searchParams.get('stories')

    useImperativeHandle(ref, () => ({
        open: () => setIsViewScreenOpen(true),
        close: () => setIsViewScreenOpen(false),
    }))

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setIsViewScreenOpen(false);
            // const deleteQueryMedia = pathname.replace(`?media=${queryMedia}`, '');
            // (window as Window).history.replaceState(null, '', deleteQueryMedia)
            return e.key === 'Escape'
        }
        if (isViewScreenOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewScreenOpen]);

    if (!isViewScreenOpen) return null

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 grid grid-cols-7">
            <div className="col-span-5 bg-black h-screen">
                <button className='absolute top-4 left-4 text-white text-4xl bg-black/30 p-1 rounded-full' onClick={() => setIsViewScreenOpen(false)}>
                    <IoCloseCircleOutline className='hover:scale-125 transition-all duration-300' />
                </button>
            </div>
            <div className="col-span-2 bg-white h-screen">
            </div>
        </div>
    )
})

export default ViewScreenStory