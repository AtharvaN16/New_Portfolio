import { cn } from '@/lib/utils/cn'

interface HoverButtonProps {
  children: string
  className?: string
  muted?: boolean
  /** Skew slide-up on hover (hero HoverLink style). Off for plain color-only hovers. */
  animate?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
}

/** Button with optional skew slide-up hover (hero HoverLink style). */
export function HoverButton({
  children,
  className,
  muted = false,
  animate = true,
  disabled = false,
  type = 'button',
  onClick,
}: HoverButtonProps) {
  return (
    <div className="relative inline-flex flex-col group">
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{ transition: 'transform 150ms ease-out' }}
        className={cn(
          'relative inline-block text-sm font-bold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded py-2',
          muted
            ? 'text-text-color30 hover:text-foreground'
            : 'text-text-secondary group-hover:text-foreground',
          !disabled && 'active:scale-[0.97]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {animate ? (
          <span className="relative inline-flex overflow-hidden text-inherit isolate">
            <div
              style={{
                transition:
                  'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out',
              }}
              className={cn(
                'translate-y-0 skew-y-0',
                !disabled &&
                  'group-hover:-translate-y-[120%] group-hover:skew-y-12'
              )}
            >
              {children}
            </div>
            {!disabled && (
              <div
                style={{
                  transition:
                    'transform 300ms ease-in-out, translate 300ms ease-in-out, opacity 300ms ease-in-out',
                }}
                className="absolute inset-0 translate-y-[120%] skew-y-12 opacity-0 group-hover:translate-y-0 group-hover:skew-y-0 group-hover:opacity-100"
              >
                {children}
              </div>
            )}
          </span>
        ) : (
          children
        )}
      </button>
    </div>
  )
}
