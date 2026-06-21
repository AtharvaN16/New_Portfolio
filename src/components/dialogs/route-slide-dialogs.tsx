'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import {
  RouteSlideDialog,
  type RouteOverlayDialogId,
} from './RouteSlideDialog'

const pageLoadingFallback = () => (
  <div className="min-h-screen bg-background" />
)

function createRouteDialog(
  dialogId: RouteOverlayDialogId,
  importPage: () => Promise<{ default: ComponentType }>,
  options?: { scrollable?: boolean }
) {
  const Page = dynamic(importPage, {
    ssr: false,
    loading: pageLoadingFallback,
  })

  function RouteDialog() {
    return (
      <RouteSlideDialog
        dialogId={dialogId}
        Page={Page}
        preloadPage={importPage}
        scrollable={options?.scrollable}
      />
    )
  }

  RouteDialog.displayName = `${dialogId[0].toUpperCase()}${dialogId.slice(1)}Dialog`

  return RouteDialog
}

export const WorkDialog = createRouteDialog(
  'work',
  () => import('@/app/work/page'),
  { scrollable: true }
)

export const ExplorationsDialog = createRouteDialog('explorations', () =>
  import('@/app/explorations/page')
)

export const AboutDialog = createRouteDialog('about', () =>
  import('@/app/about/page')
)

export const WritingsDialog = createRouteDialog('writings', () =>
  import('@/app/writings/page')
)
