'use client'

import { FaRegCommentDots } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { BsCart3 } from 'react-icons/bs'
import NotiBtn from './NotiButton'
import MenuBtn from './MenuBtn'
import { useAuthStore } from '@/store/auth.store'
import { useState, useEffect } from 'react'
import AccountBtn from './AccountBtn'
import { RiRobot3Line } from "react-icons/ri";
import { Row, Col, Flex, Button } from 'antd'
import ChatButton from './ChatButton'

const HeaderBar = () => {
	const router = useRouter()
	const { user } = useAuthStore()
	const [isHide, setIsHide] = useState(false)
	const parthname = usePathname()

	useEffect(() => {
		if (parthname.includes('/auth') || parthname === '/') {
			setIsHide(true)
		} else {
			setIsHide(false)
		}
	}, [parthname])

	const goToFeedPage = () => {
		router.push('/feed')
	}

	if (isHide) {
		return null
	}

	return (
		<Row justify='space-between' align={'middle'} className="bg-white h-[64px] sticky top-0 z-50">
			<Col xs={0} sm={12} md={8} className='flex items-center'>
				<Flex justify="start" className='px-4' align="center" gap={16}>
					<h1 className="text-2xl font-bold cursor-pointer" onClick={goToFeedPage}>Vongga</h1>

				</Flex>
			</Col>
			<Col xs={0} sm={0} md={8} className=''></Col>
			<Col xs={0} sm={12} md={8}>
				<Flex justify="end" className='px-4' align="center" gap={16}>
					<MenuBtn />
					<NotiBtn />
					<ChatButton />
					<AccountBtn />
				</Flex>
			</Col>
			<Col xs={4} sm={0} md={0} className='flex items-center'>
				<Flex justify="start" className='px-4' align="center" gap={16}>
					<h1 className="text-2xl font-bold cursor-pointer" onClick={goToFeedPage}>Vongga</h1>
				</Flex>
			</Col>
			<Col xs={20} sm={0} md={0} className='flex items-center'>
				<Flex justify="end" className='px-4' align="center" gap={10}>
					<MenuBtn />
					<NotiBtn />
					<ChatButton />
					<AccountBtn />
				</Flex>
			</Col>
		</Row>
	)
}

export default HeaderBar
