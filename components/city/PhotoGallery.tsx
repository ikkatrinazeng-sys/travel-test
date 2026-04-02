'use client'

import { useState } from 'react'
import { Photo } from '@/types'

export default function PhotoGallery({ photos, cityColor }: { photos: Photo[]; cityColor: string }) {
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  // 至少展示 6 个色块（如无实际图片数据则补足）
  const displayPhotos = photos.length > 0 ? photos : [
    { src: '', caption: '照片 1' },
    { src: '', caption: '照片 2' },
    { src: '', caption: '照片 3' },
    { src: '', caption: '照片 4' },
    { src: '', caption: '照片 5' },
    { src: '', caption: '照片 6' },
  ]

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {displayPhotos.map((photo, i) => (
          <button
            key={i}
            className="block w-full group cursor-pointer"
            onClick={() => setLightbox(photo)}
          >
            <div
              className="w-full rounded-sm transition-opacity group-hover:opacity-80"
              style={{
                backgroundColor: cityColor,
                height: `${180 + (i % 3) * 60}px`,
                filter: `brightness(${0.7 + (i % 4) * 0.1})`,
              }}
            />
            {photo.caption && (
              <p className="text-xs text-neutral-400 mt-1 text-left">{photo.caption}</p>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div
              className="w-full h-[70vh] rounded-sm"
              style={{ backgroundColor: cityColor }}
            />
            {lightbox.caption && (
              <p className="text-white/70 text-sm mt-4 text-center">{lightbox.caption}</p>
            )}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
