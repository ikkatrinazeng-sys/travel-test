'use client'

import { useEffect, useRef } from 'react'

interface Polaroid {
  id: number
  name: string
  date: string
  tag: string
  img: string
  color: string
  x: number
  y: number
  rot: number
  spd: number
  float: string
  delay: number
  order: number
}

export default function Hero({ polaroids }: { polaroids: Polaroid[] }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const glow2Ref = useRef<HTMLDivElement>(null)
  const cringRef = useRef<HTMLDivElement>(null)
  const cdotRef = useRef<HTMLDivElement>(null)
  const threadsRef = useRef<SVGSVGElement>(null)
  const polaroidsRef = useRef<HTMLDivElement>(null)
  const s1Ref = useRef<HTMLSpanElement>(null)
  const s2Ref = useRef<HTMLSpanElement>(null)
  const s3Ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const scene = sceneRef.current
    const polaroidsEl = polaroidsRef.current
    if (!scene || !polaroidsEl) return

    const cardEls: { el: HTMLDivElement; c: Polaroid; ox: number; oy: number }[] = []

    // 入场动画变体：每张卡片从不同方向进入
    const inDirs = [
      `translateX(-120px) rotate(-12deg) scale(0.7)`,
      `translateX(120px) rotate(12deg) scale(0.7)`,
      `translateY(-100px) rotate(-8deg) scale(0.75)`,
      `translateY(100px) rotate(8deg) scale(0.75)`,
      `translate(-80px,-80px) rotate(-15deg) scale(0.7)`,
      `translate(80px,-80px) rotate(15deg) scale(0.7)`,
      `translate(-80px,80px) rotate(10deg) scale(0.7)`,
      `translate(80px,80px) rotate(-10deg) scale(0.7)`,
      `translateX(-150px) scale(0.65)`,
      `translateX(150px) scale(0.65)`,
    ]

    polaroids.forEach((c, idx) => {
      const card = document.createElement('div')
      card.className = 'hero-card'
      const fromStyle = inDirs[idx % inDirs.length]

      // 安全坐标：防止负值或极端值导致卡片飞出屏幕外
      // x 保证卡片（148px宽）不超出右侧：clamp 在 2%~85%；y clamp 在 5%~78%
      const safeX = Math.max(2, Math.min(Number(c.x) || 50, 85))
      const safeY = Math.max(5, Math.min(Number(c.y) || 50, 78))

      card.style.cssText = `
        left:${safeX}%; top:${safeY}%;
        transform:${fromStyle} rotate(${c.rot}deg);
        --r:${c.rot}deg;
        z-index:${Math.floor((c.spd || 0.02) * 1000)};
        opacity:0;
        transition: none;
      `
      card.innerHTML = `
        <div class="hero-card-pin"></div>
        <div class="hero-card-img">
          ${c.img
            ? `<img src="${c.img}" class="hero-card-photo" alt="${c.name}" />`
            : `<div class="hero-card-color" style="background:${c.color};"></div>`
          }
          <span class="hero-card-tag">${c.tag}</span>
        </div>
        <div class="hero-card-bottom">
          <span class="hero-card-city">${c.name}</span>
          <span class="hero-card-date">${c.date}</span>
        </div>
        <div class="hero-card-shine"></div>
      `
      polaroidsEl.appendChild(card)
      cardEls.push({ el: card as HTMLDivElement, c, ox: 0, oy: 0 })

      // 入场延迟（每张递增，避免叠加 c.delay 导致重复延迟）
      const entryDelay = idx * 0.12
      setTimeout(() => {
        card.style.transition = `opacity 0.6s cubic-bezier(.22,.68,0,1.2) ${entryDelay}s, transform 0.8s cubic-bezier(.22,.68,0,1.25) ${entryDelay}s`
        card.style.opacity = '1'
        card.style.transform = `rotate(${c.rot}deg)`
        // 入场完成后启动浮动（不再叠加 c.delay）
        setTimeout(() => {
          const floatNames = ['floatLis', 'floatFig', 'floatOval', 'floatWave', 'floatDrift', 'floatOrbit']
          const fi = idx % floatNames.length
          const dur = 4 + idx * 0.38
          card.style.transition = 'none'
          card.style.animation = `${floatNames[fi]} ${dur}s ease-in-out infinite`
        }, (entryDelay + 0.9) * 1000)
      }, 50)

      card.addEventListener('mouseenter', () => cringRef.current?.classList.add('hover'))
      card.addEventListener('mouseleave', () => cringRef.current?.classList.remove('hover'))
    })

    // 连线
    function drawThreads() {
      const threadsEl = threadsRef.current
      if (!threadsEl) return
      const sr = scene!.getBoundingClientRect()
      const pts = cardEls.map(({ el }) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2 }
      })
      let paths = ''
      for (let i = 0; i < pts.length - 1; i += 2) {
        if (pts[i + 1]) {
          const mx = (pts[i].x + pts[i + 1].x) / 2 + 30
          const my = (pts[i].y + pts[i + 1].y) / 2 - 25
          paths += `<path d="M${pts[i].x},${pts[i].y} Q${mx},${my} ${pts[i + 1].x},${pts[i + 1].y}" stroke="rgba(200,169,110,0.18)" stroke-width="0.7" stroke-dasharray="5 5" fill="none" style="stroke-dashoffset:0;animation:dashFlow 3s linear infinite"/>`
        }
      }
      if (pts.length > 4) {
        const mx2 = (pts[1].x + pts[4].x) / 2
        const my2 = (pts[1].y + pts[4].y) / 2 - 50
        paths += `<path d="M${pts[1].x},${pts[1].y} Q${mx2},${my2} ${pts[4].x},${pts[4].y}" stroke="rgba(200,169,110,0.08)" stroke-width="0.5" stroke-dasharray="3 9" fill="none" style="animation:dashFlow 6s linear infinite reverse"/>`
      }
      threadsEl.innerHTML = paths
    }
    const threadTimer = setTimeout(drawThreads, 1400)

    // 计数器
    const targets = [19, 6, 1200]
    const counterEls = [s1Ref.current, s2Ref.current, s3Ref.current]
    const durations = [1200, 800, 1600]
    const timers: ReturnType<typeof setTimeout>[] = []
    counterEls.forEach((el, i) => {
      const t = setTimeout(() => {
        let start: number | null = null
        function step(ts: number) {
          if (!start) start = ts
          const p = Math.min((ts - start) / durations[i], 1)
          const ease = 1 - Math.pow(1 - p, 3)
          if (el) el.textContent = String(Math.round(ease * targets[i]))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, 800 + i * 200)
      timers.push(t)
    })

    // 鼠标磁吸 + 视差
    let mx = scene.offsetWidth / 2
    let my = scene.offsetHeight / 2
    let ringX = mx, ringY = my
    let rafId: number

    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
      if (cdotRef.current) { cdotRef.current.style.left = mx + 'px'; cdotRef.current.style.top = my + 'px' }
      if (glowRef.current) { glowRef.current.style.left = mx + 'px'; glowRef.current.style.top = my + 'px' }
      if (glow2Ref.current) { glow2Ref.current.style.left = mx + 'px'; glow2Ref.current.style.top = my + 'px' }

      const ndx = mx / r.width - 0.5
      const ndy = my / r.height - 0.5
      cardEls.forEach(({ el, c }) => {
        const cr = el.getBoundingClientRect()
        const cardCx = cr.left - r.left + cr.width / 2
        const cardCy = cr.top - r.top + cr.height / 2
        const dx = mx - cardCx
        const dy = my - cardCy
        const dist = Math.sqrt(dx * dx + dy * dy)
        // 视差位移
        const px = ndx * c.spd * r.width * 3
        const py = ndy * c.spd * r.height * 3
        // 磁吸：150px 内卡片被轻微吸引
        const magnet = dist < 150 ? (1 - dist / 150) * 14 : 0
        const mx2 = px + (dist < 150 ? dx / dist * magnet : 0)
        const my2 = py + (dist < 150 ? dy / dist * magnet : 0)
        el.style.marginLeft = mx2 + 'px'
        el.style.marginTop = my2 + 'px'
      })
    }

    const onLeave = () => {
      if (cdotRef.current) cdotRef.current.style.opacity = '0'
      if (cringRef.current) cringRef.current.style.opacity = '0'
      cardEls.forEach(({ el }) => { el.style.marginLeft = '0'; el.style.marginTop = '0' })
    }
    const onEnter = () => {
      if (cdotRef.current) cdotRef.current.style.opacity = '1'
      if (cringRef.current) cringRef.current.style.opacity = '1'
    }

    scene.addEventListener('mousemove', onMove)
    scene.addEventListener('mouseleave', onLeave)
    scene.addEventListener('mouseenter', onEnter)

    function animateRing() {
      ringX += (mx - ringX) * 0.08
      ringY += (my - ringY) * 0.08
      if (cringRef.current) { cringRef.current.style.left = ringX + 'px'; cringRef.current.style.top = ringY + 'px' }
      rafId = requestAnimationFrame(animateRing)
    }
    animateRing()

    return () => {
      clearTimeout(threadTimer)
      timers.forEach(clearTimeout)
      cancelAnimationFrame(rafId)
      scene.removeEventListener('mousemove', onMove)
      scene.removeEventListener('mouseleave', onLeave)
      scene.removeEventListener('mouseenter', onEnter)
      polaroidsEl.innerHTML = ''
    }
  }, [polaroids])

  return (
    <section className="hero-scene" ref={sceneRef}>
        <div className="hero-glow" ref={glowRef} />
        <div className="hero-glow2" ref={glow2Ref} />
        <div className="hero-cursor-ring" ref={cringRef} />
        <div className="hero-cursor-dot" ref={cdotRef} />
        <div className="hero-corner hero-corner-tr">vol. I</div>
        <div className="hero-polaroids" ref={polaroidsRef} />
        <svg
          ref={threadsRef}
          className="hero-threads"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none', overflow: 'visible' }}
        />
        <div className="hero-text">
          <h1 className="hero-title">正在用旅行的经历编写<em>一种全新的生活语言</em></h1>
          <div className="hero-line" />
          <p className="hero-desc">一场视觉与经验的交互实验。剥离传统叙事，留存高浓度的情绪节点与空间切片</p>
          <p className="hero-desc">足迹即语言，旅行即编译，剥开冗余的坐标，重构那组共鸣生命的色彩权重</p>
          <p className="hero-sub">Seoul · Paris · Osaka · Bangkok · Rome</p>
        </div>
        <div className="hero-marquee-wrap">
          <div className="hero-marquee-inner">
            <div className="hero-marquee-text">Paris · Osaka · Seoul · Phuket · Rome · Kyoto · Bangkok · Amsterdam · Chiang Mai · Naples · Busan · Penang · Kobe · Dijon &nbsp;</div>
            <div className="hero-marquee-text">Paris · Osaka · Seoul · Phuket · Rome · Kyoto · Bangkok · Amsterdam · Chiang Mai · Naples · Busan · Penang · Kobe · Dijon &nbsp;</div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="hero-arr-line" />
      </div>
    </section>
  )
}
