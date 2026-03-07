'use client'

import { useState, useRef } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HoverLink } from '@/components/ui/HoverLink'
import { NavButton } from '@/components/ui/NavButton'
import { MobileMenu } from './MobileMenu'

/**
 * Navbar Component
 *
 * Main navigation bar with logo, navigation links, and theme toggle.
 * Follows component guidelines: <300 lines, design tokens, Framer Motion animations.
 */

const navLinks = [
  { label: 'Writings', href: '/writings' },
  { label: 'Explorations', href: '/explorations' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [comingSoonLabel, setComingSoonLabel] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleComingSoon = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setComingSoonLabel(label)
    timeoutRef.current = setTimeout(() => {
      setComingSoonLabel(null)
    }, 1500)
  }

  return (
    <>
      <motion.nav
        className="relative z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between max-w-[1920px]">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-8 w-auto sm:h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            <Image
              src={
                theme === 'dark'
                  ? '/icons/Logo dark mode.svg'
                  : '/icons/Logo light mode.svg'
              }
              alt="Atharva Nayak"
              width={165}
              height={44}
              priority
              className="h-8 w-auto sm:h-11"
            />
          </Link>

          {/* Navigation Links + Theme Toggle */}
          <div className="flex items-center gap-8 md:gap-16 lg:gap-[140px]">
            {/* Nav Links */}
            <ul className="hidden sm:flex items-center gap-10 md:gap-16 lg:gap-[140px]">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex flex-col items-center"
                >
                  <HoverLink
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleComingSoon(link.label)
                    }}
                  >
                    {link.label}
                  </HoverLink>
                  <AnimatePresence>
                    {comingSoonLabel === link.label && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 2 }}
                        className="absolute top-full mt-1 text-[10px] uppercase tracking-wider font-medium text-text-color60 whitespace-nowrap pointer-events-none"
                      >
                        Coming Soon
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>

            {/* Desktop/Tablet Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative hidden h-11 w-11 rounded-full bg-surface hover:bg-surface-elevated transition-colors duration-200 sm:flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Toggle theme"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-text-primary"
              >
                {theme === 'dark' ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5"
                  >
                    <path
                      d="M17 10.5C16 14 13 17 9 17C5 17 2 14 2 10C2 6 5 3 9 3C9.5 3 10 3.1 10.5 3.2C9.5 4.5 9 6.2 9 8C9 11.9 12.1 15 16 15C16.3 15 16.7 15 17 14.9V10.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            {/* Mobile MENU button */}
            <motion.div
              className="sm:hidden"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <NavButton
                className="-mr-3"
                aria-label="Open menu"
                onClick={() => setIsMenuOpen(true)}
              >
                Menu
              </NavButton>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  )
}
