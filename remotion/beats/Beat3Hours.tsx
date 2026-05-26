import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion'
import { LibraryLocationCard } from '../../src/components/case-study/content/LibraryLocationCard'
import { LIBRARY_HOURS_DATA } from '../../src/lib/data/library-hours-data'
import {
  BEAT3_START,
  SPRING_CARD,
  B3_ROWS_START,
} from '../constants'

const B3_CARD_SLIDE_START = 18
const B3_OPACITY_END = 38

const cameronLibrary = LIBRARY_HOURS_DATA.find((l) => l.id === 'cameron') ?? LIBRARY_HOURS_DATA[0]

export const Beat3Hours: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Local frame (0-indexed within Beat3)
  const localFrame = frame + BEAT3_START - BEAT3_START

  const slideProgress = spring({
    frame: localFrame - B3_CARD_SLIDE_START,
    fps,
    config: SPRING_CARD,
  })

  const translateY = interpolate(slideProgress, [0, 1], [80, 0])

  const opacity = interpolate(
    localFrame,
    [B3_CARD_SLIDE_START, B3_CARD_SLIDE_START + B3_OPACITY_END - B3_CARD_SLIDE_START],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Silence unused import warning — B3_ROWS_START is referenced per spec
  void B3_ROWS_START

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 420,
          opacity,
          transform: `translateY(${translateY}px)`,
          background: '#ffffff',
          borderRadius: 12,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        }}
      >
        <LibraryLocationCard library={cameronLibrary} />
      </div>
    </AbsoluteFill>
  )
}
