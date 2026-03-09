'use client'

import { useEffect, type ReactNode } from 'react'
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
    dyslexiaFont,
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
    setDyslexiaFont,
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
                className="h-[90vh] lg:h-[80vh] w-full shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: 'rgb(var(--color-footer-bg))',
                }}
              >
                <header className="flex items-center justify-between px-5 md:px-8 pt-7 md:pt-8 pb-3">
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

                <div className="h-[calc(100%-72px)] overflow-y-auto">
                  <div className="px-5 md:px-8 pb-20 pt-8 md:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                      <div className="space-y-10">
                        <Section title="Color & Contrast">
                          <ToggleCard
                            label="High Contrast"
                            active={highContrast}
                            onToggle={() => setHighContrast(!highContrast)}
                          />
                          <ToggleCard
                            label="Invert Colors"
                            active={invertColors}
                            onToggle={() => setInvertColors(!invertColors)}
                          />
                          <ToggleCard
                            label="Grayscale"
                            active={grayscale}
                            onToggle={() => setGrayscale(!grayscale)}
                          />
                        </Section>

                        <Section title="Color Blindness">
                          <SegmentedButtons
                            label="Filter Type"
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
                        </Section>
                      </div>

                      <div className="space-y-10">
                        <Section title="Content">
                          <ToggleCard
                            label="Readable Font"
                            active={dyslexiaFont}
                            onToggle={() => setDyslexiaFont(!dyslexiaFont)}
                          />
                          <ToggleCard
                            label="Highlight Links"
                            active={highlightLinks}
                            onToggle={() => setHighlightLinks(!highlightLinks)}
                          />
                          <ToggleCard
                            label="Align Text Left"
                            active={alignTextLeft}
                            onToggle={() => setAlignTextLeft(!alignTextLeft)}
                          />
                          <ToggleCard
                            label="Hide Images"
                            active={hideImages}
                            onToggle={() => setHideImages(!hideImages)}
                          />
                          <ToggleCard
                            label="Pause Animations"
                            active={pauseAnimations}
                            onToggle={() =>
                              setPauseAnimations(!pauseAnimations)
                            }
                          />
                        </Section>
                      </div>

                      <div className="space-y-10">
                        <Section title="Text Adjustments">
                          <SegmentedButtons
                            label="Text Size"
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

                        <Section title="Navigation">
                          <ToggleCard
                            label="Big Cursor"
                            active={bigCursor}
                            onToggle={() => setBigCursor(!bigCursor)}
                          />
                        </Section>
                      </div>
                    </div>
                  </div>

                  <div
                    className="sticky bottom-0 backdrop-blur-sm px-5 md:px-8 pt-4 pb-8"
                    style={{ backgroundColor: 'rgb(var(--color-footer-bg) / 0.95)' }}
                  >
                    <button
                      onClick={resetSettings}
                      className="ml-auto block text-red-500 px-0 py-2 font-bold text-base text-right hover:text-red-400 transition-colors"
                    >
                      Reset All Settings
                    </button>
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
    <section>
      <h3 className="mb-5 text-sm md:text-[14px] font-bold uppercase tracking-[0.12em] text-text-color70">
        {title}
      </h3>
      <div className="a11y-options-group space-y-2.5">{children}</div>
    </section>
  )
}

function ToggleCard({
  label,
  active,
  onToggle,
}: {
  label: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'a11y-option group w-full text-left transition-all flex items-center justify-between gap-6 bg-surface-elevated rounded-none px-4 py-3',
        active
          ? 'text-foreground font-bold'
          : 'text-text-secondary hover:text-foreground'
      )}
      aria-pressed={active}
    >
      <span className="relative inline-block text-sm md:text-base">
        {label}
        <span
          className={cn(
            'absolute bottom-0 left-0 h-[1px] bg-current transition-all duration-300 ease-out',
            active ? 'w-full' : 'w-0 group-hover:w-full'
          )}
        />
      </span>
      <span
        className={cn(
          'h-5 w-5 md:h-6 md:w-6 transition-colors flex-shrink-0',
          active
            ? 'bg-primary'
            : 'bg-surface-elevated'
        )}
      />
    </button>
  )
}

function SegmentedButtons({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <p className="mb-4 text-sm md:text-base font-medium text-text-secondary">{label}</p>
      <div className="a11y-options-group flex flex-wrap items-center gap-3 md:gap-4">
        {options.map((option) => {
          const selected = option.value === value

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'a11y-option group px-4 py-2.5 text-sm md:text-base transition-all bg-surface-elevated rounded-none relative',
                selected
                  ? 'text-foreground font-bold'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
              aria-pressed={selected}
            >
              {option.label}
              <span
                className={cn(
                  'absolute bottom-2 left-4 h-[1px] bg-current transition-all duration-300 ease-out',
                  selected ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
