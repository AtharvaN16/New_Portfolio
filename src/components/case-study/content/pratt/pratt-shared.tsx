'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

export function Accordion({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
      >
        <div>
          <span className="block text-base md:text-lg font-bold text-text-primary">
            {title}
          </span>
          {subtitle && (
            <span
              className="block text-sm md:text-[16px] font-normal mt-1"
              style={{ color: 'rgb(var(--color-text-tertiary))' }}
            >
              {subtitle}
            </span>
          )}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-10">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SectionDivider() {
  return (
    <div
      className="border-t my-24 md:my-32"
      style={{ borderColor: 'rgb(var(--color-text-color10))' }}
    />
  )
}

export function OpportunityAreas({
  problems,
  opportunities,
}: {
  problems: string[]
  opportunities: string[]
}) {
  return (
    <div className="mt-10 md:mt-12 rounded-xl p-6 md:p-8 bg-[rgb(10,10,10)] dark:bg-surface-elevated">
      <h4 className="text-base md:text-[18px] font-bold text-white mb-6 md:mb-8">
        Opportunity areas in the current journey
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div
            className="inline-block px-3 py-1.5 rounded text-sm font-bold text-white mb-4"
            style={{ backgroundColor: 'rgb(80 22 14)' }}
          >
            Problems
          </div>
          <ul className="space-y-3">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-white/50 flex-shrink-0" />
                <span className="text-sm md:text-[16px] text-white/80 leading-normal">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="inline-block px-3 py-1.5 rounded text-sm font-bold text-white mb-4"
            style={{ backgroundColor: 'rgb(18 45 28)' }}
          >
            Opportunity
          </div>
          <ul className="space-y-3">
            {opportunities.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-white/50 flex-shrink-0" />
                <span className="text-sm md:text-[16px] text-white/80 leading-normal">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
