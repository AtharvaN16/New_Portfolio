'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface AccessibilitySettings {
  reducedMotion: boolean
  highContrast: boolean
  dyslexiaFont: boolean
  pauseWebGL: boolean
}

interface AccessibilityContextType extends AccessibilitySettings {
  setReducedMotion: (value: boolean) => void
  setHighContrast: (value: boolean) => void
  setDyslexiaFont: (value: boolean) => void
  setPauseWebGL: (value: boolean) => void
  resetSettings: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const osReducedMotion = useReducedMotion()
  
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [pauseWebGL, setPauseWebGL] = useState(false)

  // Initialize from localStorage or OS preference
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setReducedMotion(parsed.reducedMotion ?? osReducedMotion)
        setHighContrast(parsed.highContrast ?? false)
        setDyslexiaFont(parsed.dyslexiaFont ?? false)
        setPauseWebGL(parsed.pauseWebGL ?? false)
      } catch (e) {
        setReducedMotion(osReducedMotion)
      }
    } else {
      setReducedMotion(osReducedMotion)
    }
  }, [osReducedMotion])

  // Save to localStorage when settings change
  useEffect(() => {
    const settings = { reducedMotion, highContrast, dyslexiaFont, pauseWebGL }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))

    // Apply classes to document element
    const root = document.documentElement
    if (highContrast) root.classList.add('high-contrast')
    else root.classList.remove('high-contrast')

    if (dyslexiaFont) root.classList.add('dyslexia-font')
    else root.classList.remove('dyslexia-font')
  }, [reducedMotion, highContrast, dyslexiaFont, pauseWebGL])

  const resetSettings = () => {
    setReducedMotion(osReducedMotion)
    setHighContrast(false)
    setDyslexiaFont(false)
    setPauseWebGL(false)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        dyslexiaFont,
        pauseWebGL,
        setReducedMotion,
        setHighContrast,
        setDyslexiaFont,
        setPauseWebGL,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
