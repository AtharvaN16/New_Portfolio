'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/use-responsive'
import { ChecklistProcessFlow } from '@/components/case-study/content/dcwp/ChecklistProcessFlow'

/** Application process overview diagram (full-bleed). Used between “Understanding” and Case Studies hub. */
export function ChecklistProcessOverviewSection() {
  const isMdUp = useBreakpoint('md')
  const [desktopPaused, setDesktopPaused] = useState(false)
  const animationPaused = !isMdUp || desktopPaused

  return (
    <div
      data-section="nyc-dcwp-application-process-overview"
      className="space-y-4 pt-12 md:pt-16"
    >
      <div
        data-section="nyc-dcwp-application-process-overview-bleed"
        className="relative overflow-x-hidden"
        style={{ width: '100vw', left: '50%', transform: 'translateX(-50%)' }}
      >
        <h3 className="mb-2 px-6 md:px-10 xl:px-16 text-xl md:text-[28px] font-bold text-text-primary leading-snug">
          Application process overview
        </h3>
        <div
          data-section="nyc-dcwp-application-process-overview-diagram"
          className="px-6 md:px-10 xl:px-16"
        >
          <ChecklistProcessFlow animationPaused={animationPaused} />
        </div>
      </div>
      {isMdUp ? (
        <div
          data-section="nyc-dcwp-application-process-overview-controls"
          className="flex justify-center px-6 md:px-10 xl:px-16 mt-8 md:mt-10"
        >
          <button
            type="button"
            onClick={() => setDesktopPaused((p) => !p)}
            className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-text-primary transition-opacity hover:opacity-80"
            aria-pressed={desktopPaused}
            aria-label={
              desktopPaused
                ? 'Resume diagram animation'
                : 'Pause diagram animation'
            }
          >
            {desktopPaused ? 'Resume animation' : 'Pause animation'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
