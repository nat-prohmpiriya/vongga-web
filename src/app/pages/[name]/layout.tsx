import ContainerPage from '@/components/common/ContainerPage'
import HeroBanner from '@/app/pages/[name]/components/HeroBanner'
import userService from '@/services/user.service';

export default async function Layout({ children, params }: { children: React.ReactNode; params: { name: string } }) {

	const username = await params.name
	const user = await userService.getUserInfoByUsername(username)
	if (!user) {
		return (
			<div>
				<h1>404</h1>
			</div>
		)
	}

	return (
		<ContainerPage>
			<HeroBanner user={user} />
			{children}
		</ContainerPage>
	)
}
