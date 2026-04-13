'use client'
import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 禁用浏览器默认滚动恢复
    window.history.scrollRestoration = 'manual'

    // 如果 URL 带有 hash（如 /#all-cities），静默清除并强制回到顶部
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    // 强制滚到顶部（延迟一帧，确保 DOM 渲染完成后执行）
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
  }, [])

  return null
}
