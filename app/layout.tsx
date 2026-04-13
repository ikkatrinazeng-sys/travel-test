import type { Metadata } from 'next'
import './globals.css'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar'
import ScrollToTop from '@/components/layout/ScrollToTop'

export const metadata: Metadata = {
  title: 'Vibe Syntax · 旅行记录',
  description: '记录19座城市的光影与故事',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body className="min-h-screen" style={{ background: '#0e1c10' }}>
        <ScrollToTop />
        <ConditionalNavbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  )
}
