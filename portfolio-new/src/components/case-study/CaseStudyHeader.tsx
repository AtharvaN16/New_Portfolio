'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'
import { HoverLink } from '@/components/ui/HoverLink'

interface CaseStudyHeaderProps {
  isScrolled: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Writings', href: '/writings' },
  { label: 'Explorations', href: '/explorations' },
  { label: 'About', href: '/about' },
]

export function CaseStudyHeader({ isScrolled, onClose }: CaseStudyHeaderProps) {
  const { theme } = useTheme()

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform' }}
    >
      <nav className="px-6 py-6 flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo - slides up on scroll */}
        <motion.div
          animate={{
            y: isScrolled ? -100 : 0,
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Link
            href="/"
            className="relative h-11 w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
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
              className="h-11 w-auto"
            />
          </Link>
        </motion.div>

        {/* Centered Navigation Links - slide up on scroll */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          animate={{
            y: isScrolled ? -100 : 0,
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          <ul className="hidden sm:flex items-center gap-10 md:gap-12">
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
                <HoverLink href={link.href}>{link.label}</HoverLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Close Button - stays visible */}
        <motion.button
          onClick={onClose}
          className="text-sm md:text-base font-medium text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-3 py-1.5 uppercase tracking-wider"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileTap={{ scale: 0.95 }}
        >
          CLOSE
        </motion.button>
      </nav>
    </motion.header>
  )
}
