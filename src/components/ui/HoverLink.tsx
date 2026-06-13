import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface HoverLinkProps {
  /**
   * Link destination
   */
  href: string
  /**
   * Link text/label
   */
  children: string
  /**
   * Additional className
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  /**
   * Optional mouse enter handler
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  /**
   * Whether to prefetch the route. Set to false for routes that don't exist yet
   * to suppress RSC prefetch 404s in the console.
   */
  prefetch?: boolean
  /**
   * Whether the link is for a "coming soon" feature.
   * If true, hover animations are disabled and it displays a "coming soon" label.
   */
  comingSoon?: boolean
}

/**
 * Link with skew slide-up hover animation and underline
 * Text slides up and out while duplicate slides up from below
 * Underline animates from left to right on hover
 */
export const HoverLink = forwardRef<HTMLAnchorElement, HoverLinkProps>(
  function HoverLink(
    {
      href,
      children,
      className,
      onClick,
      onMouseEnter,
      prefetch,
      comingSoon = false,
    },
    ref
  ) {
  return (
    <div className="relative flex flex-col items-center group">
      <Link
        ref={ref}
        href={comingSoon ? '#' : href}
        onClick={comingSoon ? (e) => e.preventDefault() : onClick}
        onMouseEnter={onMouseEnter}
        prefetch={prefetch}
        style={{ transition: 'transform 150ms ease-out' }}
        className={cn(
          'relative inline-block text-nav-link transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded',
          comingSoon 
            ? 'text-text-color60 cursor-default' 
            : 'text-text-secondary hover:text-foreground active:scale-[0.97]',
          className
        )}
      >
        <span className="relative inline-flex overflow-hidden text-inherit isolate">
          <div
            style={{ transition: 'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out' }}
            className={cn(
              "translate-y-0 skew-y-0",
              !comingSoon && "group-hover:-translate-y-[120%] group-hover:skew-y-12"
            )}
          >
            {children}
          </div>
          {!comingSoon && (
            <div
              style={{ transition: 'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out' }}
              className="absolute inset-0 translate-y-[120%] skew-y-12 opacity-0 group-hover:translate-y-0 group-hover:skew-y-0 group-hover:opacity-100"
            >
              {children}
            </div>
          )}
        </span>
      </Link>
      
      {comingSoon && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium text-text-color60">
            Coming soon
          </span>
        </div>
      )}
    </div>
  )
})
