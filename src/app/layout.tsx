import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import HeaderBar from '../components/common/HeaderBar'
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'SabaiYoo',
	description: 'Social Network Platform',
}

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AntdRegistry>
					<HeaderBar />
					{children}
				</AntdRegistry>

			</body>
		</html>
	)
}
