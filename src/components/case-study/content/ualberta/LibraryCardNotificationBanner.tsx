'use client'

import { useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function renderNotification(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

interface LibraryCardNotificationBannerProps {
  text: string
  animate?: boolean
}

export function LibraryCardNotificationBanner({
  text,
  animate = false,
}: LibraryCardNotificationBannerProps) {
  const [open, setOpen] = useState(!animate)

  useEffect(() => {
    if (!animate) {
      setOpen(true)
      return
    }

    setOpen(false)
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOpen(true))
    })

    return () => cancelAnimationFrame(frame)
  }, [animate, text])

  const banner = (
    <div className="bg-[#FFF8E1] px-4 py-3 text-[10px] text-[#383838] leading-normal border-l-4 border-[#FFD54F]">
      {renderNotification(text)}
    </div>
  )

  if (!animate) {
    return <div className="mb-4">{banner}</div>
  }

  return (
    <div
      className="grid overflow-hidden"
      style={{
        gridTemplateRows: open ? '1fr' : '0fr',
        marginBottom: open ? '1rem' : 0,
        transition: `grid-template-rows 420ms ${EASE}, margin-bottom 420ms ${EASE}`,
      }}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(-6px)',
            transition: `opacity 360ms ${EASE} ${open ? '80ms' : '0ms'}, transform 360ms ${EASE} ${open ? '80ms' : '0ms'}`,
          }}
        >
          {banner}
        </div>
      </div>
    </div>
  )
}
