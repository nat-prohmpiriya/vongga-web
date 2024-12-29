"use client"

import { UserCard } from '@/components/page/UserCardSlide/UserCard'
import { useState } from 'react'
import { UserList } from '@/services/user.service'
import userService from '@/services/user.service'
import { useEffect } from 'react'
import LandscapePageCard from '@/components/page/LandscapePageCard'
import { Row, Col, Input, Button } from 'antd'
import PortraitPageCard from '@/components/page/ProtraitCard'

export default function ConnectionsPage() {
    const [users, setUsers] = useState<UserList[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(50)

    const handlerSearch = async (value: string) => {
        if (value) {
            setLoading(true)
            const result = await userService.getUsers({
                page: currentPage,
                pageSize,
                sortBy: 'createdAt',
                sortDir: 'desc',
                search: value
            })
            if (result) {
                setUsers(result.users)
                setTotalPages(result.totalCount)
                setCurrentPage(result.page)
                setLoading(false)
            }
        } else {
            setLoading(true)
            const result = await userService.getUsers({
                page: currentPage,
                pageSize,
                sortBy: 'createdAt',
                sortDir: 'desc',
                search: ''
            })
            if (result) {
                setUsers(result.users)
                setTotalPages(result.totalCount)
                setCurrentPage(result.page)
                setLoading(false)
            }
        }
    }



    useEffect(() => {
        handlerSearch(search)
    }, [])

    useEffect(() => {
        handlerSearch(search)
    }, [search])

    return (
        <div>
            <Row className='bg-gray-100 min-h-screen pt-2' gutter={[16, 16]} >
                <Col xs={0} sm={0} md={8} className='bg-white'>
                </Col>
                <Col xs={24} sm={24} md={0}>
                    <div className='px-2'>
                        <Input.Search
                            size='large'
                            placeholder="Search People"
                            allowClear
                            enterButton
                            onSearch={handlerSearch}
                            className='my-1'
                        />
                    </div>
                    <Row>
                        {/* mobile */}
                        <Col xs={24} md={12} className=''>
                            <div className='flex gap-2 my-2 px-2'>
                                {/* <Button type="primary">Suggested Friend </Button> */}
                                <Button
                                    type="default"
                                    color='default'
                                    variant="filled"
                                    block
                                    className='font-semibold'
                                >
                                    <span className='front-semibold'>
                                        Friend Request
                                    </span>
                                </Button>
                                <Button
                                    type="default"
                                    color='default'
                                    variant="filled"
                                    block
                                    className='font-semibold'
                                >
                                    Your Friend
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <h3 className='text-xl font-bold px-2 mb-2'>People You May Know</h3>
                    {users.map((user) => (
                        <LandscapePageCard key={user.id} page={user} />
                    ))}
                </Col>
                <Col xs={0} sm={0} md={16}>
                    <div className='p-2 flex align-center gap-2'>
                        <Input.Search
                            size='large'
                            placeholder="Search People"
                            allowClear
                            enterButton
                            onSearch={handlerSearch}
                            className='my-1'
                        />
                        {/* <Button type="primary">Suggested Friend </Button> */}
                        <Button
                            type="default"
                            color='default'
                            variant="filled"
                            block
                            className='font-semibold mt-[4px]'
                            size='large'
                            style={{ width: '500px' }}
                        >
                            <span className='front-semibold'>
                                Friend Request
                            </span>
                        </Button>
                        <Button
                            type="default"
                            color='default'
                            variant="filled"
                            block
                            className='font-semibold mt-[4px]'
                            size='large'
                            style={{ width: '500px' }}
                        >
                            Your Friend
                        </Button>
                    </div>


                    <h3 className='text-xl font-bold px-2 mb-2'>People You May Know</h3>
                    <div className='px-2 flex flex-wrap gap-4'>
                        {users.map((user) => (
                            <PortraitPageCard key={user.id} page={user} />
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
