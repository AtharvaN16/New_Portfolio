import { Composition } from 'remotion'
import { UAlbertaReel } from './compositions/UAlbertaReel'
import { TOTAL_FRAMES, FPS } from './constants'

export function Root() {
  return (
    <Composition
      id="UAlbertaReel"
      component={UAlbertaReel}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  )
}
