'use client'

import { useChat } from '@/providers/ChatProvider'
import { Input, Row, Button, Col, Avatar } from 'antd'
import { useState, useEffect } from 'react'
import userService, { UserList } from '@/services/user.service'
import { UserOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store/auth.store'
import chatService, { ChatMessage, ChatRoom } from '@/services/chat.service'

export default function ChatRoomPage() {
    const { sendMessage, sendTypingStatus } = useChat()
    const [listFriends, setListFriends] = useState<UserList[]>([])
    const [roomId, setRoomId] = useState('')
    const [talkingWith, setTalkingWith] = useState<UserList | null>(null)
    const { user } = useAuthStore()
    const [rooms, setRooms] = useState<ChatRoom[] | null>(null)
    const [messages, setMessages] = useState('')

    useEffect(() => {
        fetchListFriends()
        fetchRoom()
    }, [])

    const handleSendMessage = () => {
        if (!roomId) return console.warn('roomId not found')
        sendMessage(roomId, messages)
        setMessages('')
    }

    const fetchRoom = async () => {
        const rooms = await chatService.getRooms()
        setRooms(rooms)
    }

    const fetchListFriends = async () => {
        try {
            const response = await userService.getUsers({
                page: 1,
                pageSize: 10,
                sortBy: 'createdAt',
                sortDir: 'desc',
                search: ''
            })
            if (!response) return
            setListFriends(response.users)
        } catch (error) {
            console.error('Error fetching list of friends:', error)
        }
    }

    const handleTyping = () => {
        if (!roomId) return
        sendTypingStatus(roomId, true)
    }

    const createPrivateChat = async () => {
        try {
            if (!user?.id || !talkingWith) return console.warn('user not found', { user, talkingWith })
            const response = await chatService.createPrivateChat({ userId1: user?.id, userId2: talkingWith.id })
            if (!response) return
            console.log('createPrivateChat response', response)
            fetchRoom()
        } catch (error) {
            console.error('Error creating private chat:', error)
        }
    }



    return (
        <div className='bg-gray-100 min-h-screen p-4'>
            <Row justify='center' gutter={[16, 16]} className='min-h-screen'>
                <Col span={8}>
                    <div className='overflow-y-scroll border rounded-lg p-4 mb-4 bg-white'>
                        {listFriends.map((friend) => (
                            user?.id !== friend.id ? (
                                <div
                                    key={friend.id}
                                    className='flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-100 cursor-pointer'
                                    onClick={() => setTalkingWith(friend)}
                                >
                                    {friend.photoProfile ? (
                                        <Avatar size={64} src={friend.photoProfile} alt='Avatar' className='w-10 h-10 rounded-full' />
                                    ) : (
                                        <Avatar size={64} icon={<UserOutlined />} />
                                    )}
                                    <span>{friend.username}</span>
                                    <Button type='primary' size='large' onClick={createPrivateChat}>
                                        Create Private Chat
                                    </Button>
                                </div>
                            ) : null
                        ))}
                    </div>
                    <div>
                        <p>Room</p>
                        {rooms?.map((room) => {
                            const member = room.users.find((member) => member.id !== user?.id)
                            return (
                                <div key={room.id} className='border-2 border-gray-300 rounded-lg p-4 mb-4 bg-white cursor-pointer' onClick={() => setRoomId(room.id)}>
                                    <div>{room.id}</div>
                                    <div className="flex ">
                                        <Avatar size={64} src={member?.photoProfile} alt='Avatar' className='w-10 h-10 rounded-full border-2 border-gray-300 shadow-lg' />
                                        <span>{member?.username}</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </Col>
                <Col span={16}>
                    <div className='h-[400px] overflow-y-scroll border rounded-lg p-4 mb-4 bg-white'>
                        <div className='flex'>
                            <p>Room {roomId}</p> <Button onClick={() => setRoomId('')} >Delete</Button>
                        </div>
                        <div >
                            {talkingWith ? (
                                <div>
                                    <Avatar size={64} src={talkingWith.photoProfile} alt='Avatar' className='w-10 h-10 rounded-full' />
                                    <span>{talkingWith.username}</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <Input.TextArea onChange={(e) => setMessages(e.target.value)} onKeyDown={handleTyping} value={messages} />
                    <Button type='primary' block size='large' className='mt-4' onClick={() => handleSendMessage()}>
                        send message
                    </Button>
                </Col>
            </Row>
        </div>
    )
}