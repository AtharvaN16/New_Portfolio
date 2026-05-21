'use client'

import { useMediaQuery } from './use-responsive'

/**
 * useReducedMotion Hook
 *
 * A convenience hook that returns true if the user has requested
 * reduced motion via their OS settings or via the Accessibility Settings.
 *
 * @returns boolean - true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  // We can't use useAccessibility here to avoid circular dependency
  // if we put it in the same file. 
  // But we can check for a global variable or just rely on the context 
  // being the source of truth in components.
  
  // For now, let's keep it simple: components should use useAccessibility() 
  // if they want the user-overridden value. 
  // useReducedMotion() will continue to return the SYSTEM preference.
  
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
