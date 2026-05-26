import { AbsoluteFill, Sequence } from 'remotion'
import { GradientBackground } from '../components/GradientBackground'
import { Beat1Open } from '../beats/Beat1Open'
import { Beat2Services } from '../beats/Beat2Services'
import { Beat3Hours } from '../beats/Beat3Hours'
import { Beat4Grid } from '../beats/Beat4Grid'
import {
  BEAT1_START, BEAT2_START, BEAT3_START, BEAT4_START,
} from '../constants'

export function UAlbertaReel() {
  return (
    <AbsoluteFill>
      {/* Gradient + shimmer runs for entire duration */}
      <GradientBackground />

      <Sequence from={BEAT1_START} durationInFrames={120}>
        <Beat1Open />
      </Sequence>

      <Sequence from={BEAT2_START} durationInFrames={270}>
        <Beat2Services />
      </Sequence>

      <Sequence from={BEAT3_START} durationInFrames={150}>
        <Beat3Hours />
      </Sequence>

      <Sequence from={BEAT4_START} durationInFrames={180}>
        <Beat4Grid />
      </Sequence>
    </AbsoluteFill>
  )
}
