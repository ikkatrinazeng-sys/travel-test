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
      <head>
        {/* 在 JS hydration 之前同步禁用滚动恢复，防止刷新时定位到中间 */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            // 禁用浏览器滚动恢复
            if (window.history.scrollRestoration) {
              window.history.scrollRestoration = 'manual';
            }
            // 如果 URL 有 hash，同步清除（阻止锚点跳转）
            if (window.location.hash) {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
            // 同步滚动到顶部（在任何渲染之前）
            window.scrollTo(0, 0);
          })();
        `}} />
      </head>
      <body className="min-h-screen" style={{ background: '#0e1c10' }}>
        <ScrollToTop />
        <ConditionalNavbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  )
}
