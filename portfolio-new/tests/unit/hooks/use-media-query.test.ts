import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '@/hooks/use-media-query'

describe('useMediaQuery hook', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>
  let listeners: Map<string, (event: MediaQueryListEvent) => void>

  beforeEach(() => {
    listeners = new Map()

    mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.set(query, handler)
        }
      }),
      removeEventListener: vi.fn((event: string) => {
        if (event === 'change') {
          listeners.delete(query)
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

  it('updates when media query matches', () => {
    // Setup matchMedia to return true
    mockMatchMedia.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    // After useEffect runs, it should sync with the media query
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

    // Simulate media query change
    act(() => {
      if (currentHandler) {
        currentHandler({ matches: true } as MediaQueryListEvent)
      }
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

  it('handles different query strings', () => {
    renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'))
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')

    renderHook(() => useMediaQuery('(hover: hover)'))
    expect(mockMatchMedia).toHaveBeenCalledWith('(hover: hover)')
  })
})
