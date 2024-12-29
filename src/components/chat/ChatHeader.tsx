import { UserList } from '@/services/user.service'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge } from 'antd'

interface ChatHeaderProps {
    talkingWith: UserList | null
}

export const ChatHeader = ({ talkingWith }: ChatHeaderProps) => {
    if (!talkingWith) {
        return (
            <div className='p-4 border-b'>
                <div className='text-center text-gray-500'>
                    Select a chat or start a new conversation
                </div>
            </div>
        )
    }

    return (
        <div className='p-4 border-b'>
            <div className='flex items-center gap-3'>
                <Badge dot status="success" offset={[-2, 32]}>
                    {talkingWith.photoProfile ? (
                        <Avatar src={talkingWith.photoProfile} />
                    ) : (
                        <Avatar icon={<UserOutlined />} />
                    )}
                </Badge>
                <div>
                    <div className='font-medium'>{talkingWith.username}</div>
                    <div className='text-xs text-gray-500'>Online</div>
                </div>
            </div>
        </div>
    )
}
