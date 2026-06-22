'use client'

import { HomeDesktop } from '@/components/home/HomeDesktop'
import { HomeMobile } from '@/components/home/HomeMobile'
import { useMobileHomeLayout } from '@/hooks/use-is-mobile-home-layout'

/**
 * Home Page — branches by device:
 * - Mobile/touch: native-flow sticky stack (HomeMobile)
 * - Desktop: fixed-layer scroll reveal (HomeDesktop)
 */
export default function Home() {
  const { isReady, isMobileHome } = useMobileHomeLayout()

  if (!isReady) {
    return <div className="min-h-[100svh] bg-background" aria-hidden />
  }

  return isMobileHome ? <HomeMobile /> : <HomeDesktop />
}
