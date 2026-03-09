'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'
import { NavButton } from '@/components/ui/NavButton'

interface AccessibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

const drawerTransition = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 38,
  mass: 0.9,
}

export function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const {
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
    setHighContrast,
    setReadableFont,
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
  } = useAccessibility()

  const pauseAnimations = reducedMotion && pauseWebGL

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            aria-label="Close accessibility drawer"
          />

          <motion.section
            initial={{ y: '100%', opacity: 0.92 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.98 }}
            transition={drawerTransition}
            className="fixed inset-x-0 bottom-0 z-[101]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="acc-drawer-title"
          >
            <div className="mx-auto max-w-[1920px] px-4 md:px-6 2xl:px-[140px]">
              <div
                className="max-h-[90vh] lg:max-h-[98vh] w-full shadow-2xl overflow-y-auto border-t border-foreground/10"
                style={{
                  backgroundColor: 'rgb(var(--color-footer-bg))',
                }}
              >
                <header className="sticky top-0 z-[102] flex items-center justify-between px-5 md:px-8 pt-7 md:pt-8 pb-5 bg-[rgb(var(--color-footer-bg))] shadow-lg md:shadow-none">
                  <h2
                    id="acc-drawer-title"
                    className="text-[26px] leading-none font-bold text-foreground"
                  >
                    Accessibility Options
                  </h2>
                  <NavButton onClick={onClose} aria-label="Close accessibility drawer" className="-mr-3">
                    Close
                  </NavButton>
                </header>

                <div>
                  <div className="px-5 md:px-8 pb-10 pt-8 md:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                      <div className="space-y-6 order-2 lg:order-1">
                        <Section title="Color & Contrast">
                          <ToggleCard
                            label="High Contrast"
                            active={highContrast}
                            onToggle={() => setHighContrast(!highContrast)}
                            icon={<ContrastIcon />}
                          />
                          <ToggleCard
                            label="Invert Colors"
                            active={invertColors}
                            onToggle={() => setInvertColors(!invertColors)}
                            icon={<InvertIcon />}
                          />
                          <ToggleCard
                            label="Grayscale"
                            active={grayscale}
                            onToggle={() => setGrayscale(!grayscale)}
                            icon={<GrayscaleIcon />}
                          />
                        </Section>

                        <section className="flex flex-col items-start pt-2">
                          <h3 className="mb-4 text-sm font-bold text-foreground md:text-base relative inline-block uppercase tracking-[0.05em]">
                            Color Blindness
                          </h3>
                          <SegmentedButtons
                            options={[
                              { value: 'none', label: 'None' },
                              { value: 'protanopia', label: 'Protanopia' },
                              { value: 'deuteranopia', label: 'Deuteranopia' },
                              { value: 'tritanopia', label: 'Tritanopia' },
                              { value: 'achromatopsia', label: 'Achromatopsia' },
                            ]}
                            value={colorBlindnessType}
                            onChange={(value) =>
                              setColorBlindnessType(
                                value as
                                  | 'none'
                                  | 'protanopia'
                                  | 'deuteranopia'
                                  | 'tritanopia'
                                  | 'achromatopsia'
                              )
                            }
                          />
                        </section>
                      </div>

                      <div className="space-y-6 order-3 lg:order-2">
                        <Section title="Content">
                          <ReadableFontDropdown
                            value={readableFont}
                            onChange={(value) => setReadableFont(value)}
                          />
                          <ToggleCard
                            label="Highlight Links"
                            active={highlightLinks}
                            onToggle={() => setHighlightLinks(!highlightLinks)}
                            icon={<LinkIcon />}
                          />
                          <div className="hidden md:block">
                            <ToggleCard
                              label="Big Cursor"
                              active={bigCursor}
                              onToggle={() => setBigCursor(!bigCursor)}
                              icon={<CursorIcon />}
                            />
                          </div>
                          <ToggleCard
                            label="Hide Images"
                            active={hideImages}
                            onToggle={() => setHideImages(!hideImages)}
                            icon={<ImageIcon />}
                          />
                          <ToggleCard
                            label="Pause Animations"
                            active={pauseAnimations}
                            onToggle={() =>
                              setPauseAnimations(!pauseAnimations)
                            }
                            icon={<PauseIcon />}
                          />
                        </Section>
                      </div>

                      <div className="space-y-6 order-1 lg:order-3">
                        <Section title="Text Size">
                          <SegmentedButtons
                            options={[
                              { value: 'default', label: 'aA' },
                              { value: 'large', label: 'aA+' },
                              { value: 'larger', label: 'AA+' },
                            ]}
                            value={textSize}
                            onChange={(value) =>
                              setTextSize(
                                value as 'default' | 'large' | 'larger'
                              )
                            }
                          />
                        </Section>
                      </div>
                    </div>

                    <div className="mt-16 flex justify-end">
                      <button
                        onClick={resetSettings}
                        className="a11y-option flex w-fit px-0 py-2 text-red-500 font-bold text-base transition-all duration-200 hover:text-red-400"
                      >
                        Reset All Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col items-start">
      <h3 className="mb-4 text-sm font-bold text-foreground md:text-base relative inline-block uppercase tracking-[0.05em]">
        {title}
      </h3>
      <div className="space-y-3 flex flex-col items-stretch w-fit">
        {children}
      </div>
    </section>
  )
}

