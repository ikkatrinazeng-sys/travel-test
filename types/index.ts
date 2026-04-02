export type Region = 'europe' | 'east-asia' | 'southeast-asia'

export type ContentType = 'photo' | 'video' | 'guide' | 'story'

export interface Photo {
  src: string
  caption?: string
}

export interface Video {
  title: string
  embedUrl: string
  thumbnail: string
}

export interface Guide {
  stay: string[]
  eat: string[]
  transport: string
  tips: string[]
}

export interface Story {
  title: string
  date: string
  content: string
  coverImage: string
}

export interface City {
  slug: string
  name: string
  country: string
  region: Region
  year: number
  coverColor: string
  summary: string
  heroQuote?: string
  photos: Photo[]
  videos: Video[]
  guide: Guide
  story: Story
}

export interface Post {
  id: string
  title: string
  excerpt: string
  coverColor: string
  type: ContentType
  citySlug: string
  cityName: string
  date: string
}
