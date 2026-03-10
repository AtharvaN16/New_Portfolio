'use client'

import { Expand } from '@theme-toggles/react'
import '@theme-toggles/react/css/Expand.css'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/components/providers/ThemeProvider'
import { NavButton } from '@/components/ui/NavButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuLinks = [
  { label: 'Writings', href: '/writings', prefetch: false },
  { label: 'Explorations', href: '/explorations', prefetch: false },
  { label: 'About', href: '/about', prefetch: false },
  { label: 'Résumé', href: '/resume', prefetch: false },
  { label: 'Get in touch', href: '#footer', prefetch: undefined },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to avoid createPortal access before document is available.
    setMounted(true)
  }, [])

  // Scroll lock + escape key
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Portal to body so it sits above WebGL canvas compositing layers
          className="fixed inset-0 sm:hidden flex flex-col"
          style={{ zIndex: 99999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Glassy backdrop — inline styles to avoid Tailwind v4 CSS var opacity issues */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(0, 0, 0, 0.92)'
                  : 'rgba(247, 247, 245, 0.94)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col h-full px-6 pt-6 pb-8" style={{ zIndex: 1 }}>
            {/* Close button */}
            <div className="flex items-center justify-end h-8">
              <NavButton onClick={onClose} aria-label="Close menu" className="-mr-3">
                Close
              </NavButton>
            </div>

            {/* Nav links — vertically centered, right-aligned, staggered */}
            <nav
              className="flex-1 flex flex-col justify-center items-end"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col items-end gap-6">
                {menuLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.06 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-end"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      prefetch={link.prefetch}
                      className="text-[40px] font-medium text-foreground leading-none tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Theme toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.45 }}
              className="flex justify-end"
            >
              {/* @ts-expect-error - Theme Toggles library has peer dependency conflicts with React 19 types */}
              <Expand
                toggled={theme === 'light'}
                toggle={toggleTheme}
                duration={350}
                reversed
                idPrefix="mobile-"
                className="h-12 w-12 text-[28px] flex-shrink-0 scale-x-[-1] flex items-center justify-center text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Toggle theme"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Portal renders directly onto body — bypasses all stacking contexts including WebGL layers
  if (!mounted) return null
  return createPortal(overlay, document.body)
}