function ReadableFontDropdown({
  value,
  onChange,
}: {
  value: 'none' | 'opendyslexic' | 'atkinson'
  onChange: (value: 'none' | 'opendyslexic' | 'atkinson') => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { value: 'none', label: 'None' },
    { value: 'opendyslexic', label: 'OpenDyslexic' },
    { value: 'atkinson', label: 'Atkinson' },
  ] as const

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'a11y-option group flex w-full items-center justify-between gap-3 px-4 py-2.5 rounded-none text-left transition-all duration-200 border',
          value !== 'none'
            ? 'bg-foreground/10 dark:bg-white/20 text-foreground font-bold border-foreground'
            : 'bg-foreground/10 dark:bg-white/20 text-text-tertiary border-transparent hover:text-text-secondary hover:bg-foreground/20 dark:hover:bg-white/30'
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <FontIcon />
          </span>
          <span className="relative inline-flex flex-col text-sm md:text-base whitespace-nowrap">
            <span className={cn(value !== 'none' ? 'font-bold' : 'font-normal')}>
              Readable Font
            </span>
            {/* Ghost elements for stable width across all font choices */}
            {/* These ensure the button stays wide enough even when the font changes site-wide */}
            <span className="invisible h-0 font-bold overflow-hidden" aria-hidden="true">
              Readable Font
            </span>
            <span className="invisible h-0 font-bold overflow-hidden dyslexia-font" aria-hidden="true" style={{ fontFamily: "'OpenDyslexic', sans-serif" }}>
              Readable Font
            </span>
            <span className="invisible h-0 font-bold overflow-hidden atkinson-font" aria-hidden="true" style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
              Readable Font
            </span>
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="opacity-50 ml-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 z-[110] overflow-hidden bg-foreground/95 dark:bg-black/95 backdrop-blur-md shadow-2xl"
          >
            <div className="p-1.5 flex flex-col gap-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between px-3 py-2 text-sm md:text-base transition-colors text-left',
                    value === option.value
                      ? 'bg-foreground/10 dark:bg-white/10 text-foreground font-bold'
                      : 'text-text-tertiary hover:bg-foreground/5 dark:hover:bg-white/5 hover:text-text-secondary'
                  )}
                >
                  <span className="relative inline-flex flex-col">
                    <span className={cn(value === option.value ? 'font-bold' : 'font-normal')}>
                      {option.label}
                    </span>
                    {/* Ghost elements inside dropdown to prevent width jitter within the menu itself */}
                    <span className="invisible h-0 font-bold overflow-hidden dyslexia-font" aria-hidden="true" style={{ fontFamily: "'OpenDyslexic', sans-serif" }}>
                      OpenDyslexic
                    </span>
                    <span className="invisible h-0 font-bold overflow-hidden atkinson-font" aria-hidden="true" style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
                      Atkinson
                    </span>
                  </span>
                  
                  {value === option.value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToggleCard({
  label,
  active,
  onToggle,
  icon,
}: {
  label: string
  active: boolean
  onToggle: () => void
  icon: ReactNode
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'a11y-option group flex w-full items-center gap-3 px-4 py-2.5 rounded-none text-left transition-all duration-200 border',
        active
          ? 'bg-foreground/10 dark:bg-white/20 text-foreground font-bold border-foreground'
          : 'bg-foreground/10 dark:bg-white/20 text-text-tertiary border-transparent hover:text-text-secondary hover:bg-foreground/20 dark:hover:bg-white/30'
      )}
      aria-pressed={active}
    >
      <span className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
      <span className="relative inline-flex flex-col text-sm md:text-base whitespace-nowrap">
        <span className={cn(active ? 'font-bold' : 'font-normal')}>{label}</span>
        {/* Ghost element to reserve space for bold text */}
        <span className="invisible h-0 font-bold overflow-hidden" aria-hidden="true">
          {label}
        </span>
      </span>
    </button>
  )
}

// Icon Components (Cohesive minimal non-filled set)
function ContrastIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 18a6 6 0 0 0 0-12v12z" /></svg>
  )
}

function InvertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m4.93 4.93 14.14 14.14" /><path d="M2 12h20" /><path d="m19.07 4.93-14.14 14.14" /></svg>
  )
}

function GrayscaleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 22V2" /></svg>
  )
}

function FontIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
  )
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
  )
}

function AlignLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" /></svg>
  )
}

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
  )
}

function CursorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></svg>
  )
}

function SegmentedButtons({
  options,
  value,
  onChange,
  className,
}: {
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-2 w-fit',
        options.length <= 3 ? 'grid-cols-3' : 'grid-cols-2',
        className
      )}
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'a11y-option group relative flex items-center justify-center px-4 py-2.5 text-sm md:text-base rounded-none text-center transition-all duration-200 border w-full h-full',
              selected
                ? 'bg-foreground/10 dark:bg-white/20 text-foreground font-bold border-foreground'
                : 'bg-foreground/10 dark:bg-white/20 text-text-tertiary border-transparent hover:text-text-secondary hover:bg-foreground/20 dark:hover:bg-white/30'
            )}
            aria-pressed={selected}
          >
            <span className="relative inline-flex flex-col items-center justify-center">
              {/* Actual label */}
              <span className={cn(selected ? 'font-bold' : 'font-normal')}>{option.label}</span>
              
              {/* Ghost elements to reserve space for ALL possible font-weight/font-family combinations */}
              {/* This prevents the button from jumping when the site font changes */}
              <span className="invisible h-0 font-bold overflow-hidden dyslexia-font" aria-hidden="true" style={{ fontFamily: "'OpenDyslexic', sans-serif" }}>
                {option.label}
              </span>
              <span className="invisible h-0 font-bold overflow-hidden atkinson-font" aria-hidden="true" style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
                {option.label}
              </span>
              <span className="invisible h-0 font-bold overflow-hidden" aria-hidden="true" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                {option.label}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
