'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

type TextSizeLevel = 'default' | 'large' | 'larger'
type LineHeightLevel = 'default' | 'relaxed' | 'loose'
type LetterSpacingLevel = 'default' | 'wide' | 'wider'
type WordSpacingLevel = 'default' | 'wide' | 'wider'

type ColorBlindnessType =
  | 'none'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia'

type ReadableFontType = 'none' | 'opendyslexic' | 'atkinson'

interface AccessibilitySettings {
  reducedMotion: boolean
  saveData: boolean
  highContrast: boolean
  readableFont: ReadableFontType
  pauseWebGL: boolean
  textSize: TextSizeLevel
  lineHeight: LineHeightLevel
  letterSpacing: LetterSpacingLevel
  wordSpacing: WordSpacingLevel
  readingGuide: boolean
  invertColors: boolean
  grayscale: boolean
  highlightLinks: boolean
  hideImages: boolean
  bigCursor: boolean
  colorBlindnessType: ColorBlindnessType
}

interface AccessibilityContextType extends AccessibilitySettings {
  setReducedMotion: (value: boolean) => void
  setSaveData: (value: boolean) => void
  setHighContrast: (value: boolean) => void
  setReadableFont: (value: ReadableFontType) => void
  setPauseWebGL: (value: boolean) => void
  setTextSize: (value: TextSizeLevel) => void
  setLineHeight: (value: LineHeightLevel) => void
  setLetterSpacing: (value: LetterSpacingLevel) => void
  setWordSpacing: (value: WordSpacingLevel) => void
  setReadingGuide: (value: boolean) => void
  setInvertColors: (value: boolean) => void
  setGrayscale: (value: boolean) => void
  setHighlightLinks: (value: boolean) => void
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
  const [saveData, setSaveDataState] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [readableFont, setReadableFont] = useState<ReadableFontType>('none')
  const [pauseWebGL, setPauseWebGL] = useState(false)
  const [textSize, setTextSize] = useState<TextSizeLevel>('default')
  const [lineHeight, setLineHeight] = useState<LineHeightLevel>('default')
  const [letterSpacing, setLetterSpacing] = useState<LetterSpacingLevel>('default')
  const [wordSpacing, setWordSpacing] = useState<WordSpacingLevel>('default')
  const [readingGuide, setReadingGuide] = useState(false)
  const [invertColors, setInvertColors] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [hideImages, setHideImages] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)
  const [colorBlindnessType, setColorBlindnessType] =
    useState<ColorBlindnessType>('none')

  // Initialize from localStorage or OS preference
  useEffect(() => {
    // Detect Data Saver mode
    const nav = navigator as any
    if (nav.connection && nav.connection.saveData !== undefined) {
      setSaveDataState(nav.connection.saveData)
    }

    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydrates persisted a11y preferences on mount.
        setReducedMotion(parsed.reducedMotion ?? osReducedMotion)
        setSaveDataState(parsed.saveData ?? false)
        setHighContrast(parsed.highContrast ?? false)
        setReadableFont(parsed.readableFont ?? (parsed.dyslexiaFont ? 'opendyslexic' : 'none'))
        setPauseWebGL(parsed.pauseWebGL ?? false)
        setTextSize(parsed.textSize ?? 'default')
        setLineHeight(parsed.lineHeight ?? 'default')
        setLetterSpacing(parsed.letterSpacing ?? 'default')
        setWordSpacing(parsed.wordSpacing ?? 'default')
        setReadingGuide(parsed.readingGuide ?? false)
        setInvertColors(parsed.invertColors ?? false)
        setGrayscale(parsed.grayscale ?? false)
        setHighlightLinks(parsed.highlightLinks ?? false)
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

  // Save to localStorage and apply CSS classes when settings change
  useEffect(() => {
    const settings = {
      reducedMotion,
      saveData,
      highContrast,
      readableFont,
      pauseWebGL,
      textSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      readingGuide,
      invertColors,
      grayscale,
      highlightLinks,
      hideImages,
      bigCursor,
      colorBlindnessType,
    }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))

    // Apply classes to document element
    const root = document.documentElement
    root.classList.toggle('a11y-reduced-motion', reducedMotion)
    root.classList.toggle('a11y-save-data', saveData)
    root.classList.toggle('high-contrast', highContrast)
    root.classList.toggle('a11y-invert', invertColors)
    root.classList.toggle('a11y-grayscale', grayscale)
    root.classList.toggle('a11y-highlight-links', highlightLinks)
    root.classList.toggle('a11y-hide-images', hideImages)
    root.classList.toggle('a11y-big-cursor', bigCursor)

    // Handle Readable Fonts
    root.classList.remove('dyslexia-font', 'atkinson-font')
    if (readableFont === 'opendyslexic') root.classList.add('dyslexia-font')
    if (readableFont === 'atkinson') root.classList.add('atkinson-font')

    root.classList.remove('a11y-text-large', 'a11y-text-larger')
    if (textSize === 'large') root.classList.add('a11y-text-large')
    if (textSize === 'larger') root.classList.add('a11y-text-larger')

    // Line Height
    root.classList.remove('a11y-leading-relaxed', 'a11y-leading-loose')
    if (lineHeight === 'relaxed') root.classList.add('a11y-leading-relaxed')
    if (lineHeight === 'loose') root.classList.add('a11y-leading-loose')

    // Letter Spacing
    root.classList.remove('a11y-tracking-wide', 'a11y-tracking-wider')
    if (letterSpacing === 'wide') root.classList.add('a11y-tracking-wide')
    if (letterSpacing === 'wider') root.classList.add('a11y-tracking-wider')

    // Word Spacing
    root.classList.remove('a11y-word-spacing-wide', 'a11y-word-spacing-wider')
    if (wordSpacing === 'wide') root.classList.add('a11y-word-spacing-wide')
    if (wordSpacing === 'wider') root.classList.add('a11y-word-spacing-wider')

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
    saveData,
    highContrast,
    readableFont,
    pauseWebGL,
    textSize,
    lineHeight,
    letterSpacing,
    wordSpacing,
    readingGuide,
    invertColors,
    grayscale,
    highlightLinks,
    hideImages,
    bigCursor,
    colorBlindnessType,
  ])

  const setPauseAnimations = (value: boolean) => {
    setReducedMotion(value)
    setPauseWebGL(value)
  }

  // Color/contrast filters are mutually exclusive: only one can be active at a time
  const setHighContrastExclusive = (value: boolean) => {
    setHighContrast(value)
    if (value) {
      setInvertColors(false)
      setGrayscale(false)
      setColorBlindnessType('none')
    }
  }
  const setInvertColorsExclusive = (value: boolean) => {
    setInvertColors(value)
    if (value) {
      setHighContrast(false)
      setGrayscale(false)
      setColorBlindnessType('none')
    }
  }
  const setGrayscaleExclusive = (value: boolean) => {
    setGrayscale(value)
    if (value) {
      setHighContrast(false)
      setInvertColors(false)
      setColorBlindnessType('none')
    }
  }
  const setColorBlindnessTypeExclusive = (value: ColorBlindnessType) => {
    setColorBlindnessType(value)
    if (value !== 'none') {
      setHighContrast(false)
      setInvertColors(false)
      setGrayscale(false)
    }
  }

  const setSaveData = (value: boolean) => {
    // Manually setting saveData doesn't change network state, but can be a user preference
    setSaveDataState(value)
  }

  const resetSettings = () => {
    setReducedMotion(osReducedMotion)
    setHighContrast(false)
    setReadableFont('none')
    setPauseWebGL(false)
    setTextSize('default')
    setLineHeight('default')
    setLetterSpacing('default')
    setWordSpacing('default')
    setReadingGuide(false)
    setInvertColors(false)
    setGrayscale(false)
    setHighlightLinks(false)
    setHideImages(false)
    setBigCursor(false)
    setColorBlindnessType('none')
  }

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        saveData,
        highContrast,
        readableFont,
        pauseWebGL,
        textSize,
        lineHeight,
        letterSpacing,
        wordSpacing,
        readingGuide,
        invertColors,
        grayscale,
        highlightLinks,
        hideImages,
        bigCursor,
        colorBlindnessType,
        setReducedMotion,
        setSaveData,
        setHighContrast: setHighContrastExclusive,
        setReadableFont,
        setPauseWebGL,
        setTextSize,
        setLineHeight,
        setLetterSpacing,
        setWordSpacing,
        setReadingGuide,
        setInvertColors: setInvertColorsExclusive,
        setGrayscale: setGrayscaleExclusive,
        setHighlightLinks,
        setHideImages,
        setBigCursor,
        setColorBlindnessType: setColorBlindnessTypeExclusive,
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
