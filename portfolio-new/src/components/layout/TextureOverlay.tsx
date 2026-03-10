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
  const opacity = isDark ? 0.018 : 0.15

  return (
    <>
      {/* SVG Filter Definition */}
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
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* The Overlay Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] contrast-[120%]"
        style={{
          filter: 'url(#sensory-grit)',
          opacity: opacity,
          // Add a subtle brightness boost only in dark mode to keep it "emissive"
          brightness: isDark ? '1.2' : '1.0'
        } as React.CSSProperties}
        aria-hidden="true"
      />
    </>
  )
}
