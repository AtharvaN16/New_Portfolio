'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type TextSizeLevel = 'default' | 'large' | 'larger'
type ColorBlindnessType =
  | 'none'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia'

type ReadableFontType = 'none' | 'opendyslexic' | 'atkinson'

interface AccessibilitySettings {
  reducedMotion: boolean
  highContrast: boolean
  readableFont: ReadableFontType
  pauseWebGL: boolean
  textSize: TextSizeLevel
  invertColors: boolean
  grayscale: boolean
  highlightLinks: boolean
  alignTextLeft: boolean
  hideImages: boolean
  bigCursor: boolean
  colorBlindnessType: ColorBlindnessType
}

interface AccessibilityContextType extends AccessibilitySettings {
  setReducedMotion: (value: boolean) => void
  setHighContrast: (value: boolean) => void
  setReadableFont: (value: ReadableFontType) => void
  setPauseWebGL: (value: boolean) => void
  setTextSize: (value: TextSizeLevel) => void
  setInvertColors: (value: boolean) => void
  setGrayscale: (value: boolean) => void
  setHighlightLinks: (value: boolean) => void
  setAlignTextLeft: (value: boolean) => void
  setHideImages: (value: boolean) => void
  setBigCursor: (value: boolean) => void
  setColorBlindnessType: (value: ColorBlindnessType) => void
  setPauseAnimations: (value: boolean) => void
  resetSettings: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const osReducedMotion = useReducedMotion()
  
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [readableFont, setReadableFont] = useState<ReadableFontType>('none')
  const [pauseWebGL, setPauseWebGL] = useState(false)
  const [textSize, setTextSize] = useState<TextSizeLevel>('default')
  const [invertColors, setInvertColors] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [alignTextLeft, setAlignTextLeft] = useState(false)
  const [hideImages, setHideImages] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)
  const [colorBlindnessType, setColorBlindnessType] =
    useState<ColorBlindnessType>('none')

  // Initialize from localStorage or OS preference
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydrates persisted a11y preferences on mount.
        setReducedMotion(parsed.reducedMotion ?? osReducedMotion)
        setHighContrast(parsed.highContrast ?? false)
        setReadableFont(parsed.readableFont ?? (parsed.dyslexiaFont ? 'opendyslexic' : 'none'))
        setPauseWebGL(parsed.pauseWebGL ?? false)
        setTextSize(parsed.textSize ?? 'default')
        setInvertColors(parsed.invertColors ?? false)
        setGrayscale(parsed.grayscale ?? false)
        setHighlightLinks(parsed.highlightLinks ?? false)
        setAlignTextLeft(parsed.alignTextLeft ?? false)
        setHideImages(parsed.hideImages ?? false)
        setBigCursor(parsed.bigCursor ?? false)
        setColorBlindnessType(parsed.colorBlindnessType ?? 'none')
      } catch {
        setReducedMotion(osReducedMotion)
      }
    } else {
      setReducedMotion(osReducedMotion)
    }
  }, [osReducedMotion])

  // Save to localStorage when settings change
  useEffect(() => {
    const settings = {
      reducedMotion,
      highContrast,
      readableFont,
      pauseWebGL,
      textSize,
      invertColors,
      grayscale,
      highlightLinks,
      alignTextLeft,
      hideImages,
      bigCursor,
      colorBlindnessType,
    }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))

    // Apply classes to document element
    const root = document.documentElement
    root.classList.toggle('high-contrast', highContrast)
    root.classList.toggle('a11y-invert', invertColors)
    root.classList.toggle('a11y-grayscale', grayscale)
    root.classList.toggle('a11y-highlight-links', highlightLinks)
    root.classList.toggle('a11y-align-left', alignTextLeft)
    root.classList.toggle('a11y-hide-images', hideImages)
    root.classList.toggle('a11y-big-cursor', bigCursor)

    // Handle Readable Fonts
    root.classList.remove('dyslexia-font', 'atkinson-font')
    if (readableFont === 'opendyslexic') root.classList.add('dyslexia-font')
    if (readableFont === 'atkinson') root.classList.add('atkinson-font')

    root.classList.remove('a11y-text-large', 'a11y-text-larger')
    if (textSize === 'large') root.classList.add('a11y-text-large')
    if (textSize === 'larger') root.classList.add('a11y-text-larger')

    root.classList.remove(
      'a11y-cvd-protanopia',
      'a11y-cvd-deuteranopia',
      'a11y-cvd-tritanopia',
      'a11y-cvd-achromatopsia'
    )

    if (colorBlindnessType === 'protanopia')
      root.classList.add('a11y-cvd-protanopia')
    if (colorBlindnessType === 'deuteranopia')
      root.classList.add('a11y-cvd-deuteranopia')
    if (colorBlindnessType === 'tritanopia')
      root.classList.add('a11y-cvd-tritanopia')
    if (colorBlindnessType === 'achromatopsia')
      root.classList.add('a11y-cvd-achromatopsia')
  }, [
    reducedMotion,
    highContrast,
    readableFont,
    pauseWebGL,
    textSize,
    invertColors,
    grayscale,
    highlightLinks,
    alignTextLeft,
    hideImages,
    bigCursor,
    colorBlindnessType,
  ])

  const setPauseAnimations = (value: boolean) => {
    setReducedMotion(value)
    setPauseWebGL(value)
  }

  const resetSettings = () => {
    setReducedMotion(osReducedMotion)
    setHighContrast(false)
    setReadableFont('none')
    setPauseWebGL(false)
    setTextSize('default')
    setInvertColors(false)
    setGrayscale(false)
    setHighlightLinks(false)
    setAlignTextLeft(false)
    setHideImages(false)
    setBigCursor(false)
    setColorBlindnessType('none')
  }

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        readableFont,
        pauseWebGL,
        textSize,
        invertColors,
        grayscale,
        highlightLinks,
        alignTextLeft,
        hideImages,
        bigCursor,
        colorBlindnessType,
        setReducedMotion,
        setHighContrast,
        setReadableFont,
        setPauseWebGL,
        setTextSize,
        setInvertColors,
        setGrayscale,
        setHighlightLinks,
        setAlignTextLeft,
        setHideImages,
        setBigCursor,
        setColorBlindnessType,
        setPauseAnimations,
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
