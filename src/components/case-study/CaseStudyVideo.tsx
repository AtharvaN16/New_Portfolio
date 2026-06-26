'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

const RING_SIZE = 52
const BG_RADIUS = 24
const RING_RADIUS = 18
const STROKE_WIDTH = 3
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const ICON_SIZE = 14
const REPLAY_ICON_SIZE = 22

function ReplayIcon() {
  return (
    <svg
      width={REPLAY_ICON_SIZE}
      height={REPLAY_ICON_SIZE}
      viewBox="1 1 22 22"
      fill="white"
      aria-hidden
    >
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  )
}

const CONTROL_VISIBILITY = cn(
  'flex items-center justify-center transition-opacity duration-200',
  'absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2',
  'md:bottom-auto md:left-auto md:translate-x-0 md:translate-y-0 md:top-4 md:right-4'
)

interface CaseStudyVideoProps {
  src: string
  alt: string
  className?: string
  playbackRate?: number
}

interface VideoRingButtonProps {
  ariaLabel: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  progress?: number
  showProgressRing?: boolean
  children: ReactNode
}

function VideoRingButton({
  ariaLabel,
  onClick,
  progress,
  showProgressRing = false,
  children,
}: VideoRingButtonProps) {
  const dashOffset =
    progress !== undefined ? CIRCUMFERENCE * (1 - progress) : undefined

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: RING_SIZE, height: RING_SIZE }}
    >
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className={cn('absolute inset-0', showProgressRing && '-rotate-90')}
        aria-hidden
      >
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={BG_RADIUS} fill="rgba(0,0,0,0.55)" />
        {showProgressRing && dashOffset !== undefined && (
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
        )}
      </svg>
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  )
}

export function CaseStudyVideo({
  src,
  alt,
  className,
  playbackRate = 1,
}: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileControlsVisible, setMobileControlsVisible] = useState(false)

  const controlsVisibleOnDesktop = isHovered
  const controlsVisibleOnMobile = mobileControlsVisible

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldReduceMotion) {
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
  }, [shouldReduceMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const pauseWhenHidden = () => {
      if (document.visibilityState === 'hidden') {
        video.pause()
        setIsPlaying(false)
      }
    }

    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden)
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

  const resetVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    setProgress(0)
    if (!video.paused) {
      void video.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full overflow-hidden rounded-lg bg-black', className)}
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

      <div
        className={cn(
          CONTROL_VISIBILITY,
          'flex gap-3 transition-opacity duration-200',
          !controlsVisibleOnMobile && 'max-md:opacity-0 max-md:pointer-events-none',
          controlsVisibleOnMobile && 'max-md:opacity-100',
          !controlsVisibleOnDesktop && 'md:opacity-0 md:pointer-events-none',
          controlsVisibleOnDesktop && 'md:opacity-100'
        )}
      >
        <VideoRingButton
          ariaLabel="Restart video"
          onClick={(e) => {
            e.stopPropagation()
            resetVideo()
          }}
        >
          <ReplayIcon />
        </VideoRingButton>

        <VideoRingButton
          ariaLabel={isPlaying ? 'Pause' : 'Play'}
          showProgressRing
          progress={progress}
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
        >
          {isPlaying ? (
            <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 14 14" fill="white">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 14 14" fill="white" style={{ marginLeft: 2 }}>
              <path d="M3 1.5l9 5.5-9 5.5V1.5z" />
            </svg>
          )}
        </VideoRingButton>
      </div>
    </div>
  )
}
