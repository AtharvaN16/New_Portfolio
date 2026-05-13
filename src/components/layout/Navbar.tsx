'use client'

import { useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { m } from 'framer-motion'
import { Expand } from '@theme-toggles/react'
import '@theme-toggles/react/css/Expand.css'
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
  { label: 'Writings', href: '/writings', prefetch: false },
  { label: 'Explorations', href: '/explorations', prefetch: true },
  { label: 'About', href: '/about', prefetch: false },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <m.nav
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
                <m.li
                  key={link.href}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  <HoverLink
                href={link.href}
                prefetch={link.prefetch}
                comingSoon={link.href === '/writings' || link.href === '/about'}
                onMouseEnter={link.href === '/explorations' ? () => {
                  window.dispatchEvent(new CustomEvent('explorationsdialog:preload'))
                } : undefined}
                onClick={link.href === '/explorations' ? (e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/explorations')
                  window.dispatchEvent(new CustomEvent('explorationsdialog:check'))
                } : link.href === '/about' ? (e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/about')
                  window.dispatchEvent(new CustomEvent('aboutdialog:check'))
                } : link.href === '/writings' ? (e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/writings')
                  window.dispatchEvent(new CustomEvent('writingsdialog:check'))
                } : undefined}
              >{link.label}</HoverLink>
                </m.li>
              ))}
            </ul>

            {/* Desktop/Tablet Theme Toggle */}
            <m.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden sm:flex"
            >
              {/* @ts-expect-error - Theme Toggles library has peer dependency conflicts with React 19 types */}
              <Expand
                toggled={theme === 'light'}
                toggle={toggleTheme}
                duration={350}
                reversed
                idPrefix="navbar-"
                className="h-11 w-11 text-[22px] scale-x-[-1] rounded-full bg-surface hover:bg-surface-elevated transition-colors duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-text-primary"
                aria-label="Toggle theme"
              />
            </m.div>

            {/* Mobile MENU button */}
            <m.div
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
            </m.div>
          </div>
        </div>
      </m.nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
