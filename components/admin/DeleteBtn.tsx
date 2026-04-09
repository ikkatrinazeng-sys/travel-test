'use client'

interface DeleteBtnProps {
  onClick: () => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'xs'
}

export default function DeleteBtn({ onClick, label, disabled, size = 'sm' }: DeleteBtnProps) {
  const isIcon = !label
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="transition-colors disabled:opacity-50"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isIcon ? 0 : '0.3rem',
        background: 'rgba(239,68,68,0.08)',
        color: 'rgba(239,100,100,0.75)',
        borderRadius: isIcon ? 8 : 8,
        padding: isIcon
          ? size === 'xs' ? '4px 7px' : '6px 10px'
          : size === 'xs' ? '3px 10px' : '5px 12px',
        fontSize: size === 'xs' ? 11 : 13,
        fontWeight: 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.15)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(239,100,100,1)'
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'
        ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(239,100,100,0.75)'
      }}
    >
      <span style={{ fontSize: size === 'xs' ? 10 : 12 }}>✕</span>
      {label && <span>{label}</span>}
    </button>
  )
}
