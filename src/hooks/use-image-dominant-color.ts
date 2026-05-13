'use client'

import { useState, useEffect } from 'react'

/**
 * Samples an image via HTML Canvas and returns the average RGB color.
 * Works with same-origin images from /public.
 */
export function useImageDominantColor(imageUrl: string | undefined): string | null {
  const [color, setColor] = useState<string | null>(null)

  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const sampleSize = 100
        canvas.width = sampleSize
        canvas.height = sampleSize
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
        const data = ctx.getImageData(0, 0, sampleSize, sampleSize).data

        let r = 0, g = 0, b = 0, count = 0
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
          count++
        }

        if (count > 0) {
          setColor(`rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`)
        }
      } catch {
        // Canvas tainted or other error - fail silently
      }
    }

    img.src = imageUrl
  }, [imageUrl])

  return color
}
