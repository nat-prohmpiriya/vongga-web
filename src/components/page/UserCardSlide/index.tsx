import React from 'react';
import { Card, Typography, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { UserCard } from './UserCard';
import { UserCardProps } from './UserCard';

const { Title } = Typography;

interface UserCardListProps {
    title?: string;
    users: UserCardProps[];
    onAddFriend?: (userId: string) => void;
}

export const UserCardList: React.FC<UserCardListProps> = ({
    title = 'People you may know',
    users,
    onAddFriend,
}) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 220; // card width + margin
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <Card>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Title level={5} style={{ margin: 0 }}>{title}</Title>
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            gap: '16px',
                            padding: '8px 0',
                            width: 'auto',
                        }}
                        ref={scrollContainerRef}
                    >
                        {users.map((user) => (
                            <UserCard key={user.id} {...user} />
                        ))}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}
                    >
                        <LeftOutlined
                            style={{
                                fontSize: '24px',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                padding: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                borderRadius: '50%',
                            }}
                            onClick={() => scroll('left')}
                        />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}
                    >
                        <RightOutlined
                            style={{
                                fontSize: '24px',
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                padding: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                borderRadius: '50%',
                            }}
                            onClick={() => scroll('right')}
                        />
                    </div>
                </div>
            </Space>
        </Card>
    );
};