import Link from 'next/link'
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
}

/**
 * Link with skew slide-up hover animation and underline
 * Text slides up and out while duplicate slides up from below
 * Underline animates from left to right on hover
 */
export function HoverLink({ href, children, className, onClick }: HoverLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ transition: 'transform 150ms ease-out' }}
      className={cn(
        'group relative inline-block text-nav-link text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded active:scale-[0.97]',
        className
      )}
    >
      <span className="relative inline-flex overflow-hidden text-inherit isolate">
        <div
          style={{ transition: 'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out' }}
          className="translate-y-0 skew-y-0 group-hover:-translate-y-[120%] group-hover:skew-y-12"
        >
          {children}
        </div>
        <div
          style={{ transition: 'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out' }}
          className="absolute inset-0 translate-y-[120%] skew-y-12 opacity-0 group-hover:translate-y-0 group-hover:skew-y-0 group-hover:opacity-100"
        >
          {children}
        </div>
      </span>
    </Link>
  )
}
