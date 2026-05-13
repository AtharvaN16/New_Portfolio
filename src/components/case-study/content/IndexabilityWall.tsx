'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export function IndexabilityWall() {
  const containerRef = useRef<HTMLDivElement>(null)
  const botRef = useRef<SVGGElement>(null)
  const wallRef = useRef<SVGLineElement>(null)
  const errorRef = useRef<SVGTextElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      
      tl.set(botRef.current, { x: 0, opacity: 1, scale: 1, fill: '#1F3A66' })
      tl.set(errorRef.current, { opacity: 0, scale: 0.5 })
      tl.set(wallRef.current, { stroke: '#1F3A66', strokeWidth: 2, x: 0 })

      tl.to(botRef.current, {
        x: 160,
        duration: 1.5,
        ease: "power2.in"
      })
      .to(botRef.current, {
        scale: 1.1,
        duration: 0.1,
      })
      .to(botRef.current, {
        fill: '#ef4444',
        duration: 0.1,
      }, "<")
      .to(wallRef.current, {
        x: 2,
        stroke: '#ef4444',
        strokeWidth: 4,
        duration: 0.05,
        yoyo: true,
        repeat: 3
      }, "<")
      .to(errorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, "<")
      .to(errorRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.8
      })
      .to(botRef.current, {
        opacity: 0,
        duration: 0.3,
      }, "<")
      
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full aspect-square max-w-[300px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The Wall */}
        <line ref={wallRef} x1="200" y1="20" x2="200" y2="100" stroke="#1F3A66" strokeWidth="2" strokeLinecap="round" />
        
        {/* Googlebot */}
        <g ref={botRef}>
          <circle cx="30" cy="60" r="20" fill="#1F3A66" />
          <text x="30" y="66" textAnchor="middle" fill="white" className="font-bold text-[14px] select-none">G</text>
        </g>

        {/* Error Label */}
        <text ref={errorRef} x="170" y="50" fill="#ef4444" className="font-mono text-[12px] font-bold select-none">403</text>
      </svg>
    </div>
  )
}
