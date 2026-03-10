'use client'

import React from 'react'

/**
 * TextureOverlay - Implements the "Sensory Grit" (Digital Defrost) 2026 design trend.
 *
 * This component provides a microscopic, high-frequency grain texture across the
 * entire application using a performant SVG noise filter.
 *
 * Metaphor: "The Tooth of the Interface"
 * - Adds a paper-like quality to the screen.
 * - Breaks up clinical CSS perfection.
 * - Subtle shimmer that adds human touch/authenticity.
 *
 * Technical:
 * - Uses feTurbulence for scalable, zero-asset grain.
 * - Opacity is theme-aware: higher in light mode (absorptive) and lower in dark mode (emissive).
 */
export function TextureOverlay() {
  return (
    <>
      {/* SVG Filter Definition - Hidden from view */}
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
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.055] [data-theme='dark']:opacity-[0.015] contrast-[120%] brightness-[120%]"
        style={{
          filter: 'url(#sensory-grit)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
