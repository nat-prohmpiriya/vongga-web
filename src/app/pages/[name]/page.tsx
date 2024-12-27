"use client"

import HeroBanner from '@/components/page/HeroBanner'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@/types/user'
import userService from '@/services/user.service'
import PostSection from '@/components/page/PostSection'
import ContainerPage from '@/components/common/ContainerPage'

const DetailPage = () => {

    const [userProfile, setUserProfile] = useState<User | null>(null)
    const { name: username } = useParams()

    useEffect(() => {
        (async () => {
            const user = await userService.getUserInfoByUsername(String(username))
            setUserProfile(user)
        })()
    }, [])

    if (!userProfile) {
        return <div>Loading...</div>
    }

    return (
        <ContainerPage>
            <HeroBanner user={userProfile} />
            <PostSection userProfileId={userProfile?.id} />
        </ContainerPage>
    )
}

export default DetailPage
