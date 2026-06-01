'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'

const FRAME_GRADIENT =
  'bg-[radial-gradient(circle_at_20%_10%,#49d477_0%,#2aa756_32%,#0f5f38_70%,#0b3e2a_100%)]'

const FRAME_GRAY_CLASS = 'bg-[#CECFCD] dark:bg-[rgba(255,255,255,0.15)]'

/** Top/side inset only — no bottom padding so screenshots sit flush on the gradient edge. */
const FRAME_INSET_CLASS = 'px-5 pt-6 md:px-9 md:pt-8'

const FADE_OUT_MS = 280
const GRAY_HOLD_MS = 120
const FADE_IN_MS = 480

export interface ExplorationSlideImage {
  id: string
  label: string
  src: string
  width: number
  height: number
  /** Trims baked-in empty pixels at the bottom of the asset. */
  bottomClipPercent?: number
  /** Nudges the screenshot down inside the frame (px). */
  offsetY?: number
}

function ExplorationSlideContent({ slide }: { slide: ExplorationSlideImage }) {
  return (
    <div
      className="max-w-[760px] overflow-hidden leading-none"
      style={slide.offsetY ? { transform: `translateY(${slide.offsetY}px)` } : undefined}
    >
      <Image
        src={slide.src}
        alt={`Services page design exploration ${slide.label}`}
        width={slide.width}
        height={slide.height}
        className="block h-auto w-full"
        style={
          slide.bottomClipPercent
            ? {
                clipPath: `inset(0 0 ${slide.bottomClipPercent}% 0)`,
                marginBottom: `-${slide.bottomClipPercent}%`,
              }
            : undefined
        }
        priority={slide.id === 'v1'}
      />
    </div>
  )
}

export function UAlbertaExplorationImageFrame({
  slides,
  activeIndex,
}: {
  slides: ExplorationSlideImage[]
  activeIndex: number
}) {
  const { reducedMotion } = useAccessibility()
  const [renderIndex, setRenderIndex] = useState(activeIndex)
  const [imageVisible, setImageVisible] = useState(true)
  const [grayVisible, setGrayVisible] = useState(false)
  const timersRef = useRef<number[]>([])
  const transitionTargetRef = useRef(activeIndex)

  const motionClass = reducedMotion
    ? 'transition-none'
    : 'transition-opacity ease-in-out'

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
  }

  useEffect(() => {
    clearTimers()
    transitionTargetRef.current = activeIndex

    if (reducedMotion) {
      setRenderIndex(activeIndex)
      setImageVisible(true)
      setGrayVisible(false)
      return
    }

    if (activeIndex === renderIndex && imageVisible && !grayVisible) {
      return
    }

    setImageVisible(false)
    setGrayVisible(true)

    schedule(() => {
      if (transitionTargetRef.current !== activeIndex) return

      setRenderIndex(activeIndex)

      schedule(() => {
        if (transitionTargetRef.current !== activeIndex) return

        setGrayVisible(false)
        setImageVisible(true)
      }, GRAY_HOLD_MS)
    }, FADE_OUT_MS)

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the target slide changes
  }, [activeIndex, reducedMotion])

  useEffect(() => () => clearTimers(), [])

  const slide = slides[renderIndex]

  return (
    <div className="relative w-full">
      <div
        className={cn(
          'absolute inset-0',
          FRAME_GRADIENT,
          motionClass,
          grayVisible ? 'opacity-0' : 'opacity-100'
        )}
        style={{ transitionDuration: reducedMotion ? undefined : `${FADE_IN_MS}ms` }}
        aria-hidden
      />

      <div
        className={cn(
          'absolute inset-0',
          FRAME_GRAY_CLASS,
          motionClass,
          grayVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transitionDuration: reducedMotion
            ? undefined
            : `${grayVisible ? FADE_OUT_MS : FADE_IN_MS}ms`,
        }}
        aria-hidden={!grayVisible}
      />

      <div
        className={cn(
          'relative',
          FRAME_INSET_CLASS,
          'leading-none',
          motionClass,
          imageVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          transitionDuration: reducedMotion
            ? undefined
            : `${imageVisible ? FADE_IN_MS : FADE_OUT_MS}ms`,
        }}
      >
        {slide ? <ExplorationSlideContent slide={slide} /> : null}
      </div>
    </div>
  )
}
