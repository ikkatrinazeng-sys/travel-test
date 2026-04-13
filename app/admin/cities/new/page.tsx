'use client'

import Link from 'next/link'
import { createCity } from '@/lib/actions/city'
import { useState } from 'react'
import RegionSelect from '@/components/admin/RegionSelect'

export default function NewCityPage() {
  const [region, setRegion] = useState('')

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/admin" className="hover:text-zinc-300 transition-colors">城市详情</Link>
        <span>/</span>
        <span className="text-zinc-300">新增城市</span>
      </div>

      <h1 className="text-xl font-medium text-white mb-8">新增城市</h1>

      <form action={createCity}>
        <div className="rounded-xl p-6 space-y-4 mb-6" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="城市名称" name="name" placeholder="如：巴黎" required />
            <Field label="国家" name="country" placeholder="如：法国" required />
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>地区<span className="ml-0.5" style={{ color: '#f87171' }}>*</span></label>
              <RegionSelect value={region} onChange={setRegion} />
            </div>
            <Field label="年份" name="year" type="number" placeholder="2024" required />
          </div>
          <Field label="简介" name="summary" placeholder="一句话描述这座城市" required />
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
            style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
            创建城市
          </button>
          <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            取消
          </Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, name, placeholder, required, type = 'text' }: {
  label: string; name: string; placeholder?: string; required?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}{required && <span className="ml-0.5" style={{ color: '#f87171' }}>*</span>}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="admin-input w-full text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors"
        style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }}
      />
    </div>
  )
}
