import { motion } from 'framer-motion'
import { ProgressiveBlur } from '@/components/ui/ProgressiveBlur'
import { NavButton } from '@/components/ui/NavButton'

interface CaseStudyHeaderProps {
  onClose: () => void
}

export function CaseStudyHeader({ onClose }: CaseStudyHeaderProps) {
  return (
    <motion.header
      className="sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform' }}
    >
      <nav className="relative px-6 2xl:px-[140px] py-6 flex items-center justify-end max-w-[1920px] mx-auto">
        {/* Close Button - stays visible */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <NavButton onClick={onClose} className="-mr-3">
            Close
          </NavButton>
        </motion.div>
      </nav>
      {/* Progressive blur facing downward, behind progress bar */}
      <ProgressiveBlur
        side="bottom"
        height="100%"
        strength={12}
        steps={8}
        className="-z-10"
      />
    </motion.header>
  )
}
