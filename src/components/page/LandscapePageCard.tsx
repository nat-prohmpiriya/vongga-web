'use client'

import { Col, Row, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import friendService from '@/services/friend.service';

export interface UserCardProps {
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
    page: UserCardProps
}

const PageCard = ({ page }: PageCardProps) => {
    const router = useRouter();

    const handleAddFriend = () => {
        if (!page) return;
        const result = friendService.sendFriendRequest(page?.id);
        console.log(result);
    };
    return (
        <Row>
            <Col span={8} >
                <div className='flex justify-center items-center h-[120px] border-b border-gray-300 ' onClick={() => router.push(`/pages/${page?.username}`)}>
                    {
                        page?.photoProfile
                            ? <Avatar size={82} src={page?.photoProfile} />
                            : <Avatar size={82} icon={<UserOutlined />} />
                    }
                </div>
            </Col>
            <Col span={16} className=''>
                <div className='flex flex-col space-y-2 h-[120px] border-b border-gray-300 p-2'>
                    <div className="">
                        <h1 className='text-lg font-semibold'>{page?.displayName || page?.username || page?.id}</h1>
                        <p className='text-sm text-gray-500'>Friends: {page?.friendsCount}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Button block type='primary' color='primary' variant='solid' onClick={handleAddFriend}>Add Friend</Button>
                        <Button block type='primary' color='default' variant='solid'>Remove</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default PageCard