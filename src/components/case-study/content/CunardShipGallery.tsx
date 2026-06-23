'use client'

import Image from 'next/image'
import { m, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

const SHIPS = [
  {
    src: '/images/case-studies/aquitania-design-system/rms-carpathia.avif',
    alt: 'RMS Carpathia sailing at sea',
    name: 'RMS Carpathia',
    width: 800,
    height: 414,
    displayWidth: 298,
    staggerClass: 'md:translate-y-10',
  },
  {
    src: '/images/case-studies/aquitania-design-system/rms-aquitania.avif',
    alt: 'RMS Aquitania ocean liner',
    name: 'RMS Aquitania',
    width: 800,
    height: 582,
    displayWidth: 284,
    staggerClass: 'md:-translate-y-2',
  },
  {
    src: '/images/case-studies/aquitania-design-system/queen-mary-new-york.avif',
    alt: 'RMS Queen Mary with the New York skyline',
    name: 'RMS Queen Mary',
    width: 800,
    height: 504,
    displayWidth: 281,
    staggerClass: 'md:translate-y-5',
  },
] as const

const galleryVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.05 },
  },
}

const shipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function CunardShipGallery() {
  return (
    <m.div
      data-section="aquitania-ship-gallery"
      className="mt-10 md:mt-12 flex flex-col gap-12 pb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:gap-8"
      variants={galleryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {SHIPS.map((ship) => (
        <m.figure
          key={ship.name}
          tabIndex={0}
          variants={shipVariants}
          className={cn(
            'group relative w-full outline-none sm:w-auto',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm',
            ship.staggerClass
          )}
          style={{ maxWidth: ship.displayWidth }}
        >
          <Image
            src={ship.src}
            alt={ship.alt}
            width={ship.width}
            height={ship.height}
            quality={90}
            className="h-auto w-full"
            sizes={`(max-width: 640px) 90vw, ${ship.displayWidth}px`}
          />
          <figcaption
            className={cn(
              'pointer-events-none absolute top-full right-0 left-0 mt-3 text-center text-sm font-medium text-text-primary',
              'opacity-0 transition-opacity duration-200',
              'group-hover:opacity-100 group-focus-within:opacity-100'
            )}
          >
            {ship.name}
          </figcaption>
        </m.figure>
      ))}
    </m.div>
  )
}
