'use client'

import React from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

/**
 * TextureOverlay - Implements the "Sensory Grit" (Digital Defrost) 2026 design trend.
 */
export function TextureOverlay() {
  const { theme } = useTheme()
  const [useStaticTexture, setUseStaticTexture] = React.useState(false)
  const isDark = theme === 'dark'

  React.useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    // Safari re-rasterizes feTurbulence through the CPU on every repaint (no GPU path).
    // Use the same pre-baked static tile that mobile uses — visually identical since
    // feTurbulence grain is static (non-animated) in both cases.
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    setUseStaticTexture(isMobile || isSafari)
  }, [])

  const opacity = isDark ? 0.025 : 0.2

  const staticNoiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`

  return (
    <>
      {/* SVG Filter Definition - Optimized for Desktop (numOctaves reduced 3 -> 2) */}
      <svg
        className="sr-only pointer-events-none absolute"
        aria-hidden="true"
        width="0"
        height="0"
      >
        <filter id="sensory-grit">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* 
        Background texture layer 
        - On Desktop: Uses GPU-intensive feTurbulence for infinite, non-repeating grain.
        - On Mobile: Switches to a lightweight, static base64 noise SVG for 0 GPU overhead.
      */}
      <div
        className="fixed inset-0 pointer-events-none z-0 contrast-[120%] texture-layer"
        style={{
          opacity: opacity,
          filter: useStaticTexture
            ? 'none'
            : `url(#sensory-grit) brightness(${isDark ? '1.2' : '1.0'})`,
          backgroundImage: useStaticTexture ? staticNoiseSvg : undefined,
          backgroundRepeat: useStaticTexture ? 'repeat' : undefined,
          backgroundSize: useStaticTexture ? '200px 200px' : undefined,
          // GPU layer promotion: prevents the fixed overlay from being dirtied
          // when Lenis animates the scroll container via transforms
          willChange: 'transform',
        } as React.CSSProperties}
        aria-hidden="true"
      />
    </>
  )
}
