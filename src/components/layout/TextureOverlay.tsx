'use client'

import React from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

/**
 * TextureOverlay - Implements the "Sensory Grit" (Digital Defrost) 2026 design trend.
 */
export function TextureOverlay() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Explicitly defined opacities to ensure zero leakage between themes
  const opacity = isDark ? 0.025 : 0.2

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
          filter: `url(#sensory-grit) brightness(${isDark ? '1.2' : '1.0'})`,
        } as React.CSSProperties}
        aria-hidden="true"
      />
    </>
  )
}
