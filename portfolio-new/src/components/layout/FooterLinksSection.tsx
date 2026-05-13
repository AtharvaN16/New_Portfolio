'use client'

import { AnimatePresence, m, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useEmailCopy } from '@/hooks/use-email-copy'
import {
  FOOTER_ARIA_LABELS,
  FOOTER_CONTACT,
  FOOTER_LINKS,
} from '@/lib/constants/footer'

interface FooterLinksSectionProps {
  sectionOpacity: MotionValue<number>
  sectionY: MotionValue<number>
  playShimmer: boolean
  onOpenAccessibility?: () => void
}

export function FooterLinksSection({
  sectionOpacity,
  sectionY,
  playShimmer,
  onOpenAccessibility,
}: FooterLinksSectionProps) {
  const { copyEmail, isCopied } = useEmailCopy()

  return (
    <m.div
      className="order-1 lg:order-2 flex flex-col gap-8 sm:flex-row sm:gap-12 lg:gap-0 lg:-ml-32"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <nav
        aria-label={FOOTER_ARIA_LABELS.quickLinks}
        className="w-full lg:w-[200px]"
      >
        <h3 className="mb-4 text-base font-bold text-foreground md:text-xl lg:mb-6 lg:text-2xl">
          Quick links
        </h3>
        <ul className="space-y-1.5 md:space-y-3">
          {FOOTER_LINKS.quickLinks.map((link) => {
            const isResume = link.label === 'Résumé'
            const isComingSoon = link.label === 'Writings' || link.label === 'About'

            return (
              <li key={link.href}>
                <a
                  href={isComingSoon ? '#' : link.href}
                  onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
                  className={cn(
                    isResume && 'footer-resume-link',
                    'footer-link group relative inline-block',
                    'text-sm md:text-base transition-colors duration-300',
                    isComingSoon 
                      ? 'text-text-color60 cursor-default' 
                      : 'text-text-secondary hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                  )}
                >
                  {link.label}
                  {!isComingSoon && (
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                  )}
                  {isComingSoon && (
                    <div className="absolute top-full left-0 mt-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <span className="text-[10px] uppercase tracking-widest font-medium text-text-color60">
                        Coming soon
                      </span>
                    </div>
                  )}
                </a>
              </li>
            )
          })}
          {onOpenAccessibility && (
            <li key="accessibility" className="hidden lg:list-item">
              <button
                onClick={onOpenAccessibility}
                className={cn(
                  'footer-link group relative inline-block',
                  'text-sm md:text-base text-text-secondary',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-primary focus-visible:ring-offset-2 rounded text-left'
                )}
              >
                Accessibility
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="w-full lg:w-[200px] mt-4 sm:mt-0">
        <h3
          className={cn(
            'mb-4 text-base font-bold text-foreground md:text-xl lg:mb-6 lg:text-2xl relative inline-block',
            playShimmer && 'shimmer-glow'
          )}
        >
          Get in touch
        </h3>
        <div className="space-y-1.5 md:space-y-3">
          {FOOTER_LINKS.contact.map((link) => (
            <div key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'footer-link group relative inline-block',
                  'text-sm md:text-base text-text-secondary',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                )}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </div>
          ))}

          <div className="flex items-center gap-3 -my-1">
            <a
              href={`mailto:${FOOTER_CONTACT.email}`}
              className={cn(
                'footer-link group relative inline-block',
                'text-sm md:text-base text-text-secondary',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
              )}
            >
              {FOOTER_CONTACT.email}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyEmail(FOOTER_CONTACT.email)}
                aria-label={FOOTER_ARIA_LABELS.copyEmail}
                className={cn(
                  'group relative flex items-center justify-center',
                  'rounded-md p-2',
                  'text-text-secondary opacity-70 transition-all duration-200',
                  'hover:bg-surface hover:text-foreground hover:opacity-100',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-primary focus-visible:ring-offset-2'
                )}
              >
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 12 15"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="scale-110"
                >
                  <g clipPath="url(#clip0_2011_35922)">
                    <path d="M2.77734 1.86749C2.77734 0.625103 3.38393 0.00390625 4.6117 0.00390625H6.74569C7.43999 0.00390625 7.97348 0.171995 8.41926 0.632407L11.1598 3.43144C11.6276 3.91378 11.7883 4.41805 11.7883 5.21464V9.73112C11.7883 10.9735 11.1745 11.5947 9.94668 11.5947H9.01124V10.5423H9.8955C10.4436 10.5423 10.7286 10.2427 10.7286 9.71645V4.915H8.18541C7.49842 4.915 7.15495 4.57151 7.15495 3.87724V1.05628H4.67016C4.11474 1.05628 3.82972 1.35592 3.82972 1.88211V2.91271C3.8251 2.91257 3.82011 2.91256 3.81511 2.91256H2.77734V1.86749ZM8.0977 3.71646C8.0977 3.89917 8.1708 3.97225 8.35346 3.97225H10.4729L8.0977 1.53863V3.71646Z" />
                    <path d="M0 12.6413C0 13.891 0.606577 14.5049 1.83435 14.5049H7.16932C8.39711 14.5049 9.011 13.8837 9.011 12.6413V8.27829C9.011 7.46707 8.92329 7.12354 8.41902 6.60466L5.38613 3.50603C4.91109 3.01638 4.51646 2.91406 3.81487 2.91406H1.83435C0.606577 2.91406 0 3.53526 0 4.77765V12.6413ZM1.05238 12.6266V4.79227C1.05238 4.26608 1.3374 3.96644 1.89282 3.96644H3.63947V7.21125C3.63947 7.97865 4.0268 8.35863 4.78686 8.35863H7.95127V12.6266C7.95127 13.1528 7.66629 13.4524 7.11814 13.4524H1.88551C1.3374 13.4524 1.05238 13.1528 1.05238 12.6266ZM4.91109 7.37936C4.70647 7.37936 4.61877 7.29165 4.61877 7.08702V4.17107L7.754 7.37936H4.91109Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2011_35922">
                      <rect width="12" height="14.504" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <AnimatePresence>
                {isCopied && (
                  <m.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-medium text-[rgb(var(--color-success))] whitespace-nowrap"
                  >
                    Copied!
                  </m.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  )
}
