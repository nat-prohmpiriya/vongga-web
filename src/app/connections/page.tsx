"use client"

import ContainerPage from '@/components/common/ContainerPage'
import { Input } from 'antd'
import { UserCard } from '@/components/page/UserCardList/UserCard'
import { useState } from 'react'
import { UserList } from '@/services/user.service'
import userService from '@/services/user.service'
import { useEffect } from 'react'

export default function ConnectionsPage() {
    const [users, setUsers] = useState<UserList[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(10)

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
        <ContainerPage>
            <div className="min-h-[calc(100vh-70px)] grid grid-cols-5 gap-4 pt-4">
                <div className='col-span-1 bg-white rounded-lg'>
                </div>
                <div className='col-span-4 bg-white p-4 rounded-lg'>
                    <Input.Search size='large' placeholder="Search People" allowClear enterButton onSearch={handlerSearch} />
                    <div className='flex flex-wrap gap-4 mt-4'>
                        {users.map((user) => (
                            <UserCard key={user.id} {...user} />
                        ))}
                    </div>
                </div>
            </div>
        </ContainerPage>
    )
}
