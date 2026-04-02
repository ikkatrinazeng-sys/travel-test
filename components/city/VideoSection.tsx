import { Video } from '@/types'

export default function VideoSection({ videos }: { videos: Video[] }) {
  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 border border-dashed border-neutral-200 rounded-sm">
        <p className="text-neutral-400 text-sm">暂无视频内容</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {videos.map((video, i) => (
        <div key={i} className="group">
          <div className="relative w-full aspect-video rounded-sm overflow-hidden mb-3 bg-neutral-900">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm font-light text-neutral-700">{video.title}</p>
        </div>
      ))}
    </div>
  )
}
