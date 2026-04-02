'use client'

import { useState } from 'react'
import { City } from '@/types'
import PhotoGallery from './PhotoGallery'
import VideoSection from './VideoSection'
import GuideSection from './GuideSection'
import StorySection from './StorySection'

type Tab = 'photo' | 'video' | 'guide' | 'story'

const tabs: { key: Tab; label: string }[] = [
  { key: 'photo', label: '摄影' },
  { key: 'video', label: '视频' },
  { key: 'guide', label: '攻略' },
  { key: 'story', label: '故事' },
]

export default function ContentTabs({ city }: { city: City }) {
  const [active, setActive] = useState<Tab>('photo')

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-16 py-12">
      {/* Tab 导航 */}
      <div className="flex gap-8 border-b border-neutral-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`pb-4 text-sm tracking-widest transition-colors relative ${
              active === tab.key
                ? 'text-neutral-900'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-neutral-900" />
            )}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      {active === 'photo' && <PhotoGallery photos={city.photos} cityColor={city.coverColor} />}
      {active === 'video' && <VideoSection videos={city.videos} />}
      {active === 'guide' && <GuideSection guide={city.guide} />}
      {active === 'story' && <StorySection story={city.story} cityColor={city.coverColor} />}
    </div>
  )
}
