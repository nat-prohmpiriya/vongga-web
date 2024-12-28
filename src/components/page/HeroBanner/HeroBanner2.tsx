"use client"

import React from 'react'
import { useState } from 'react'
import { User } from '@/types/user'
import { Row, Col, Button, Flex } from 'antd'
import { MdAddAPhoto } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TbPhotoEdit } from "react-icons/tb";
import { HiDotsHorizontal } from "react-icons/hi";

type HeroBannerProp = {
    profilePage: User
}

const HeroBanner2 = (props: HeroBannerProp) => {
    const [profilePage, setProfilePage] = useState<User | null>(null)
    return (
        <div className="bg-white mb-4">
            {/* photoCover */}
            <img
                src={props.profilePage.photoCover}
                alt="Cover"
                className="w-full h-64 object-cover"
            />

            {/* info profile */}
            <Row className=' mt-[-90px]'>
                <Col span={16} className='pl-8'>
                    <img
                        src={props.profilePage.photoProfile}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-4 border-gray-300 object-cover"
                    />
                    <div className="flex flex-col">
                        <Button // upload photo profile
                            type='primary'
                            color="default"
                            variant="solid"
                            icon={<MdAddAPhoto size={24} />}
                            shape='circle'
                            size='large'
                            className='-mt-8 ml-[120px] z-10 mb-5'
                        />
                        <h2 className="text-lg font-semibold">{props.profilePage.displayName || props.profilePage.username}</h2>
                        <p className="text-gray-500 mb-2">{props.profilePage.bio}</p>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500">{props.profilePage.followersCount || 0} followers</span>
                            <span className="text-gray-500">{props.profilePage.followingCount || 0} following</span>
                        </div>
                    </div>
                </Col>

                <Col span={8}>
                    <Flex justify='end' className='h-full' gap={16}>
                        <Button // upload photo cover
                            color="default"
                            variant="solid"
                            icon={<MdAddAPhoto size={24} />}
                            size='large'
                            className='mr-10 mt-5'
                            style={{ width: 120 }}
                        />
                    </Flex>
                </Col>
            </Row>
            <Row justify={'end'}>
                <Col xs={24} sm={24} md={8}>
                    <Flex gap={8} className='p-4'>
                        <Button
                            type='default'
                            color="default"
                            variant="solid"
                            size='large'
                            block
                            icon={<TbPhotoEdit size={24} />}
                        >
                            Add Story
                        </Button>
                        <Button
                            type='default'
                            color="default"
                            variant="filled"
                            size='large'
                            icon={<FaEdit size={24} />}
                            block
                        >
                            Edit Profile
                        </Button>
                        <Button
                            type='default'
                            color="default"
                            variant="filled"
                            size='large'
                            icon={<HiDotsHorizontal size={24} />}
                            style={{ width: 120 }}
                        />
                    </Flex>
                </Col>
            </Row>
        </div>
    )
}

export default HeroBanner2