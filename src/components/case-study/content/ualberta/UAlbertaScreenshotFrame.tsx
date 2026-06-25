import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import {
  UALBERTA_SCREENSHOT_FRAME_CLASS,
  UALBERTA_SCREENSHOT_FRAME_RADIUS,
  UALBERTA_SCREENSHOT_IMAGE_CLASS,
} from './ualberta-frame'

interface UAlbertaScreenshotFrameProps {
  src: string
  alt: string
  width: number
  height: number
  pageName: string
  className?: string
  frameHeightClass?: string
}

export function UAlbertaScreenshotFrame({
  src,
  alt,
  width,
  height,
  pageName,
  className,
  frameHeightClass = 'h-[380px] md:h-[500px]',
}: UAlbertaScreenshotFrameProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className={cn(
          'relative overflow-hidden',
          UALBERTA_SCREENSHOT_FRAME_RADIUS,
          UALBERTA_SCREENSHOT_FRAME_CLASS,
          frameHeightClass
        )}
      >
        <p className="absolute top-4 left-4 z-[2] text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary/55 md:top-5 md:left-5 md:text-xs">
          {pageName}
        </p>

        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            UALBERTA_SCREENSHOT_IMAGE_CLASS,
            'absolute bottom-0 left-1/2 z-[1] block h-auto w-[84%] max-w-none -translate-x-1/2 translate-y-[5%]'
          )}
          sizes="(max-width: 768px) 50vw, 400px"
        />
      </div>
    </div>
  )
}
