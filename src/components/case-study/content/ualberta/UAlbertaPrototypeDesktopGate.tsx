'use client'

import dynamic from 'next/dynamic'
import { useLayoutEffect, useState } from 'react'
import type { UAlbertaPrototypeSlug } from '@/lib/data/ualberta-prototypes'
import {
  UALBERTA_PROTOTYPE_DESKTOP_MEDIA,
  UALBERTA_PROTOTYPE_DESKTOP_UNAVAILABLE_COPY,
} from '@/lib/ualberta-prototype-desktop'

const FRAME_GRADIENT =
  'linear-gradient(295deg, #225432 11.56%, #36A459 88.84%)'

const UAlbertaPrototypeRenderer = dynamic(
  () =>
    import('./UAlbertaPrototypeRenderer').then((mod) => ({
      default: mod.UAlbertaPrototypeRenderer,
    })),
  {
    ssr: false,
    loading: () => <PrototypeGateShell message="Loading prototype…" />,
  },
)

function PrototypeGateShell({
  message,
  children,
}: {
  message?: string
  children?: React.ReactNode
}) {
  return (
    <main
      className="flex min-h-dvh items-center justify-center px-6 py-12"
      style={{ background: FRAME_GRADIENT }}
    >
      {children ?? (
        <p className="text-sm font-medium text-white/80" role="status">
          {message}
        </p>
      )}
    </main>
  )
}

type ViewportState = 'pending' | 'desktop' | 'mobile'

interface UAlbertaPrototypeDesktopGateProps {
  slug: UAlbertaPrototypeSlug
}

export function UAlbertaPrototypeDesktopGate({ slug }: UAlbertaPrototypeDesktopGateProps) {
  const [viewport, setViewport] = useState<ViewportState>('pending')

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(UALBERTA_PROTOTYPE_DESKTOP_MEDIA)

    const sync = () => {
      setViewport(mediaQuery.matches ? 'desktop' : 'mobile')
    }

    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  if (viewport === 'pending') {
    return <PrototypeGateShell message="Loading prototype…" />
  }

  if (viewport === 'mobile') {
    return (
      <PrototypeGateShell>
        <div className="max-w-md space-y-3 text-center">
          <p className="text-lg font-semibold text-white">Desktop only</p>
          <p className="text-sm leading-normal text-white/80">
            {UALBERTA_PROTOTYPE_DESKTOP_UNAVAILABLE_COPY}
          </p>
        </div>
      </PrototypeGateShell>
    )
  }

  return <UAlbertaPrototypeRenderer slug={slug} variant="fullscreen" />
}
