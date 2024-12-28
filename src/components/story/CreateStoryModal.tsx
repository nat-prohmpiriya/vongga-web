"use client"

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUpload } from '@/hooks/useUpload';
import { RcFile } from 'antd/es/upload';

export interface CreateStoryModalRef {
    open: () => void;
    close: () => void;
}

interface StoryFormData {
    mediaUrl: string;
    mediaType: 'image' | 'video';
    mediaDuration: number;
    thumbnail: string;
    caption: string;
    location: string;
}

const CreateStoryModal = forwardRef<CreateStoryModalRef>((_, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<StoryFormData>();
    const { upload, isUploading } = useUpload();

    useImperativeHandle(ref, () => ({
        open: () => setIsModalOpen(true),
        close: () => {
            setIsModalOpen(false);
            form.resetFields();
        },
    }));

    const handleSubmit = async (values: StoryFormData) => {
        try {
            // Here you would typically make an API call to save the story
            console.log('Story data:', values);
            message.success('Story created successfully');
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('Failed to create story');
        }
    };

    const handleUpload = async (file: RcFile) => {
        const result = await upload(file, 'story');
        console.log(handleUpload, result);
        // if (result) {
        //     form.setFieldsValue({
        //         mediaUrl: result.,
        //         mediaType: file.type.startsWith('image/') ? 'image' : 'video',
        //         mediaDuration: 0,
        //         thumbnail: result.data.path
        //     });
        //     return false; // Prevent default upload behavior
        // }
        // return false;
    };

    const uploadButton = (
        <div className="flex flex-col items-center">
            <PlusOutlined />
            <div className="mt-2">Upload</div>
        </div>
    );

    return (
        <Modal
            title="Create New Story"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            className="w-full max-w-lg"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-4"
            >
                <Form.Item
                    name="mediaUrl"
                    rules={[{ required: true, message: 'Please upload media' }]}
                    className="mb-4"
                >
                    <Upload
                        listType="picture-card"
                        className="w-full"
                        fileList={[]}
                        beforeUpload={handleUpload}
                        maxCount={1}
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="caption"
                    label="Caption"
                    rules={[{ required: true, message: 'Please enter a caption' }]}
                >
                    <Input.TextArea
                        placeholder="Write a caption..."
                        className="w-full"
                        rows={3}
                    />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter a location' }]}
                >
                    <Input
                        placeholder="Add location"
                        className="w-full"
                    />
                </Form.Item>

                {/* Hidden fields that will be set programmatically */}
                <Form.Item name="mediaType" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="mediaDuration" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="thumbnail" hidden>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
});

CreateStoryModal.displayName = 'CreateStoryModal';

export default CreateStoryModal;