'use client'

import { useState, useTransition } from 'react'
import { deleteCity } from '@/lib/actions/city'
import ConfirmDialog from './ConfirmDialog'

export function DeleteCityButton({ cityId, cityName }: { cityId: number; cityName: string }) {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    startTransition(async () => {
      await deleteCity(cityId)
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={pending}
        title="删除"
        className="w-8 h-8 flex items-center justify-center rounded-md transition-colors disabled:opacity-30 text-zinc-600 hover:text-red-400 hover:bg-red-400/8"
      >
        {pending ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        )}
      </button>

      <ConfirmDialog
        open={open}
        message={`确定要删除「${cityName}」吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        danger={true}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
