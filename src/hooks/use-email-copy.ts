/**
 * useEmailCopy Hook
 *
 * Handles copying email to clipboard with user feedback
 */

import { useState, useCallback } from 'react'

const FEEDBACK_TIMEOUT_MS = 2000

interface UseEmailCopyResult {
  /** Whether email was just copied */
  isCopied: boolean
  /** Function to copy email to clipboard */
  copyEmail: (email: string) => Promise<void>
  /** Error message if copy failed */
  error: string | null
}

/**
 * Hook to handle email copying with feedback
 *
 * @returns Methods and state for email copying
 *
 * @example
 * ```tsx
 * function EmailButton() {
 *   const { isCopied, copyEmail, error } = useEmailCopy()
 *
 *   return (
 *     <button onClick={() => copyEmail('user@example.com')}>
 *       {isCopied ? 'Copied!' : 'Copy Email'}
 *       {error && <span>Error: {error}</span>}
 *     </button>
 *   )
 * }
 * ```
 */
export function useEmailCopy(): UseEmailCopyResult {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copyEmail = useCallback(async (email: string) => {
    // Clear any previous error
    setError(null)

    try {
      // Check if clipboard API is available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported')
      }

      await navigator.clipboard.writeText(email)
      setIsCopied(true)

      // Reset copied state after timeout
      setTimeout(() => {
        setIsCopied(false)
      }, FEEDBACK_TIMEOUT_MS)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to copy email'
      setError(errorMessage)

      // Clear error after timeout
      setTimeout(() => {
        setError(null)
      }, FEEDBACK_TIMEOUT_MS)
    }
  }, [])

  return {
    isCopied,
    copyEmail,
    error,
  }
}
