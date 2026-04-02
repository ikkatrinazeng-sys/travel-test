import { Post } from '@/types'

export const posts: Post[] = [
  {
    id: '1',
    title: '在京都的秋天，红叶落满金阁寺',
    excerpt: '11月的京都，每一条小路都铺着橙红色的落叶，安静得像一场梦。',
    coverColor: '#7a8a6a',
    type: 'story',
    citySlug: 'kyoto',
    cityName: '京都',
    date: '2023-11-15',
  },
  {
    id: '2',
    title: '槟城壁画骑行地图',
    excerpt: '用一天时间，骑车找遍乔治市的所有涂鸦壁画——附完整路线。',
    coverColor: '#4a8a6a',
    type: 'guide',
    citySlug: 'penang',
    cityName: '槟城',
    date: '2024-02-20',
  },
  {
    id: '3',
    title: '大阪美食地图 2023',
    excerpt: '从道顿堀到黑门市场，十二家不能错过的店。',
    coverColor: '#c0804a',
    type: 'photo',
    citySlug: 'osaka',
    cityName: '大阪',
    date: '2023-11-28',
  },
  {
    id: '4',
    title: '罗马三日行程精华版',
    excerpt: '把最重要的景点压缩进三天，给时间不多的旅人。',
    coverColor: '#9e7b5a',
    type: 'guide',
    citySlug: 'rome',
    cityName: '罗马',
    date: '2023-06-10',
  },
]
