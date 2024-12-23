'use client'

import React from 'react'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { IoSchoolOutline } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiOutlineCalendar } from 'react-icons/hi2'
import { HiOutlineMail } from 'react-icons/hi'
import { HiOutlineUsers } from 'react-icons/hi2'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { CiCirclePlus } from 'react-icons/ci'

interface AboutSectionProps {
    overview?: string
    birthDate?: string
    status?: string
    position?: string
    location?: string
    joinedDate?: string
    email?: string
    interests?: Array<{
        name: string
        followers: string | number
        image?: string
        title?: string
    }>
}

const AboutSection: React.FC<AboutSectionProps> = () => {
    const interestsData = [
        {
            name: 'Oracle',
            followers: '7,546,224',
            image: 'https://example.com/oracle.png',
        },
        {
            name: 'Apple',
            followers: '102B',
            image: 'https://example.com/apple.png',
        },
        {
            name: 'Elon Musk',
            followers: '41B',
            title: 'CEO and Product',
            image: 'https://example.com/elon.png',
        },
        {
            name: 'The X Factor',
            followers: '9,654',
            image: 'https://example.com/xfactor.png',
        },
        {
            name: 'Getbootstrap',
            followers: '8,457,224',
            image: 'https://example.com/bootstrap.png',
        },
    ]
    const profileData = {
        overview:
            'He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed. Moderate do subjects to distance.',
        birthDate: 'October 20, 1990',
        status: 'Single',
        position: 'Lead Developer',
        location: 'New Hampshire',
        joinedDate: 'Nov 26, 2019',
        email: 'abc@xyz.com',
    }

    const InfoBox = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode
        label: string
        value: string
    }) => {
        return (
            <div className="flex flex-row gap-4 border h-12 align-center px-4 py-3 rounded-lg ">
                {icon}
                <h3 className="font-medium mb-3">{label}</h3>
                <p className="text-gray-600">{value}</p>
            </div>
        )
    }

    const CreateInfoBox = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode
        label: string
        value: string
    }) => {
        return (
            <div className="flex flex-row gap-4 border-dashed border-2 h-12 align-center px-4 py-3 rounded-lg">
                {icon}
                <h3 className="font-medium mb-3">{label}</h3>
                <p className="text-gray-600">{value}</p>
            </div>
        )
    }
    return (
        <div className="p-4 bg-white rounded-md">
            {/* Profile Info Section */}
            <div>
                <h2 className="text-xl font-semibold mb-6">Profile Info</h2>

                {/* Overview */}
                <div className="mb-8">
                    <h3 className="font-medium mb-3">Overview</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {profileData.overview}
                    </p>
                </div>

                {/* Personal Information */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                    <InfoBox
                        icon={<LiaBirthdayCakeSolid className="text-xl" />}
                        label="Birth Date"
                        value={profileData.birthDate}
                    />
                    <InfoBox
                        icon={<HiOutlineUsers className="text-xl" />}
                        label="Status"
                        value={profileData.status}
                    />
                    <InfoBox
                        icon={<HiOutlineBriefcase className="text-xl" />}
                        label="Position"
                        value={profileData.position}
                    />
                    <InfoBox
                        icon={<HiOutlineLocationMarker className="text-xl" />}
                        label="Location"
                        value={profileData.location}
                    />
                    <InfoBox
                        icon={<HiOutlineCalendar className="text-xl" />}
                        label="Joined Date"
                        value={profileData.joinedDate}
                    />
                    <InfoBox
                        icon={<HiOutlineMail className="text-xl" />}
                        label="Email"
                        value={profileData.email}
                    />
                    <CreateInfoBox
                        icon={<CiCirclePlus className="text-xl" />}
                        label="Email"
                        value={profileData.email}
                    />
                </div>

                <div className="space-y-6">
                    {interestsData.map((interest, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gray-100 rounded-xl"></div>
                            <div className="flex-1">
                                <h3 className="font-medium mb-0.5">
                                    {interest.name}
                                </h3>
                                <p className="text-gray-500">
                                    {interest.title && `${interest.title} • `}
                                    {interest.followers} followers
                                </p>
                            </div>
                            <BsThreeDots className="text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutSection
