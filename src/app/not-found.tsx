/**
 * Next.js 404 Not Found Page
 */

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
