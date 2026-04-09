import AdminNav from '@/components/admin/AdminNav'

// 路由保护由 middleware.ts 统一处理，layout 只负责 UI 框架
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: '#0c0d0a' }}>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-6 py-10 flex-1 w-full">
        {children}
      </main>
    </div>
  )
}
