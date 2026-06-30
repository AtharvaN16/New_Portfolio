import { m, type MotionValue } from 'framer-motion'
import { ProgressiveBlur } from '@/components/ui/ProgressiveBlur'
import { NavButton } from '@/components/ui/NavButton'

interface CaseStudyHeaderProps {
  onClose: () => void
  scrollYProgress?: MotionValue<number>
}

export function CaseStudyHeader({ onClose, scrollYProgress }: CaseStudyHeaderProps) {
  return (
    <m.header
      className="sticky top-0 z-50 pb-8"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform' }}
    >
      {scrollYProgress ? (
        <m.div
          className="relative z-10 h-[5px] w-full origin-left bg-[var(--cs-pop-light)] dark:bg-[var(--cs-pop-dark)]"
          style={{
            scaleX: scrollYProgress,
            willChange: 'transform',
          }}
        />
      ) : null}
      <ProgressiveBlur
        side="bottom"
        height="100%"
        strength={12}
        steps={8}
        className="-z-10"
      />
      <nav className="relative z-10 px-6 2xl:px-[140px] py-6 flex items-center justify-end max-w-[1920px] mx-auto">
        {/* Close Button - stays visible */}
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <NavButton id="case-study-dialog-close" onClick={onClose} className="-mr-3">
            Close
          </NavButton>
        </m.div>
      </nav>
    </m.header>
  )
}
