'use client'

import { m, useReducedMotion } from 'framer-motion'
import { useMemo, type ReactNode } from 'react'

const HANDWRITTEN_GOLD_CLASS =
  'text-[#A39458] dark:text-[color-mix(in_srgb,#A39458_72%,white)]'

type DesktopSlot = {
  region: 'left' | 'right' | 'bottom'
  className: string
  rotateDeg: number
}

const DESKTOP_SLOTS: DesktopSlot[] = [
  {
    region: 'left',
    className: 'left-[4%] top-[6%] max-w-[12.5rem]',
    rotateDeg: -6,
  },
  {
    region: 'right',
    className: 'right-[1%] top-[13%] max-w-[12rem]',
    rotateDeg: 3,
  },
  {
    region: 'left',
    className: 'left-[0%] top-[43%] max-w-[13rem]',
    rotateDeg: -4,
  },
  {
    region: 'right',
    className: 'right-[7%] top-[55%] max-w-[12.5rem]',
    rotateDeg: 5,
  },
  {
    region: 'bottom',
    className: 'left-[calc(24%+310px)] top-[30px] max-w-[14rem]',
    rotateDeg: -2,
  },
] as const

const PROBLEMS = [
  'Inconsistent typography and font sizes across every page',
  'Overcrowded layouts with no visual breathing room',
  'Interactive states that varied component to component',
  'Icon buttons and carousels with no accessible labels or focus states',
  'Low color contrast that failed WCAG AA standards',
] as const

function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash) || 1
}

function motionFor(index: number, seed: number): { delay: number } {
  const hash = hashString(`${seed}-${index}`)
  return {
    delay: index * 0.12 + (hash % 17) / 100,
  }
}

type CunardHandwrittenProblemsProps = {
  children?: ReactNode
}

export function CunardHandwrittenProblems({ children }: CunardHandwrittenProblemsProps) {
  const reduceMotion = useReducedMotion()
  const seed = useMemo(() => hashString(PROBLEMS.join('|')), [])

  function renderDesktopProblem(problem: string, index: number) {
    const slot = DESKTOP_SLOTS[index % DESKTOP_SLOTS.length]
    const motion = motionFor(index, seed)
    const style = {
      fontFamily: 'var(--font-mynerve)',
      transform: `rotate(${slot.rotateDeg}deg)`,
    } as const

    const className = `absolute text-[1.05rem] leading-tight xl:text-[1.18rem] ${HANDWRITTEN_GOLD_CLASS} ${slot.className}`

    if (reduceMotion) {
      return (
        <p key={problem} className={className} style={style}>
          {problem}
        </p>
      )
    }

    return (
      <m.p
        key={problem}
        className={className}
        style={style}
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-24px' }}
        transition={{
          type: 'tween',
          duration: 0.72,
          ease: [0.22, 0.61, 0.36, 1],
          delay: motion.delay,
        }}
      >
        {problem}
      </m.p>
    )
  }

  return (
    <div
      data-section="aquitania-handwritten-problems"
      className="mt-8 mb-10 w-full md:mt-10 md:mb-12"
      role="group"
      aria-label="Observed issues shown in handwritten style"
    >
      <div className="hidden lg:block">
        <div className="grid grid-cols-[minmax(150px,1fr)_minmax(0,700px)_minmax(150px,1fr)] gap-x-6">
          <div className="relative min-h-[920px]">
            {renderDesktopProblem(PROBLEMS[0], 0)}
            {renderDesktopProblem(PROBLEMS[2], 2)}
          </div>

          <div>
            {children}
            <div className="relative h-24">
              {renderDesktopProblem(PROBLEMS[4], 4)}
            </div>
          </div>

          <div className="relative min-h-[920px]">
            {renderDesktopProblem(PROBLEMS[1], 1)}
            {renderDesktopProblem(PROBLEMS[3], 3)}
          </div>
        </div>
      </div>

      <div className="hidden md:block lg:hidden">
        {children ? <div className="w-full">{children}</div> : null}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {PROBLEMS.map((problem, index) => (
            <p
              key={problem}
              className={`text-[1.05rem] leading-tight ${HANDWRITTEN_GOLD_CLASS}`}
              style={{
                fontFamily: 'var(--font-mynerve)',
                transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
              }}
            >
              {problem}
            </p>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        {children ? <div className="w-full">{children}</div> : null}
        <div className="mt-6 grid grid-cols-1 gap-4">
        {PROBLEMS.map((problem, index) => (
          <p
            key={problem}
            className={`text-[1.1rem] leading-tight ${HANDWRITTEN_GOLD_CLASS}`}
            style={{
              fontFamily: 'var(--font-mynerve)',
              transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
            }}
          >
            {problem}
          </p>
        ))}
        </div>
      </div>
    </div>
  )
}
