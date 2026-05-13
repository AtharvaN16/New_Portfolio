'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

const RING_SIZE = 52
const BG_RADIUS = 24
const RING_RADIUS = 18
const STROKE_WIDTH = 3
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

interface CaseStudyVideoProps {
  src: string
  alt: string
  className?: string
}

export function CaseStudyVideo({ src, alt, className }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileControlsVisible, setMobileControlsVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration)
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    return () => video.removeEventListener('timeupdate', onTimeUpdate)
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full bg-black overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setMobileControlsVisible(true)}
    >
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        className="w-full h-auto block"
        playsInline
        muted
        preload="none"
        loop
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className={cn(
          'flex items-center justify-center transition-opacity duration-200',
          'absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2',
          'md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0 md:top-4 md:right-4',
          !mobileControlsVisible && 'max-md:opacity-0 max-md:pointer-events-none',
          mobileControlsVisible && 'max-md:opacity-100',
          !isHovered && 'md:opacity-0 md:pointer-events-none',
          isHovered && 'md:opacity-100'
        )}
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="absolute inset-0 -rotate-90"
        >
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={BG_RADIUS} fill="rgba(0,0,0,0.55)" />
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="white"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        <span className="relative z-10">
          {isPlaying ? (
            <svg width={14} height={14} viewBox="0 0 14 14" fill="white">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 14 14" fill="white" style={{ marginLeft: 2 }}>
              <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  )
}
