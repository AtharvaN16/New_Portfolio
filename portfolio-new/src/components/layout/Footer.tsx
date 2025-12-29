'use client'

/**
 * Footer Component
 *
 * Modern, responsive footer with:
 * - Quick navigation links with hover effects
 * - Contact information with email copy
 * - Real-time location clock
 *
 * Mobile-first responsive design using design tokens
 */

import { cn } from '@/lib/utils/cn'
import { useCurrentTime } from '@/hooks/use-current-time'
import { useEmailCopy } from '@/hooks/use-email-copy'
import {
  FOOTER_LINKS,
  FOOTER_CONTACT,
  FOOTER_ARIA_LABELS,
} from '@/lib/constants/footer'
import { GradientBar } from '@/components/ui/GradientBar'

export function Footer() {
  const { formattedTime, formattedDate } = useCurrentTime()
  const { isCopied, copyEmail } = useEmailCopy()

  const handleCopyEmail = () => {
    copyEmail(FOOTER_CONTACT.email)
  }

  return (
    <footer
      className="w-full text-foreground footer-bg mt-[200px] md:mt-[240px] lg:mt-[280px] relative z-20"
      style={{
        backgroundColor: 'rgb(var(--color-footer-bg))',
        boxShadow: 'var(--shadow-2xl)',
      }}
    >
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1920px] px-6 pt-16 pb-[166px] md:pt-20 md:pb-[208px] lg:pt-40 lg:pb-[250px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[300px_300px_1fr] md:gap-x-16 lg:gap-x-20">
          {/* Quick Links Section */}
          <nav aria-label={FOOTER_ARIA_LABELS.quickLinks}>
            <h3 className="mb-8 text-xl font-bold text-foreground md:text-2xl lg:text-[32px]">
              Quick links
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.quickLinks.map((link) => {
                // Special traveling gradient effect for Resume link
                const isResume = link.label === 'Resume'

                if (isResume) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={cn(
                          'footer-resume-link',
                          'group relative inline-block',
                          'text-base text-text-secondary sm:text-lg',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                        )}
                      >
                        {link.label}
                        {/* Underline animation */}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                      </a>
                    </li>
                  )
                }

                // Default styling for other links
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'group relative inline-block',
                        'text-base text-text-secondary sm:text-lg',
                        'transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                      )}
                    >
                      {link.label}
                      {/* Underline animation */}
                      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Get in Touch Section */}
          <div>
            <h3 className="mb-8 text-xl font-bold text-foreground md:text-2xl lg:text-[32px]">
              Get in touch
            </h3>
            <div className="space-y-4">
              {/* External Links */}
              {FOOTER_LINKS.contact.map((link) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'group relative inline-block',
                      'text-base text-text-secondary sm:text-lg',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                    )}
                  >
                    {link.label}
                    {/* Underline animation */}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </div>
              ))}

              {/* Email with Copy Button */}
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${FOOTER_CONTACT.email}`}
                  className={cn(
                    'group relative inline-block',
                    'text-base text-text-secondary sm:text-lg',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-primary focus-visible:ring-offset-2 rounded'
                  )}
                >
                  {FOOTER_CONTACT.email}
                  {/* Underline animation */}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label={FOOTER_ARIA_LABELS.copyEmail}
                  className={cn(
                    'group relative flex items-center justify-center',
                    'rounded-md p-1.5',
                    'text-text-tertiary opacity-50 transition-all duration-200',
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
                        <rect width="12" height="14.5214" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {isCopied && (
                    <span
                      className={cn(
                        'absolute -top-8 left-1/2 -translate-x-1/2',
                        'whitespace-nowrap rounded-md',
                        'bg-surface px-2 py-1',
                        'text-xs font-medium text-success',
                        'animate-in fade-in slide-in-from-bottom-2',
                        'duration-200'
                      )}
                    >
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Rate My Portfolio Section */}
          <div className="lg:ml-auto">
            <a
              href="#rate-portfolio"
              className={cn(
                'group block p-6 transition-all duration-200 max-w-[330px]',
                'bg-surface-muted/30',
                'hover:bg-surface-muted/50',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">
                  Rate my portfolio
                </span>
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  <g clipPath="url(#clip0_2014_36801)">
                    <path
                      d="M14.209 5.85938C14.209 5.64453 14.1114 5.43946 13.9355 5.27344L8.89648 0.244141C8.72072 0.078125 8.52536 0 8.32032 0C7.89062 0 7.55859 0.322266 7.55859 0.761718C7.55859 0.9668 7.62695 1.17187 7.77344 1.30859L9.12112 2.70508L12.4218 5.68359L12.5977 5.2539L10 5.06836H0.78125C0.322266 5.06836 0 5.40039 0 5.85938C0 6.31836 0.322266 6.65039 0.78125 6.65039H10L12.5977 6.46484L12.4218 6.04492L9.12112 9.01368L7.77344 10.4102C7.62695 10.5469 7.55859 10.7519 7.55859 10.957C7.55859 11.3965 7.89062 11.7187 8.32032 11.7187C8.52536 11.7187 8.72072 11.6406 8.89648 11.4746L13.9355 6.44531C14.1114 6.2793 14.209 6.07422 14.209 5.85938Z"
                      fill="white"
                      fillOpacity="0.85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2014_36801">
                      <rect width="14.4922" height="11.7285" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="text-base text-text-secondary opacity-70">
                (Takes less than 5 min and is anonymous. The feedback will help
                me get better)
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Bar Below Footer */}
      <GradientBar height="h-4" className="w-full" />
    </footer>
  )
}
