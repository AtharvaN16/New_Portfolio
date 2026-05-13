'use client'

import { useAccessibility } from '@/components/providers/AccessibilityProvider'

export function A11yFilterOverlay() {
  const { highContrast, invertColors, grayscale, colorBlindnessType } =
    useAccessibility()

  const filters: string[] = []

  if (colorBlindnessType === 'protanopia')
    filters.push('sepia(0.22) saturate(0.72) hue-rotate(-22deg)')
  else if (colorBlindnessType === 'deuteranopia')
    filters.push('sepia(0.18) saturate(0.68) hue-rotate(14deg)')
  else if (colorBlindnessType === 'tritanopia')
    filters.push('sepia(0.24) saturate(0.65) hue-rotate(165deg)')
  else if (colorBlindnessType === 'achromatopsia')
    filters.push('grayscale(1) contrast(1.04)')

  if (invertColors) filters.push('invert(1) hue-rotate(180deg)')
  if (grayscale) filters.push('grayscale(1)')
  if (highContrast) filters.push('contrast(1.14)')

  if (filters.length === 0) return null

  const filterValue = filters.join(' ')

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[100000]"
      style={{
        backdropFilter: filterValue,
        WebkitBackdropFilter: filterValue,
      }}
    />
  )
}
