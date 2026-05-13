import { useEffect, useState } from 'react'
import {
  DASHBOARD_DELAY_MS,
  IDLE_RESET_MS,
  PORTAL_DELAY_MS,
} from '@/components/case-study/content/dcwp/diagramPhaseConstants'

export type DiagramPhase = 'idle' | 'portal' | 'dashboard'

/** Loops: idle → portal → dashboard → idle. Stops while `animationPaused`. */
export function useDiagramPhaseCycle(animationPaused: boolean) {
  const [phase, setPhase] = useState<DiagramPhase>('idle')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (animationPaused) {
      setPhase('idle')
    }
  }, [animationPaused])

  useEffect(() => {
    if (reducedMotion || animationPaused) return

    const ids: ReturnType<typeof setTimeout>[] = []

    const schedule = () => {
      ids.push(
        setTimeout(() => setPhase('portal'), PORTAL_DELAY_MS),
        setTimeout(
          () => setPhase('dashboard'),
          PORTAL_DELAY_MS + DASHBOARD_DELAY_MS,
        ),
        setTimeout(() => {
          setPhase('idle')
          schedule()
        }, PORTAL_DELAY_MS + DASHBOARD_DELAY_MS + IDLE_RESET_MS),
      )
    }

    schedule()
    return () => {
      ids.forEach(clearTimeout)
    }
  }, [reducedMotion, animationPaused])

  return { phase, reducedMotion }
}
