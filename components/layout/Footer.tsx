import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(11, 23, 16, 0.92)', borderTop: '0.5px solid rgba(255,255,255,0.07)', padding: '3rem 2rem 2rem' }}>
      <style>{`
        .footer-link { font-family: system-ui, sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: rgba(255,255,255,0.9); }
        .footer-admin-btn { font-size: 13px; color: rgba(255,255,255,0.12); text-decoration: none; transition: color 0.2s; }
        .footer-admin-btn:hover { color: rgba(255,255,255,0.5); }
      `}</style>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Brand */}
          <div>
            <Link href="/" className="footer-link" style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
              Vibe Syntax
            </Link>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem' }}>探索</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <Link href="/#all-cities" className="footer-link">所有城市</Link>
                <Link href="/photography" className="footer-link">摄影</Link>
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem' }}>地区</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Europe', 'East Asia', 'Southeast Asia'].map(r => (
                  <span key={r} style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', marginBottom: '1.5rem' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
            © 2024 Vibe Syntax · All rights reserved
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: 'rgba(200,185,122,0.4)', letterSpacing: '0.08em' }}>
              19 cities · 6 countries · vol. I
            </span>
            <Link
              href="/admin/login"
              className="footer-admin-btn"
              title="管理后台"
            >
              ⚙
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
