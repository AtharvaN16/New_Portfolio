'use client'

import { Bowlby_One_SC } from 'next/font/google'
import { m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  HERO_FLASH_BEAT_DELAY_S,
  HERO_FLASH_BEAT_DURATION_S,
  HERO_FLASH_WELCOME_TEXT,
} from './hero-entry-timing'

const bowlbyOneSc = Bowlby_One_SC({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

function useFitTextToFrameWidth(text: string) {
  const frameRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [fontSizePx, setFontSizePx] = useState(64)

  useEffect(() => {
    const frame = frameRef.current
    const textEl = textRef.current
    if (!frame || !textEl) return

    const fit = () => {
      const maxWidth = frame.clientWidth
      if (maxWidth <= 0) return

      let low = 12
      let high = 512

      while (low < high) {
        const mid = Math.ceil((low + high) / 2)
        textEl.style.fontSize = `${mid}px`
        if (textEl.scrollWidth > maxWidth) {
          high = mid - 1
        } else {
          low = mid
        }
      }

      setFontSizePx(low)
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [text])

  return { frameRef, textRef, fontSizePx }
}

export function HeroFlashWelcome() {
  const { frameRef, textRef, fontSizePx } = useFitTextToFrameWidth(
    HERO_FLASH_WELCOME_TEXT
  )

  return (
    <m.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        delay: HERO_FLASH_BEAT_DELAY_S,
        duration: HERO_FLASH_BEAT_DURATION_S,
        times: [0, 0.12, 0.5, 1],
        ease: 'easeInOut',
      }}
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${bowlbyOneSc.className}`}
    >
      <div ref={frameRef} className="absolute inset-x-0 bottom-0">
        <span
          ref={textRef}
          style={{ fontSize: fontSizePx }}
          className="block w-full translate-y-[0.08em] whitespace-nowrap leading-[0.72] text-black"
        >
          {HERO_FLASH_WELCOME_TEXT}
        </span>
      </div>
    </m.div>
  )
}
