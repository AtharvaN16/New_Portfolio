'use client'

/**
 * Theme Provider - Manages dark/light mode
 *
 * Features:
 * - Respects system preference by default
 * - Persists user choice to localStorage
 * - No flash of wrong theme on load
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react'

// Add types for View Transitions API
declare global {
  interface Document {
    startViewTransition(callback: () => void): void
  }
}

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme: on the server default to 'dark'; on the client read the
  // value that ThemeScript already applied to <html data-theme="..."> so that
  // the React state matches what the browser is already showing.
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'

    // ThemeScript runs before React and sets data-theme — read it to stay consistent
    const dataTheme = document.documentElement.getAttribute(
      'data-theme'
    ) as Theme | null
    if (dataTheme === 'light' || dataTheme === 'dark') return dataTheme

    // Fallback (shouldn't normally reach here)
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') return stored

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // Apply theme to DOM when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'

        // Fallback for browsers that don't support View Transitions API
        if (!document.startViewTransition) {
          setTheme(newTheme)
          return
        }

        // Gentle cross-fade animation using View Transitions API
        document.startViewTransition(() => {
          setTheme(newTheme)
        })
      },
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
