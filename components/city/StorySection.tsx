import { Story } from '@/types'

export default function StorySection({ story, cityColor }: { story: Story; cityColor: string }) {
  return (
    <article className="max-w-2xl mx-auto">
      {/* 封面色块 */}
      <div
        className="w-full h-64 rounded-sm mb-8"
        style={{ backgroundColor: cityColor, filter: 'brightness(0.75)' }}
      />

      {/* 标题区 */}
      <div className="mb-8">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-3">{story.date}</p>
        <h2 className="text-2xl md:text-3xl font-light text-neutral-800 leading-snug">
          {story.title}
        </h2>
      </div>

      {/* 正文 */}
      <div className="prose prose-neutral prose-lg max-w-none">
        {story.content.split('\n').map((para, i) =>
          para.trim() ? (
            <p
              key={i}
              className="text-neutral-600 leading-[1.9] text-base font-light mb-5"
            >
              {para}
            </p>
          ) : null
        )}
      </div>
    </article>
  )
}
