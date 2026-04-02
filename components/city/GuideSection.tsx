import { Guide } from '@/types'

const sections: { key: keyof Guide; label: string; icon: string }[] = [
  { key: 'stay', label: '住宿推荐', icon: '🏨' },
  { key: 'eat', label: '餐厅推荐', icon: '🍽' },
  { key: 'transport', label: '交通说明', icon: '🚆' },
  { key: 'tips', label: '实用小贴士', icon: '💡' },
]

export default function GuideSection({ guide }: { guide: Guide }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {sections.map(({ key, label, icon }) => {
        const value = guide[key]
        const items = Array.isArray(value) ? value : [value]

        return (
          <div key={key}>
            <h3 className="text-sm tracking-widest text-neutral-500 uppercase mb-4 flex items-center gap-2">
              <span>{icon}</span>
              <span>{label}</span>
            </h3>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 font-light leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
