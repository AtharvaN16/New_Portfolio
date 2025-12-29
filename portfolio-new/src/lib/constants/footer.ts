/**
 * Footer Constants
 *
 * Single source of truth for all footer content and links
 */

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Resume', href: '/resume' },
    { label: 'Work', href: '/work' },
    { label: 'Explorations', href: '/explorations' },
    { label: 'Writings', href: '/writings' },
    { label: 'About', href: '/about' },
  ],
  contact: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/atharva-nayak-142b95184/',
      external: true,
    },
    {
      label: 'Schedule a call',
      href: 'https://calendly.com/atharvanayak16',
      external: true,
    },
  ],
} as const

export const FOOTER_CONTACT = {
  email: 'atharvanayak16@gmail.com',
  location: 'New York',
} as const

export const FOOTER_ARIA_LABELS = {
  copyEmail: 'Copy email to clipboard',
  navigation: 'Footer navigation',
  quickLinks: 'Quick links',
  contact: 'Contact information',
} as const
