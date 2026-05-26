import React from 'react'
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion'
import { LibraryLocationCard } from '../../src/components/case-study/content/LibraryLocationCard'
import { LIBRARY_HOURS_DATA } from '../../src/lib/data/library-hours-data'
import {
  SPRING_CARD,
} from '../constants'

const B3_CARD_SLIDE_START = 18
const B3_OPACITY_END = 38

const cameronLibrary = LIBRARY_HOURS_DATA.find((l) => l.id === 'cameron') ?? LIBRARY_HOURS_DATA[0]

export const Beat3Hours: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const slideProgress = spring({
    frame: frame - B3_CARD_SLIDE_START,
    fps,
    config: SPRING_CARD,
  })

  const translateY = interpolate(slideProgress, [0, 1], [80, 0])

  const opacity = interpolate(
    frame,
    [B3_CARD_SLIDE_START, B3_OPACITY_END],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  // Exit animation: card slides down and fades out in final ~12 frames (137–149)
  const exitY = interpolate(frame, [137, 149], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const exitOpacity = interpolate(frame, [137, 149], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

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
          opacity: exitOpacity * opacity,
          transform: `translateY(${translateY + exitY}px)`,
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
