'use client'

import Image from 'next/image'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { cn } from '@/lib/utils/cn'

const PRIMITIVE_TITLE_CLASS =
  'text-[2rem] sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight tracking-[-0.05em]'

type PrimitiveBlock = {
  title: string
  src: string
  alt: string
  width: number
  height: number
  fullBleed?: boolean
  alignRight?: boolean
  matchColorHeight?: boolean
}

/** Color primitive dimensions — spacing clip matches this aspect at the same max width. */
const COLOR_PRIMITIVE_WIDTH = 1161
const COLOR_PRIMITIVE_HEIGHT = 1571

const PRIMITIVES: PrimitiveBlock[] = [
  {
    title: 'Typography',
    src: '/images/case-studies/aquitania-design-system/type-primitive.png',
    alt: 'Aquitania typography primitive scale and type styles',
    width: 3783,
    height: 1623,
    fullBleed: true,
  },
  {
    title: 'Color',
    src: '/images/case-studies/aquitania-design-system/colors-primitive.png',
    alt: 'Aquitania color primitive ramps and brand palettes',
    width: 1161,
    height: 1571,
  },
  {
    title: 'Spacing',
    src: '/images/case-studies/aquitania-design-system/spacing-primitive.png',
    alt: 'Aquitania spacing primitive scale',
    width: 800,
    height: 1720,
    alignRight: true,
    matchColorHeight: true,
  },
  {
    title: 'Border',
    src: '/images/case-studies/aquitania-design-system/border-primitive.png',
    alt: 'Aquitania border radius and border width primitives',
    width: 1454,
    height: 936,
  },
  {
    title: 'Grid',
    src: '/images/case-studies/aquitania-design-system/grid-primitive.png',
    alt: 'Aquitania desktop, tablet, and mobile layout grid primitives',
    width: 900,
    height: 565,
    alignRight: true,
  },
]

const CONSTRAINED_IMAGE_MAX = '750px'

function PrimitiveImage({
  src,
  alt,
  width,
  height,
  fullBleed = false,
  alignRight = false,
  matchColorHeight = false,
}: Omit<PrimitiveBlock, 'title'>) {
  if (fullBleed) {
    return (
      <div
        className="relative overflow-hidden"
        style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          quality={90}
          sizes="100vw"
        />
      </div>
    )
  }

  if (matchColorHeight) {
    return (
      <div
        className={cn(
          'relative w-full max-w-[750px] overflow-hidden',
          alignRight && 'ml-auto'
        )}
        style={{
          aspectRatio: `${COLOR_PRIMITIVE_WIDTH} / ${COLOR_PRIMITIVE_HEIGHT}`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-right-top"
          quality={90}
          sizes={`(max-width: 768px) 100vw, ${CONSTRAINED_IMAGE_MAX}`}
        />
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-[750px]', alignRight && 'ml-auto')}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
        quality={90}
        sizes={`(max-width: 768px) 100vw, ${CONSTRAINED_IMAGE_MAX}`}
      />
    </div>
  )
}

export function AquitaniaPrimitivesShowcase() {
  return (
    <div
      data-section="aquitania-primitives-showcase"
      className="mt-16 md:mt-24 space-y-16 md:space-y-24"
    >
      {PRIMITIVES.map(
        ({
          title,
          src,
          alt,
          width,
          height,
          fullBleed,
          alignRight,
          matchColorHeight,
        }) => (
          <section
            key={title}
            data-section={`aquitania-primitive-${title.toLowerCase()}`}
            className={cn(alignRight && 'flex w-full flex-col items-end')}
          >
            <AnimatedText
              variant="heading"
              as="h3"
              text={title}
              animationType="fadeIn"
              maxWidth="full"
              className={cn(
                PRIMITIVE_TITLE_CLASS,
                alignRight && 'text-right'
              )}
            />
            <div
              className={cn(
                'mt-8 w-full md:mt-10',
                alignRight && 'flex justify-end'
              )}
            >
              <PrimitiveImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                fullBleed={fullBleed}
                alignRight={alignRight}
                matchColorHeight={matchColorHeight}
              />
            </div>
          </section>
        )
      )}
    </div>
  )
}
