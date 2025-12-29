/**
 * className Utility - Merge Tailwind classes properly
 *
 * Combines clsx (conditional classes) with tailwind-merge (handles conflicts)
 *
 * Usage:
 *   cn('px-2 py-1', isActive && 'bg-blue-500')
 *   cn('p-4', props.className) // props.className overrides p-4 if needed
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
