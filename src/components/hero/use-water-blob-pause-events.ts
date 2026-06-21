import { useEffect, type MutableRefObject } from 'react'
import {
  addAllOverlayCheckListeners,
  subscribeDialogClosed,
  subscribeHomePauseBlobs,
} from '@/lib/overlay-events'

interface UseWaterBlobPauseEventsParams {
  pausedRef: MutableRefObject<boolean>
  isPausedByDialogRef: MutableRefObject<boolean>
  isTabHiddenRef: MutableRefObject<boolean>
  resumeLoopRef: MutableRefObject<(() => void) | null>
}

export function useWaterBlobPauseEvents({
  pausedRef,
  isPausedByDialogRef,
  isTabHiddenRef,
  resumeLoopRef,
}: UseWaterBlobPauseEventsParams) {
  useEffect(() => {
    const shouldPauseLoop = () =>
      isPausedByDialogRef.current ||
      pausedRef.current ||
      isTabHiddenRef.current

    const tryResume = () => {
      if (!shouldPauseLoop()) {
        resumeLoopRef.current?.()
      }
    }

    const handlePause = () => {
      isPausedByDialogRef.current = true
    }

    const handleResume = () => {
      isPausedByDialogRef.current = false
      tryResume()
    }

    const handleHomePause = (isPaused: boolean) => {
      pausedRef.current = isPaused
      tryResume()
    }

    const handleVisibilityChange = () => {
      isTabHiddenRef.current = document.hidden
      if (!isTabHiddenRef.current) {
        tryResume()
      }
    }

    const removeOverlayCheckListeners = addAllOverlayCheckListeners(handlePause)
    const removeDialogClosedListener = subscribeDialogClosed(handleResume)
    const removeHomePauseListener = subscribeHomePauseBlobs(handleHomePause)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      removeOverlayCheckListeners()
      removeDialogClosedListener()
      removeHomePauseListener()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pausedRef, isPausedByDialogRef, isTabHiddenRef, resumeLoopRef])
}
