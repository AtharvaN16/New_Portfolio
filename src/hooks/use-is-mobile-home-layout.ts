'use client'

import { useLayoutEffect, useState } from 'react'

const MOBILE_HOME_QUERY = '(max-width: 767px), (pointer: coarse)'

export function getIsMobileHomeLayout(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_HOME_QUERY).matches
}

export interface MobileHomeLayoutState {
  isReady: boolean
  isMobileHome: boolean
}

/**
 * True when the homepage should use native-flow sticky-stack layout
 * instead of the fixed-layer scroll transform machine.
 */
export function useMobileHomeLayout(): MobileHomeLayoutState {
  const [state, setState] = useState<MobileHomeLayoutState>({
    isReady: false,
    isMobileHome: false,
  })

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_HOME_QUERY)

    const sync = () => {
      setState({ isReady: true, isMobileHome: mediaQuery.matches })
    }

    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  return state
}

/** @deprecated Use useMobileHomeLayout */
export function useIsMobileHomeLayout(): boolean {
  return useMobileHomeLayout().isMobileHome
}

/** @deprecated Use useMobileHomeLayout */
export function useIsMobileHomeLayoutReady(): boolean {
  return useMobileHomeLayout().isReady
}
