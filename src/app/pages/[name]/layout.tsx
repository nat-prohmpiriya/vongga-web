import userService from '@/services/user.service'
import { User } from '@/types/user'
import ConteinerPage from '@/components/common/ContainerPage'
import HeroBanner from '@/app/pages/components/HeroBanner'

interface LayoutProps {
	children: React.ReactNode
	params: {
		name: string
	}
}

export default async function Layout({ children, params }: LayoutProps) {
	const { name } = await params
	const userInfo = await userService.getUserInfoByUsername(name)

	if (!userInfo) {
		return (
			<ConteinerPage>
				<h3>User not found</h3>
			</ConteinerPage>
		)
	}

	return (
		<ConteinerPage>
			<HeroBanner user={userInfo} />
			{children}
		</ConteinerPage>
	)
}
