"use client"

import { Modal } from 'antd'
import React, { useImperativeHandle, forwardRef } from 'react'
// import useWindowSize from '@/hooks/useWindowSize'

export interface CreateStoryModalRef {
    open: () => void
    close: () => void
}

export interface CreateStoryModalProps {

}

const CreateStoryModal = forwardRef<CreateStoryModalRef, CreateStoryModalProps>((prop: CreateStoryModalProps, ref) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    // const { width, height } = useWindowSize();

    useImperativeHandle(ref, () => ({
        open: () => setIsModalOpen(true),
        close: () => setIsModalOpen(false),
    }))

    return (
        <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            style={{ top: 20, overflow: 'auto' }}
            footer={null}
            // width={width < 768 ? '100%' : '600px'}
            title='Create Story'
        >
            <div className={`p-4 min-h-[calc(100vh-120px)]`}>

            </div>
        </Modal>
    )
})

export default CreateStoryModal