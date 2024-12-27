"use client"

import { Card, Button, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import followService from '@/services/follow.service';
import friendService from '@/services/friend.service';

const { Text } = Typography;

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

export const UserCard: React.FC<UserCardProps> = (props: UserCardProps) => {
    const router = useRouter();

    const handleAddFriend = () => {
        const result = friendService.sendFriendRequest(props.id);
        console.log(result);
    };

    const handleFollow = () => {
        const result = followService.followUser(props.id);
        console.log(result);
    };

    const goToProfilePage = () => {
        router.push(`/pages/${props.username}`);
    };
    return (
        <Card
            className='w-[200px] h-[275px] shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer relative'
            cover={
                <div className='relative bg-black ' style={{ height: '125px' }}>
                    {props.photoCover
                        ? <img alt="example" src={props.photoCover} className="w-full h-[125px] object-cover rounded-t-lg" onClick={goToProfilePage} />
                        : <div className='h-[125px] bg-black rounded-t-lg' />
                    }
                    {props.photoProfile
                        ? <Avatar size={64} src={props.photoProfile} className='absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-transform duration-300' onClick={goToProfilePage} />
                        : <Avatar size={64} icon={<UserOutlined />} className='absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={goToProfilePage} />
                    }
                </div>

            }
        >
            <Space direction="vertical" className=' -ml-4 h-[115px] flex items-center justify-end'>
                <Text strong>{props.displayName || props.username}</Text>
                <Button
                    type="primary"
                    icon={<UserOutlined />}
                    style={{ width: '180px' }}
                    onClick={handleAddFriend}
                >
                    Add friend
                </Button>
                <Button
                    type="primary"
                    icon={<UserOutlined />}
                    style={{ width: '180px' }}
                    onClick={handleFollow}
                >
                    follow
                </Button>
            </Space>
        </Card>
    );
};