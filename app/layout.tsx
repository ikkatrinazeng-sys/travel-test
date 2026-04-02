import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Wanderlog · 旅行记录',
  description: '记录19座城市的光影与故事',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white">
        {children}
        <Footer />
      </body>
    </html>
  )
}
