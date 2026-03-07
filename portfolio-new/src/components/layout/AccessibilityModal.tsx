'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'
import { cn } from '@/lib/utils/cn'

interface AccessibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const {
    reducedMotion,
    highContrast,
    dyslexiaFont,
    pauseWebGL,
    setReducedMotion,
    setHighContrast,
    setDyslexiaFont,
    setPauseWebGL,
    resetSettings,
  } = useAccessibility()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl z-[101] border border-surface-elevated"
            role="dialog"
            aria-modal="true"
            aria-labelledby="acc-modal-title"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 id="acc-modal-title" className="text-2xl font-bold text-foreground">
                Accessibility Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-elevated rounded-full transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <ToggleItem
                label="Reduced Motion"
                description="Simpler animations for sensitive users."
                active={reducedMotion}
                onToggle={setReducedMotion}
              />
              <ToggleItem
                label="High Contrast"
                description="Enhanced visibility for better readability."
                active={highContrast}
                onToggle={setHighContrast}
              />
              <ToggleItem
                label="Dyslexia Font"
                description="Switches to OpenDyslexic for better legibility."
                active={dyslexiaFont}
                onToggle={setDyslexiaFont}
              />
              <ToggleItem
                label="Pause Background"
                description="Stop all decorative WebGL animations."
                active={pauseWebGL}
                onToggle={setPauseWebGL}
              />
            </div>

            <div className="mt-10 flex justify-between items-center border-t border-surface-elevated pt-6">
              <button
                onClick={resetSettings}
                className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
              >
                Reset to default
              </button>
              <button
                onClick={onClose}
                className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ToggleItem({
  label,
  description,
  active,
  onToggle,
}: {
  label: string
  description: string
  active: boolean
  onToggle: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex-1">
        <h3 className="font-bold text-foreground mb-0.5">{label}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onToggle(!active)}
        className={cn(
          "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
          active ? "bg-primary" : "bg-surface-elevated"
        )}
        role="switch"
        aria-checked={active}
        aria-label={label}
      >
        <motion.div
          animate={{ x: active ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  )
}
