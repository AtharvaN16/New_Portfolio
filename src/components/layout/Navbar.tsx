'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Navbar Component
 *
 * Main navigation bar with logo, navigation links, and theme toggle.
 * Follows component guidelines: <300 lines, design tokens, Framer Motion animations.
 *
 * Features:
 * - Theme-aware logo (light/dark variants)
 * - Smooth theme toggle animation
 * - Responsive design (mobile + desktop)
 * - Accessible keyboard navigation
 */

const navLinks = [
  { label: 'Writings', href: '/writings' },
  { label: 'Explorations', href: '/explorations' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      className="relative z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between max-w-[1920px]">
        {/* Logo */}
        <Link href="/" className="relative h-11 w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded">
          <Image
            src={theme === 'dark' ? '/icons/Logo dark mode.svg' : '/icons/Logo light mode.svg'}
            alt="Atharva Nayak"
            width={165}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Navigation Links + Theme Toggle */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Nav Links */}
          <ul className="hidden sm:flex items-center gap-8 md:gap-10">
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
              >
                <Link
                  href={link.href}
                  className="text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="relative h-10 w-10 rounded-full bg-surface hover:bg-surface-elevated transition-colors duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
            >
              <Image
                src={theme === 'dark' ? '/icons/sun.max.fill 1.svg' : '/icons/moon.stars.fill 1.svg'}
                alt={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
