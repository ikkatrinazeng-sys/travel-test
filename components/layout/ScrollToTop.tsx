'use client'
import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    // 禁用浏览器默认滚动恢复，确保刷新时始终从顶部开始
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }
  }, [])
  return null
}
