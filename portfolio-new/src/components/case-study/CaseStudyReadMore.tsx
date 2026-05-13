'use client'

import { m, AnimatePresence } from 'framer-motion'

interface CaseStudyReadMoreProps {
  readTime: string
  isContentRevealed: boolean
  onToggleContent: () => void
  children: React.ReactNode
}

export function CaseStudyReadMore({
  readTime,
  isContentRevealed,
  onToggleContent,
  children,
}: CaseStudyReadMoreProps) {
  return (
    <>
      <div className="mt-[100px] flex flex-col items-center gap-2">
        <span
          className="text-sm font-normal"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          {readTime}
        </span>
        <button
          onClick={onToggleContent}
          className="group inline-flex items-center gap-2 text-base md:text-[18px] font-normal text-text-primary hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
        >
          <span className="relative inline-block">
            {isContentRevealed ? 'Hide case study' : 'Read full case study'}
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full" />
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 transition-transform duration-200"
            style={{
              transform: isContentRevealed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isContentRevealed && (
          <m.div
            className="mt-[160px] md:mt-[224px] lg:mt-[288px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
