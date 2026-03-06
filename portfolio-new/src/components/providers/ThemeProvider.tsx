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
  // Initialize theme from localStorage/system preference immediately
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'

    // Check localStorage first
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      return stored
    }

    // Fall back to system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return prefersDark ? 'dark' : 'light'
  })
  const [mounted, setMounted] = useState(false)

  // Set mounted flag after hydration
  useEffect(() => {
    // This setState is intentional for hydration detection
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Apply theme to DOM
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

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
