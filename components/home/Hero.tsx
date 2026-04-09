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

    const cardEls: { el: HTMLDivElement; c: Polaroid }[] = []

    // Build polaroid cards
    polaroids.forEach((c) => {
      const card = document.createElement('div')
      card.className = 'hero-card'
      card.style.cssText = `
        left:${c.x}%; top:${c.y}%;
        --r:${c.rot}deg;
        z-index:${Math.floor(c.spd * 1000)};
        animation: cardIn 0.7s ${c.delay}s both cubic-bezier(.22,.68,0,1.2), float${c.float} ${3.5 + polaroids.indexOf(c) * 0.4}s ${c.delay + 0.7}s ease-in-out infinite;
      `
      card.innerHTML = `
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
      `
      polaroidsEl.appendChild(card)
      cardEls.push({ el: card as HTMLDivElement, c })

      card.addEventListener('mouseenter', () => cringRef.current?.classList.add('hover'))
      card.addEventListener('mouseleave', () => cringRef.current?.classList.remove('hover'))
    })

    // Draw threads
    function drawThreads() {
      const threadsEl = threadsRef.current
      if (!threadsEl) return
      const sr = scene!.getBoundingClientRect()
      const pts = cardEls.map(({ el }) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - sr.left + r.width / 2, y: r.top - sr.top + r.height / 2 }
      })
      let d = ''
      for (let i = 0; i < pts.length - 1; i += 2) {
        if (pts[i + 1])
          d += `M${pts[i].x},${pts[i].y} Q${(pts[i].x + pts[i + 1].x) / 2 + 20},${(pts[i].y + pts[i + 1].y) / 2 - 30} ${pts[i + 1].x},${pts[i + 1].y} `
      }
      threadsEl.innerHTML = `<path d="${d}" stroke="rgba(200,169,110,0.2)" stroke-width="0.5" stroke-dasharray="4 4" fill="none"/>`
    }
    const threadTimer = setTimeout(drawThreads, 1200)

    // Counter animation
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

    // Mouse tracking
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
        const ox = ndx * c.spd * r.width * 2.2
        const oy = ndy * c.spd * r.height * 2.2
        el.style.marginLeft = ox + 'px'
        el.style.marginTop = oy + 'px'
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
      ringX += (mx - ringX) * 0.1
      ringY += (my - ringY) * 0.1
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
    <>
      <style>{`
        @keyframes floatA{0%,100%{transform:translateY(0px) rotate(var(--r))}50%{transform:translateY(-10px) rotate(var(--r))}}
        @keyframes floatB{0%,100%{transform:translateY(0px) rotate(var(--r))}50%{transform:translateY(8px) rotate(var(--r))}}
        @keyframes floatC{0%,100%{transform:translateY(0px) rotate(var(--r))}50%{transform:translateY(-6px) rotate(var(--r))}}
        @keyframes cardIn{from{opacity:0;transform:translateY(40px) rotate(var(--r)) scale(0.88)}to{opacity:1;transform:translateY(0) rotate(var(--r)) scale(1)}}
        @keyframes titleIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lineGrow{from{width:0}to{width:100%}}
        @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes glowPulse{0%,100%{opacity:0.18}50%{opacity:0.32}}
        @keyframes dotBlink{0%,100%{opacity:1}50%{opacity:0.3}}

        .hero-scene{width:100%;height:100vh;background:#0b1510;position:relative;overflow:hidden;cursor:none;user-select:none;}

        .hero-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(80,160,90,0.18) 0%,transparent 70%);pointer-events:none;z-index:2;transform:translate(-50%,-50%);transition:left 0.8s cubic-bezier(.25,.46,.45,.94),top 0.8s cubic-bezier(.25,.46,.45,.94);animation:glowPulse 4s ease-in-out infinite;}
        .hero-glow2{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(200,169,110,0.1) 0%,transparent 70%);pointer-events:none;z-index:2;transform:translate(-50%,-50%);transition:left 0.4s ease-out,top 0.4s ease-out;}

        .hero-polaroids{position:absolute;inset:0;z-index:5;}

        .hero-card{position:absolute;width:140px;background:#ede9e0;padding:7px 7px 26px;border-radius:1px;cursor:pointer;will-change:transform;transition:box-shadow 0.3s;}
        .hero-card-img{width:100%;aspect-ratio:1/1;overflow:hidden;position:relative;}
        .hero-card-color{width:100%;height:100%;transition:transform 0.5s ease;}
        .hero-card:hover .hero-card-color{transform:scale(1.06);}
        .hero-card-photo{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;}
        .hero-card:hover .hero-card-photo{transform:scale(1.06);}
        .hero-card-tag{position:absolute;top:6px;left:6px;font-size:8px;letter-spacing:0.08em;text-transform:uppercase;background:rgba(255,255,255,0.85);color:#2a2520;padding:2px 6px;border-radius:20px;}
        .hero-card-bottom{padding-top:5px;display:flex;justify-content:space-between;align-items:flex-end;}
        .hero-card-city{font-size:10px;font-family:Georgia,serif;font-style:italic;color:#3a3530;}
        .hero-card-date{font-size:8px;color:#9a9088;}

        .hero-text{position:absolute;top:88px;left:28px;z-index:10;}
        .hero-eyebrow{font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:10px;animation:titleIn 1s 1.2s both ease-out;}
        .hero-title{font-size:34px;font-family:Georgia,serif;font-style:italic;font-weight:400;color:rgba(255,255,255,0.92);line-height:1.25;animation:titleIn 1s 1.4s both ease-out;}
        .hero-title em{font-style:normal;color:#c8a96e;}
        .hero-line{height:0.5px;background:rgba(200,169,110,0.5);margin:14px 0;animation:lineGrow 1s 1.8s both ease-out;}
        .hero-desc{font-size:13px;line-height:1.8;color:rgba(255,255,255,0.45);font-weight:300;margin:8px 0 0;letter-spacing:0.02em;animation:titleIn 1s 1.9s both ease-out;}
        .hero-sub{font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.04em;margin-top:16px;animation:titleIn 1s 2.1s both ease-out;}

        .hero-marquee-wrap{position:absolute;bottom:0;left:0;right:0;z-index:3;overflow:hidden;pointer-events:none;padding-bottom:4px;}
        .hero-marquee-inner{display:flex;white-space:nowrap;animation:marqueeScroll 22s linear infinite;will-change:transform;}
        .hero-marquee-text{font-size:62px;font-family:Georgia,serif;font-style:italic;font-weight:400;color:rgba(255,255,255,0.055);letter-spacing:-0.01em;padding-right:60px;flex-shrink:0;}

        .hero-scroll-hint{position:absolute;bottom:52px;right:28px;z-index:10;display:flex;align-items:center;gap:10px;animation:titleIn 1s 2.2s both ease-out;}
        .hero-scroll-hint span{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.25);}
        .hero-arr-line{width:0.5px;height:20px;background:linear-gradient(to bottom,transparent,rgba(200,169,110,0.5));animation:lineGrow 1s 2.4s both ease-out;}

        .hero-corner{position:absolute;z-index:10;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.2);}
        .hero-corner-tl{top:62px;left:28px;animation:titleIn 1s 1s both ease-out;}
        .hero-corner-tr{top:62px;right:28px;text-align:right;animation:titleIn 1s 1.1s both ease-out;}

        .hero-cursor-dot{position:absolute;width:5px;height:5px;background:#c8a96e;border-radius:50%;pointer-events:none;z-index:100;transform:translate(-50%,-50%);transition:opacity 0.2s;opacity:0;}
        .hero-cursor-ring{position:absolute;width:36px;height:36px;border:0.5px solid rgba(200,169,110,0.45);border-radius:50%;pointer-events:none;z-index:99;transform:translate(-50%,-50%);transition:left 0.12s ease-out,top 0.12s ease-out,width 0.2s,height 0.2s,opacity 0.2s;opacity:0;}
        .hero-cursor-ring.hover{width:52px;height:52px;border-color:rgba(200,169,110,0.7);}
      `}</style>

      <section className="hero-scene" ref={sceneRef}>
        {/* 光晕 */}
        <div className="hero-glow" ref={glowRef} />
        <div className="hero-glow2" ref={glow2Ref} />

        {/* 自定义光标 */}
        <div className="hero-cursor-ring" ref={cringRef} />
        <div className="hero-cursor-dot" ref={cdotRef} />

        {/* 角落标签 */}
        <div className="hero-corner hero-corner-tr">vol. I</div>

        {/* 极坐标卡片容器 */}
        <div className="hero-polaroids" ref={polaroidsRef} />

        {/* 连线 SVG */}
        <svg
          ref={threadsRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none', overflow: 'visible' }}
        />

        {/* 主文案 */}
        <div className="hero-text">
          <h1 className="hero-title">正在用旅行的经历编写<em>一种全新的生活语言</em></h1>
          <div className="hero-line" />
          <p className="hero-desc">一场视觉与经验的交互实验。剥离传统叙事，留存高浓度的情绪节点与空间切片</p>
          <p className="hero-desc">足迹即语言，旅行即编译，剥开冗余的坐标，重构那组共鸣生命的色彩权重</p>
          <p className="hero-sub">Seoul · Paris · Osaka · Bangkok · Rome</p>
        </div>

        {/* 跑马灯 */}
        <div className="hero-marquee-wrap">
          <div className="hero-marquee-inner">
            <div className="hero-marquee-text">Paris · Osaka · Seoul · Phuket · Rome · Kyoto · Bangkok · Amsterdam · Chiang Mai · Naples · Busan · Penang · Kobe · Dijon &nbsp;</div>
            <div className="hero-marquee-text">Paris · Osaka · Seoul · Phuket · Rome · Kyoto · Bangkok · Amsterdam · Chiang Mai · Naples · Busan · Penang · Kobe · Dijon &nbsp;</div>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="hero-arr-line" />
        </div>
      </section>
    </>
  )
}
