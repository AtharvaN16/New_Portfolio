'use client'

/**
 * Next.js Error Page
 * Handles errors that occur in page components
 */

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console
    console.error('Page error:', error)

    // TODO: Send to error tracking service
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Oops!</h1>
          <p className="text-xl text-text-secondary">Something went wrong</p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-lg bg-surface p-4 text-left">
            <p className="text-sm font-mono text-error">{error.message}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-surface"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
