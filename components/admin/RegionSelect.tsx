'use client'

import { useState, useRef, useEffect } from 'react'

const REGIONS = [
  { value: 'europe', label: '欧洲' },
  { value: 'east-asia', label: '东亚' },
  { value: 'southeast-asia', label: '东南亚' },
]

export default function RegionSelect({
  value,
  onChange,
  name = 'region',
}: {
  value: string
  onChange?: (v: string) => void
  name?: string
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(value || '')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelected(value || '')
  }, [value])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectedLabel = REGIONS.find(r => r.value === selected)?.label || ''

  const handleSelect = (v: string) => {
    setSelected(v)
    onChange?.(v)
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* 隐藏 input 提交 form */}
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'rgb(29,29,30)',
          border: `1px solid ${open ? 'rgba(200,185,122,0.6)' : 'rgb(43,43,45)'}`,
          borderRadius: 8,
          padding: '8px 12px',
          color: 'rgba(255,255,255,0.85)',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ color: selectedLabel ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)' }}>
          {selectedLabel || '请选择地区'}
        </span>
        <span style={{
          color: 'rgba(255,255,255,0.3)',
          fontSize: 10,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 200,
          background: 'rgb(22,22,23)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {REGIONS.map(r => (
            <button
              key={r.value}
              type="button"
              onClick={() => handleSelect(r.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                textAlign: 'left',
                background: r.value === selected ? 'rgba(200,185,122,0.1)' : 'transparent',
                color: r.value === selected ? '#c8b97a' : 'rgba(255,255,255,0.75)',
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                if (r.value !== selected)
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={e => {
                if (r.value !== selected)
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <span style={{ fontSize: 10, color: '#c8b97a', opacity: r.value === selected ? 1 : 0 }}>✓</span>
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
