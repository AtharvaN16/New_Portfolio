'use client'

import { m, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h) || 1
}

function mulberry32(seed: number) {
  let state = seed
  return function next() {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle<T>(array: T[], seed: number): T[] {
  const out = [...array]
  const rand = mulberry32(seed)
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

type ScatterSlot = {
  leftPct: number
  topPct: number
  widthRem: number
  align: 'left' | 'center' | 'right'
}

const SCATTER_SLOTS: ScatterSlot[] = [
  { leftPct: 3, topPct: 7, widthRem: 12, align: 'left' },
  { leftPct: 47, topPct: 20, widthRem: 15, align: 'left' },
  { leftPct: 18, topPct: 45, widthRem: 11, align: 'left' },
  { leftPct: 61, topPct: 55, widthRem: 12, align: 'left' },
  { leftPct: 5, topPct: 74, widthRem: 13, align: 'left' },
  { leftPct: 52, topPct: 86, widthRem: 14, align: 'left' },
] as const

function scatterSlot(index: number, seed: number): ScatterSlot {
  const slot = SCATTER_SLOTS[index % SCATTER_SLOTS.length]
  const rand = mulberry32(seed + index * 7651 + 89)
  return {
    ...slot,
    leftPct: slot.leftPct + (rand() - 0.5) * 2.6,
    topPct: slot.topPct + (rand() - 0.5) * 2.4,
  }
}

function wordMotionProps(
  index: number,
  seed: number
): { rotate: number; delay: number } {
  const rand = mulberry32(seed + index * 9973 + 419)
  const rotate = (rand() - 0.5) * 11
  const delay = index * 0.14 + rand() * 0.18
  return { rotate, delay }
}

type AloInsightHandwrittenKeywordsProps = {
  keywords: string[]
}

export function AloInsightHandwrittenKeywords({ keywords }: AloInsightHandwrittenKeywordsProps) {
  const reduceMotion = useReducedMotion()
  const seed = useMemo(() => hashString(keywords.join('|')), [keywords])
  const ordered = useMemo(() => seededShuffle(keywords, seed), [keywords, seed])

  if (keywords.length === 0) {
    return null
  }

  return (
    <div
      className="relative mt-14 min-h-[250px] w-full max-w-[min(100%,30rem)] md:mt-[4.5rem] md:min-h-[310px]"
      role="group"
      aria-label="Related search keywords in informal layout"
    >
      {ordered.map((word, index) => {
        const slot = scatterSlot(index, seed)
        const p = wordMotionProps(index, seed)
        const outerStyle = {
          fontFamily: 'var(--font-mynerve)',
          left: `${slot.leftPct}%`,
          top: `${slot.topPct}%`,
          maxWidth: `${slot.widthRem}rem`,
          textAlign: slot.align,
          transform: `rotate(${p.rotate}deg)`,
          zIndex: 1 + (index % 5),
        } as const

        if (reduceMotion) {
          return (
            <span
              data-scatter-keyword
              key={`${word}-${index}`}
              className="absolute px-1 text-lg leading-tight text-[rgb(var(--color-alo-data-accent))] md:text-2xl"
              style={outerStyle}
            >
              {word}
            </span>
          )
        }

        return (
          <span
            data-scatter-keyword
            key={`${word}-${index}`}
            className="absolute px-1"
            style={outerStyle}
          >
            <m.span
              className="inline-block text-lg leading-tight text-[rgb(var(--color-alo-data-accent))] md:text-2xl"
              initial={{ opacity: 0, scale: 0.88 }}
              transition={{
                type: 'tween',
                duration: 0.72,
                ease: [0.22, 0.61, 0.36, 1],
                delay: p.delay,
              }}
              viewport={{ once: true, margin: '-24px' }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              {word}
            </m.span>
          </span>
        )
      })}
    </div>
  )
}
