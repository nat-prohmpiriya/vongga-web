
import React from 'react'
import { IoAdd } from 'react-icons/io5'

const CreateStoryCard = () => {
    return (
        <div className='flex flex-col rounded-xl shadow-lg'>
            <div className='w-[125px] rounded-xl bg-gray-200 h-[175px] relative hover:brightness-125 hover:scale-105 transition-all duration-300 cursor-pointer'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center'>
                        <IoAdd className='text-2xl text-white' />
                        <div className='absolute bottom-4 left-5 text-black border-t border-gray-400'>
                            <h3 className='text-sm font-semibold'>Create Story</h3>
                        </div>
                    </div>
                </div>
            </div>
            <CreateStoryCard />
        </div>
    )
}

export default CreateStoryCard