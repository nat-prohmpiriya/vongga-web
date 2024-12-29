'use client'

import { Col, Row, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import friendService from '@/services/friend.service';

export interface Page {
    id: string;
    username: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    photoProfile: string;
    photoCover: string;
    followersCount: number;
    followingCount: number;
    friendsCount: number;
}

interface PageCardProps {
    page: Page
}

const PortraitPageCard = ({ page }: PageCardProps) => {
    const router = useRouter();

    const handleAddFriend = () => {
        if (!page) return;
        const result = friendService.sendFriendRequest(page?.id);
    };
    return (
        <Row className='w-[225px] bg-white rounded-lg h-[300px] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg'>
            <Col span={24} >
                <div className='flex justify-center items-center h-[150px]' onClick={() => router.push(`/pages/${page?.username}`)}>
                    {
                        page?.photoProfile
                            ? <img src={page?.photoProfile} alt="Profile" className="w-full h-full object-cover rounded-t-lg" />
                            : <Avatar size={82} icon={<UserOutlined />} />
                    }
                </div>
                <div className=' flex flex-col space-y-2 p-2'>
                    <div className="">
                        <h1 className='text-lg font-semibold'>{page?.displayName || page?.username || page?.id}</h1>
                        <p className='text-sm text-gray-500'>followers: {page?.followersCount}</p>
                    </div>
                    <Button block color='default' variant='solid' onClick={handleAddFriend}>Add Friend</Button>
                    <Button block type='primary' color='default' variant='filled'>Remove</Button>
                </div>
            </Col>
        </Row>
    )
}

export default PortraitPageCard