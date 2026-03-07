'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'
import { HoverLink } from '@/components/ui/HoverLink'
import { ProgressiveBlur } from '@/components/ui/ProgressiveBlur'
import { NavButton } from '@/components/ui/NavButton'

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
      className="sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform' }}
    >
      <nav className="relative px-6 2xl:px-[140px] py-6 flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo - slides up on scroll, hidden on mobile */}
        <motion.div
          className="hidden sm:block"
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

        {/* Mobile Spacer - ensures justify-between keeps button on right when logo is hidden */}
        <div className="sm:hidden flex-1 h-8" />

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
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <NavButton onClick={onClose} className="-mr-3">Close</NavButton>
        </motion.div>
      </nav>
      {/* Progressive blur facing downward, behind progress bar */}
      <ProgressiveBlur
        side="bottom"
        height="100%"
        strength={12}
        steps={8}
        className="-z-10"
      />
    </motion.header>
  )
}
