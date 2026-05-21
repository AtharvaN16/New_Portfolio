import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import {
  BREAKPOINTS,
  useBreakpoint,
  useBreakpoints,
  useMediaQuery,
} from '@/hooks/use-responsive'

describe('useMediaQuery', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>
  let changeHandlers: Map<string, (event: MediaQueryListEvent) => void>

  beforeEach(() => {
    changeHandlers = new Map()

    mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          changeHandlers.set(query, handler)
        }
      }),
      removeEventListener: vi.fn((event: string) => {
        if (event === 'change') {
          changeHandlers.delete(query)
        }
      }),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  it('returns false initially (SSR-safe default)', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('calls matchMedia with the correct query', () => {
    renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 768px)')
  })

  it('syncs with the media query on mount', () => {
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('responds to media query changes', () => {
    let currentHandler: ((event: MediaQueryListEvent) => void) | null = null

    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          currentHandler = handler
        }
      }),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    act(() => {
      currentHandler?.({ matches: true } as MediaQueryListEvent)
    })

    expect(result.current).toBe(true)
  })

  it('cleans up event listener on unmount', () => {
    const removeEventListener = vi.fn()

    mockMatchMedia.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener,
    }))

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    unmount()

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})

describe('useBreakpoint', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === `(min-width: ${BREAKPOINTS.lg}px)`,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  })

  it('queries Tailwind min-width breakpoints', () => {
    renderHook(() => useBreakpoint('lg'))
    expect(window.matchMedia).toHaveBeenCalledWith(`(min-width: ${BREAKPOINTS.lg}px)`)
  })

  it('returns true when the breakpoint matches', () => {
    const { result } = renderHook(() => useBreakpoint('lg'))
    expect(result.current).toBe(true)
  })
})

describe('useBreakpoints', () => {
  function mockBreakpointMatches(matchesByQuery: Record<string, boolean>) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: matchesByQuery[query] ?? false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    })
  }

  it('derives mobile, tablet, and desktop flags from raw breakpoints', () => {
    mockBreakpointMatches({
      [`(min-width: ${BREAKPOINTS.sm}px)`]: false,
      [`(min-width: ${BREAKPOINTS.md}px)`]: false,
      [`(min-width: ${BREAKPOINTS.lg}px)`]: false,
      [`(min-width: ${BREAKPOINTS.xl}px)`]: false,
      [`(min-width: ${BREAKPOINTS['2xl']}px)`]: false,
    })

    const { result } = renderHook(() => useBreakpoints())

    expect(result.current).toMatchObject({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
      isSm: false,
      isMd: false,
      isLg: false,
    })
  })

  it('marks tablet when sm matches but lg does not', () => {
    mockBreakpointMatches({
      [`(min-width: ${BREAKPOINTS.sm}px)`]: true,
      [`(min-width: ${BREAKPOINTS.md}px)`]: true,
      [`(min-width: ${BREAKPOINTS.lg}px)`]: false,
      [`(min-width: ${BREAKPOINTS.xl}px)`]: false,
      [`(min-width: ${BREAKPOINTS['2xl']}px)`]: false,
    })

    const { result } = renderHook(() => useBreakpoints())

    expect(result.current).toMatchObject({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
      isSm: true,
      isLg: false,
    })
  })

  it('marks desktop when lg matches', () => {
    mockBreakpointMatches({
      [`(min-width: ${BREAKPOINTS.sm}px)`]: true,
      [`(min-width: ${BREAKPOINTS.md}px)`]: true,
      [`(min-width: ${BREAKPOINTS.lg}px)`]: true,
      [`(min-width: ${BREAKPOINTS.xl}px)`]: false,
      [`(min-width: ${BREAKPOINTS['2xl']}px)`]: false,
    })

    const { result } = renderHook(() => useBreakpoints())

    expect(result.current).toMatchObject({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLg: true,
    })
  })
})
