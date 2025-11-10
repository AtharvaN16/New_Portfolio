'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AnimatedTitleProps {
  /** The text to be animated. */
  text: string
  /** The type of animation to apply. */
  animationType?: 'fadeInUp' | 'fadeIn'
  /** Additional className for the h1 element. */
  className?: string
}

/**
 * A component that animates a title by staggering an effect for each word.
 * The animation triggers when the component scrolls into view.
 *
 * @param animationType - 'fadeInUp' (default) or 'fadeIn'.
 */
export function AnimatedTitle({
  text,
  animationType = 'fadeInUp',
  className,
}: AnimatedTitleProps) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const animationVariants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring' as const,
          damping: 12,
          stiffness: 100,
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    },
  }

  const wordVariants = animationVariants[animationType]

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'text-[2rem] font-bold leading-tight tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]',
        className
      )}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 && '\u00A0' /* Add a space */}
        </motion.span>
      ))}
    </motion.h1>
  )
}
