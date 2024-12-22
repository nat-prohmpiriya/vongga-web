

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBar from "./components/HeaderBar";
import { headers } from 'next/headers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SabaiYoo",
  description: "Social Network Platform",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  const currentPath = (await headers()).get('referer') || '/'; 
  const isHiddenPage = currentPath.includes('/auth') || currentPath === '/';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50">
          { !isHiddenPage && <HeaderBar />}
        </div>
        <div className={ !isHiddenPage ? 'pt-16' : ''}>
          {children}
        </div>
      </body>
    </html>
  );
}
