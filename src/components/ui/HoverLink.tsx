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
}

/**
 * Link with skew slide-up hover animation
 * Text slides up and out while duplicate slides up from below
 */
export function HoverLink({ href, children, className }: HoverLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative inline-block text-nav-link text-text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded',
        className
      )}
    >
      <span className="relative inline-flex overflow-hidden">
        <div className="translate-y-0 skew-y-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[110%] group-hover:skew-y-12">
          {children}
        </div>
        <div className="absolute translate-y-[110%] skew-y-12 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:skew-y-0 group-hover:opacity-100">
          {children}
        </div>
      </span>
    </Link>
  )
}
