

export default async function Layout({ children, params }: { children: React.ReactNode; params: { name: string } }) {
	return (
		<div className="bg-gray-100 px-4 min-h-screen">
			{children}
		</div>
	)
}
