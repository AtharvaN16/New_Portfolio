import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  HERO_F1_AUDIO_PEAK_MS,
  HERO_F1_ENTRY_DELAY_MS,
  HERO_F1_SOUND_ATTEMPT_DELAYS_MS,
  HERO_F1_SOUND_FALLBACK_DEADLINE_MS,
  HERO_F1_SOUND_PLAY_DELAY_MS,
  HERO_F1_SOUND_SRC,
  HERO_F1_SOUND_VOLUME,
  HERO_F1_VISUAL_CREST_AFTER_ENTRY_MS,
  useHeroF1Sound,
} from '@/components/hero/use-hero-f1-sound'

function HookHarness() {
  useHeroF1Sound()
  return null
}

describe('useHeroF1Sound', () => {
  let originalAudio: typeof Audio
  let play: ReturnType<typeof vi.fn>
  const createdAudio: HTMLAudioElement[] = []

  beforeEach(() => {
    vi.useFakeTimers()
    originalAudio = window.Audio
    play = vi.fn(() => Promise.resolve())
    createdAudio.length = 0

    window.Audio = vi.fn(function AudioMock(src?: string) {
      const audio = document.createElement('audio') as HTMLAudioElement
      Object.defineProperty(audio, 'play', { value: play })
      Object.defineProperty(audio, 'pause', { value: vi.fn() })
      Object.defineProperty(audio, 'load', { value: vi.fn() })
      Object.defineProperty(audio, 'currentTime', {
        value: 0,
        writable: true,
      })
      if (src) audio.src = src
      createdAudio.push(audio)
      return audio
    }) as unknown as typeof Audio

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  afterEach(() => {
    window.Audio = originalAudio
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('aligns the whoosh peak with the F1 visual crest', () => {
    expect(HERO_F1_SOUND_PLAY_DELAY_MS + HERO_F1_AUDIO_PEAK_MS).toBe(
      HERO_F1_ENTRY_DELAY_MS + HERO_F1_VISUAL_CREST_AFTER_ENTRY_MS
    )
  })

  it('schedules best-effort desktop playback with conservative volume', async () => {
    render(<HookHarness />)

    expect(createdAudio[0].src).toContain(HERO_F1_SOUND_SRC)
    expect(createdAudio[0].preload).toBe('auto')
    expect(createdAudio[0].volume).toBe(HERO_F1_SOUND_VOLUME)

    await vi.advanceTimersByTimeAsync(HERO_F1_SOUND_PLAY_DELAY_MS)

    expect(play).toHaveBeenCalledTimes(1)
  })

  it('retries during the F1 window when the first autoplay attempt is blocked', async () => {
    play
      .mockRejectedValueOnce(new DOMException('Blocked', 'NotAllowedError'))
      .mockResolvedValueOnce(undefined)

    render(<HookHarness />)

    await vi.advanceTimersByTimeAsync(HERO_F1_SOUND_ATTEMPT_DELAYS_MS[0])
    expect(play).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(
      HERO_F1_SOUND_ATTEMPT_DELAYS_MS[1] - HERO_F1_SOUND_ATTEMPT_DELAYS_MS[0]
    )

    expect(play).toHaveBeenCalledTimes(2)
  })

  it('stops retrying after a playback attempt succeeds', async () => {
    render(<HookHarness />)

    await vi.runAllTimersAsync()

    expect(play).toHaveBeenCalledTimes(1)
  })

  it('uses a direct gesture fallback during the F1 sync window', async () => {
    play
      .mockRejectedValueOnce(new DOMException('Blocked', 'NotAllowedError'))
      .mockResolvedValueOnce(undefined)

    render(<HookHarness />)

    await vi.advanceTimersByTimeAsync(HERO_F1_SOUND_ATTEMPT_DELAYS_MS[0])
    document.dispatchEvent(new PointerEvent('pointerdown'))

    expect(play).toHaveBeenCalledTimes(2)
  })

  it('does not play a late gesture fallback after the F1 sync window', async () => {
    play.mockRejectedValue(new DOMException('Blocked', 'NotAllowedError'))

    render(<HookHarness />)

    await vi.advanceTimersByTimeAsync(HERO_F1_SOUND_FALLBACK_DEADLINE_MS + 1)
    document.dispatchEvent(new PointerEvent('pointerdown'))

    expect(play).toHaveBeenCalledTimes(HERO_F1_SOUND_ATTEMPT_DELAYS_MS.length)
  })

  it('skips sound on coarse pointer devices', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(pointer: coarse)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(<HookHarness />)
    await vi.runAllTimersAsync()

    expect(play).not.toHaveBeenCalled()
  })
})
