"use client"

import HeroBanner from '@/components/page/HeroBanner/HeroBanner2'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@/types/user'
import userService from '@/services/user.service'
import PostSection from '@/components/page/PostSection'
import ContainerPage from '@/components/common/ContainerPage'
import ConnectionSection from '@/components/page/ConnectionSection'
import GallerySection from '@/components/page/GallerySection'
import VideosSection from '@/components/page/VideosSection'
import { useSearchParams } from 'next/navigation'
import AboutSection from '@/components/page/AboutSection'
import postService from '@/services/post.service'
import { Post } from '@/types/post'

const DetailPage = () => {

    const [profilePage, setProfilePage] = useState<User | null>(null)
    const { name: username } = useParams()
    const [loading, setLoading] = useState(false)
    const [postPhotos, setPostPhotos] = useState<Post[] | null>(null)
    const [postVideos, setPostVideos] = useState<string[]>([])
    const [currentSection, setCurrentSection] = useState('')
    const searchParams = useSearchParams()
    const section = searchParams.get('section')

    useEffect(() => {
        fetchProfilePage()
        fetchPostVideos()
    }, [])

    useEffect(() => {
        if (section) {
            setCurrentSection(section)
        }
    }, [section])

    const fetchProfilePage = async () => {
        const user = await userService.getUserInfoByUsername(String(username))
        setProfilePage(user)
    }



    const fetchPostVideos = async () => {
        if (!profilePage?.id) return
        const postVideos = await postService.getPostVideos(profilePage?.id)
        setPostVideos(postVideos)
    }

    if (!profilePage) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <HeroBanner profilePage={profilePage} />
            {!section && <PostSection profilePageId={profilePage?.id} />}
            {section === 'about' && <AboutSection />}
            {section === 'friends' && <ConnectionSection />}
            {section === 'gallery' && <GallerySection profilePageId={profilePage?.id} />}
            {/* {section === 'videos' && <VideosSection />} */}
        </div>
    )
}

export default DetailPage
