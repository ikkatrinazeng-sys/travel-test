'use client'

import { useEffect } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  danger = true,
}: ConfirmDialogProps) {
  // ESC 关闭
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onCancel}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgb(18,18,19)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '2rem 2rem 1.5rem',
          width: '100%',
          maxWidth: 400,
          margin: '0 1.5rem',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* 顶部金色光边 */}
        <div style={{
          position: 'relative',
          marginBottom: '1.25rem',
        }}>
          <div style={{
            position: 'absolute', top: -32, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(to right, transparent, rgba(200,185,122,0.35), transparent)',
          }} />
          {title && (
            <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>
              {title}
            </div>
          )}
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
            {message}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.5rem' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 18px',
              borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 18px',
              borderRadius: 9,
              border: `1px solid ${danger ? 'rgba(239,68,68,0.35)' : 'rgba(200,185,122,0.35)'}`,
              background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(200,185,122,0.1)',
              color: danger ? 'rgba(252,165,165,0.9)' : '#c8b97a',
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = danger ? 'rgba(239,68,68,0.18)' : 'rgba(200,185,122,0.18)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = danger ? 'rgba(239,68,68,0.1)' : 'rgba(200,185,122,0.1)'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
