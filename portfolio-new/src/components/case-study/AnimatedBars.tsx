'use client'

import { m } from 'framer-motion'

interface AnimatedBarsProps {
  total: number
  filled: number
  filledColor?: string
}

export function AnimatedBars({ total, filled, filledColor }: AnimatedBarsProps) {
  const fill = filledColor ?? 'rgb(var(--color-info))'
  return (
    <div className="flex items-end gap-[14px]">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className="relative w-[14px] h-[144px]"
          style={{ backgroundColor: 'rgb(var(--color-text-color20))' }}
        >
          {index < filled && (
            <m.div
              className="absolute inset-0"
              style={{
                backgroundColor: fill,
                transformOrigin: 'bottom',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: 'easeOut',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
