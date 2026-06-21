import { useEffect } from 'react'
import { AUTO_CYCLE_HOLD_MS } from './waterBlob.types'

function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false
  return (
    !window.matchMedia('(pointer: coarse)').matches && window.innerWidth >= 768
  )
}

interface UseWaterBlobAutoCycleParams {
  enabled: boolean
  paused: boolean
  onAdvance: () => void
  holdMs?: number
}

/** Sequentially advances palette on desktop after a hold period. */
export function useWaterBlobAutoCycle({
  enabled,
  paused,
  onAdvance,
  holdMs = AUTO_CYCLE_HOLD_MS,
}: UseWaterBlobAutoCycleParams) {
  useEffect(() => {
    if (!enabled || paused || !isDesktopViewport()) return

    const id = window.setInterval(onAdvance, holdMs)
    return () => window.clearInterval(id)
  }, [enabled, paused, onAdvance, holdMs])
}
