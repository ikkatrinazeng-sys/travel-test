'use client'

import { useState, CSSProperties, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const INPUT_OVERRIDE = `
  .lv-inp { transition: border-color .2s, background .2s; }
  .lv-inp:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: rgba(200,185,122,0.85) !important;
  }
  .lv-inp:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border-color: rgba(200,185,122,0.85) !important;
  }
  .lv-inp:-webkit-autofill,
  .lv-inp:-webkit-autofill:hover,
  .lv-inp:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px rgba(60,50,20,0.85) inset !important;
    -webkit-text-fill-color: rgba(255,255,255,0.9) !important;
    caret-color: rgba(255,255,255,0.9) !important;
    border-color: rgba(200,185,122,0.85) !important;
  }
`

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { username, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('用户名或密码错误')
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  const inputStyle = (focused: boolean): CSSProperties => ({
    width: '100%',
    background: focused ? 'rgba(200,185,122,0.14)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused ? 'rgba(200,185,122,0.85)' : 'rgba(255,255,255,0.09)'}`,
    color: 'rgba(255,255,255,0.9)',
    borderRadius: 11,
    padding: '11px 14px',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  })

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <style dangerouslySetInnerHTML={{ __html: INPUT_OVERRIDE }} />

      {/* 背景图 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/paris.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.4) saturate(0.75)',
        transform: 'scale(1.08)',
      }} />
      {/* 深色叠加层 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(8,15,10,0.82) 0%, rgba(12,24,14,0.6) 50%, rgba(8,15,10,0.82) 100%)',
      }} />

      {/* 毛玻璃卡片 */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 380, margin: '0 1.5rem',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 22, padding: '2.75rem 2.5rem 2.5rem',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(28px)',
      }}>
        {/* 关闭按钮 */}
        <button
          onClick={() => router.push('/')}
          style={{
            position: 'absolute', top: 14, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', fontSize: 18, lineHeight: 1,
            padding: '2px 6px', borderRadius: 6,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          aria-label="关闭"
        >
          ✕
        </button>

        {/* 顶部金色光边 */}
        <div style={{
          position: 'absolute', top: 0, left: '12%', right: '12%', height: 1,
          background: 'linear-gradient(to right, transparent, rgba(200,185,122,0.5), transparent)',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 44, height: 44, margin: '0 auto 0.9rem', borderRadius: '50%',
            border: '1px solid rgba(200,185,122,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(200,185,122,0.08)', fontSize: 18, color: '#c8b97a',
          }}>✦</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 21, fontWeight: 600, color: 'rgba(255,255,255,0.92)' }}>
            旅行站后台
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 5 }}>
            Admin Access
          </div>
        </div>

        <div style={{ height: 0.5, background: 'rgba(255,255,255,0.08)', margin: '1.75rem 0' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 8 }}>
              用户名
            </label>
            <input
              type="text"
              className="lv-inp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedField('u')}
              onBlur={() => setFocusedField(null)}
              placeholder="Username"
              required
              autoFocus
              style={inputStyle(focusedField === 'u')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 8 }}>
              密码
            </label>
            <input
              type="password"
              className="lv-inp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('p')}
              onBlur={() => setFocusedField(null)}
              placeholder="Password"
              required
              style={inputStyle(focusedField === 'p')}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
              color: 'rgba(252,165,165,0.8)', borderRadius: 9, padding: '10px 14px', fontSize: 13,
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', marginTop: '0.5rem', padding: '12px', borderRadius: 11,
              background: 'rgba(200,185,122,0.14)', border: '1px solid rgba(200,185,122,0.32)',
              color: '#c8b97a', fontSize: 12, fontWeight: 500, letterSpacing: '0.14em',
              textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.4 : 1,
            }}
          >
            {loading ? '验证中…' : '登  录'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#080f0a', zIndex: 9999 }} />}>
      <LoginForm />
    </Suspense>
  )
}
