'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import {
  HERO_FLASH_HEAD_EVENT,
  type HeroFlashHeadDetail,
} from './hero-flash-head'

const EDGE_LIGHT_RADIUS_PX = 110
const FLASH_WAKE_LAG_PX = 104

type AtmosphereStyle = CSSProperties & {
  '--flash-local-y': string
  '--flash-edge-side-opacity': number
  '--flash-edge-top-opacity': number
  '--flash-edge-bottom-opacity': number
}

function proximityIntensity(distance: number, radius: number): number {
  if (distance >= radius) return 0
  const t = 1 - distance / radius
  return t * t
}

export function HeroFlashAtmosphere() {
  const { reducedMotion, pauseWebGL, saveData } = useAccessibility()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion || pauseWebGL || saveData) return

    const root = rootRef.current
    if (!root) return

    const resetAtmosphere = () => {
      root.style.setProperty('--flash-edge-side-opacity', '0')
      root.style.setProperty('--flash-edge-top-opacity', '0')
      root.style.setProperty('--flash-edge-bottom-opacity', '0')
    }

    const updateAtmosphere = (detail: HeroFlashHeadDetail) => {
      if (!detail.active || detail.trail <= 0.001) {
        resetAtmosphere()
        return
      }

      const rect = root.getBoundingClientRect()
      const localY = detail.headScreenY - rect.top
      const wakeY = localY + FLASH_WAKE_LAG_PX
      const inContainerDistance =
        wakeY < 0
          ? Math.abs(wakeY)
          : wakeY > rect.height
            ? wakeY - rect.height
            : 0
      const containerIntensity =
        detail.trail *
        proximityIntensity(inContainerDistance, EDGE_LIGHT_RADIUS_PX)

      root.style.setProperty('--flash-local-y', `${wakeY}px`)
      root.style.setProperty(
        '--flash-edge-side-opacity',
        (containerIntensity * 0.64).toFixed(3)
      )
      root.style.setProperty(
        '--flash-edge-top-opacity',
        (
          detail.trail *
          proximityIntensity(Math.abs(wakeY), EDGE_LIGHT_RADIUS_PX) *
          0.56
        ).toFixed(3)
      )
      root.style.setProperty(
        '--flash-edge-bottom-opacity',
        (
          detail.trail *
          proximityIntensity(
            Math.abs(wakeY - rect.height),
            EDGE_LIGHT_RADIUS_PX
          ) *
          0.4
        ).toFixed(3)
      )
    }

    const handleFlashHead = (event: Event) => {
      updateAtmosphere((event as CustomEvent<HeroFlashHeadDetail>).detail)
    }

    window.addEventListener(HERO_FLASH_HEAD_EVENT, handleFlashHead)
    return () => {
      window.removeEventListener(HERO_FLASH_HEAD_EVENT, handleFlashHead)
    }
  }, [pauseWebGL, reducedMotion, saveData])

  if (reducedMotion || pauseWebGL || saveData) return null

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      style={
        {
          '--flash-local-y': '50%',
          '--flash-edge-side-opacity': 0,
          '--flash-edge-top-opacity': 0,
          '--flash-edge-bottom-opacity': 0,
        } as AtmosphereStyle
      }
      aria-hidden="true"
    >
      <div className="hero-flash-edge hero-flash-edge--sides absolute inset-0" />
      <div className="hero-flash-edge hero-flash-edge--top absolute inset-0" />
      <div className="hero-flash-edge hero-flash-edge--bottom absolute inset-0" />
    </div>
  )
}
