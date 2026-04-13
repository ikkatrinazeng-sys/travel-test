export default function AdminFooter() {
  return (
    <footer style={{ background: '#0c0d0a', borderTop: '0.5px solid rgba(255,255,255,0.07)', padding: '1.5rem 2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.05em' }}>
          © 2026 Vibe Syntax · Admin
        </span>
        <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '11px', color: 'rgba(200,185,122,0.3)', letterSpacing: '0.08em' }}>
          19 cities · vol. I
        </span>
      </div>
    </footer>
  )
}
