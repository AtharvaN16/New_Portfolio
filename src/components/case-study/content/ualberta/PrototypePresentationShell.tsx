import { cn } from '@/lib/utils/cn'

const FRAME_GRADIENT =
  'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)'

export type PrototypeVariant = 'embedded' | 'fullscreen'

interface PrototypePresentationShellProps {
  variant?: PrototypeVariant
  children: React.ReactNode
  innerClassName?: string
  innerStyle?: React.CSSProperties
  embeddedFrameHeight?: string
  embeddedInnerHeight?: string
  embeddedPadding?: string
  outerClassName?: string
}

export function PrototypePresentationShell({
  variant = 'embedded',
  children,
  innerClassName,
  innerStyle,
  embeddedFrameHeight = '1100px',
  embeddedInnerHeight = '1100px',
  embeddedPadding = '80px 48px 0 48px',
  outerClassName,
}: PrototypePresentationShellProps) {
  if (variant === 'fullscreen') {
    return (
      <main
        id="main-content"
        className={cn(
          'min-h-dvh w-full overflow-x-hidden overflow-y-auto',
          outerClassName
        )}
        style={{ background: FRAME_GRADIENT }}
        data-lenis-prevent="true"
      >
        <div className="box-border flex min-h-dvh w-full flex-col px-6 py-12 md:px-[240px] md:py-20">
          <div
            className={cn(
              'flex w-full flex-col overflow-y-auto rounded-none border-none shadow-none scroll-smooth',
              'min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-10rem)]',
              innerClassName
            )}
            style={innerStyle}
            data-lenis-prevent="true"
          >
            {children}
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className={cn('w-full mx-auto overflow-hidden', outerClassName)}>
      <div
        className="relative w-full overflow-hidden rounded-none border-none shadow-2xl"
        style={{
          background: FRAME_GRADIENT,
          height: embeddedFrameHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: embeddedPadding,
        }}
      >
        <div
          className={cn(
            'w-full flex flex-col overflow-y-auto rounded-none border-none shadow-none scroll-smooth',
            innerClassName
          )}
          data-lenis-prevent="true"
          style={{ height: embeddedInnerHeight, ...innerStyle }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
