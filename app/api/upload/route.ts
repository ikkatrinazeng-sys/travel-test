import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { auth } from '@/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: '没有收到文件' }, { status: 400 })
    }

    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')

    // 只允许图片或视频
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: '只允许上传图片或视频文件' }, { status: 400 })
    }

    // 图片上限 10MB，视频上限 500MB
    const maxSize = isVideo ? 500 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: isVideo ? '视频大小不能超过 500MB' : '图片大小不能超过 10MB' },
        { status: 400 }
      )
    }

    // 生成唯一文件名：时间戳 + 原始文件名
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `uploads/${timestamp}_${originalName}`

    // 上传到 Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    })

    // 返回 Blob 公开访问 URL
    return NextResponse.json({ path: blob.url })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: '上传失败' }, { status: 500 })
  }
}
