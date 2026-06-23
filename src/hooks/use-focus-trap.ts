import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

interface UseFocusTrapOptions {
  enabled: boolean
  initialFocusSelector?: string
  onEscape?: () => void
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1
  )
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  { enabled, initialFocusSelector, onEscape }: UseFocusTrapOptions
) {
  const onEscapeRef = useRef(onEscape)
  onEscapeRef.current = onEscape

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscapeRef.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const focusables = getFocusableElements(container)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
          event.preventDefault()
          last.focus()
        }
        return
      }

      if (active === last || !container.contains(active)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const focusTarget =
      (initialFocusSelector
        ? container.querySelector<HTMLElement>(initialFocusSelector)
        : null) ?? getFocusableElements(container)[0]

    const focusTimer = window.setTimeout(() => focusTarget?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [containerRef, enabled, initialFocusSelector])
}
