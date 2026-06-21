import {
  useRef,
  useEffect,
  useState,
  type Dispatch,
  type MutableRefObject,
  type RefObject,
  type SetStateAction,
} from 'react'
import {
  setupWebGL,
  createAnimationLoop,
  lerpColors,
} from './waterBlob.helpers'
import type { Colors } from './waterBlob.types'
import { dispatchHeroFlashHead, clearHeroFlashHead } from './hero-flash-head'

interface UseWaterBlobAnimationParams {
  canvasRef: RefObject<HTMLCanvasElement | null>
  displayColorsRef: MutableRefObject<Colors | null>
  targetColorsRef: MutableRefObject<Colors | null>
  pausedRef: MutableRefObject<boolean>
  animationSpeedRef: MutableRefObject<number>
  isPausedByDialogRef: MutableRefObject<boolean>
  isTabHiddenRef: MutableRefObject<boolean>
  resumeLoopRef: MutableRefObject<(() => void) | null>
  paletteLerpSpeed: number
  entryDelay: number
  isGhost: boolean
  isQuick: boolean
  prefersReducedMotion: boolean
  pauseWebGL: boolean
  saveData: boolean
  setHasWebGL: Dispatch<SetStateAction<boolean>>
}

export function useWaterBlobAnimation({
  canvasRef,
  displayColorsRef,
  targetColorsRef,
  pausedRef,
  animationSpeedRef,
  isPausedByDialogRef,
  isTabHiddenRef,
  resumeLoopRef,
  paletteLerpSpeed,
  entryDelay,
  isGhost,
  isQuick,
  prefersReducedMotion,
  pauseWebGL,
  saveData,
  setHasWebGL,
}: UseWaterBlobAnimationParams) {
  const [retryKey, setRetryKey] = useState(0)
  const webglInitializedRef = useRef(false)
  const initialMountRef = useRef(true)
  const yOffsetRef = useRef(-1.5)
  const revealPhaseRef = useRef(0)
  const ambientRef = useRef(0)
  const trailRef = useRef(0)

  // WebGL init runs once per mount (plus retry / a11y toggles).
  // Theme changes are handled by useWaterBlobColorRefs → lerpColors → per-frame
  // uniform updates in createAnimationLoop — no program rebuild needed.
  useEffect(() => {
    if (
      !canvasRef.current ||
      !displayColorsRef.current ||
      !targetColorsRef.current ||
      prefersReducedMotion ||
      pauseWebGL ||
      saveData
    ) {
      return
    }

    const canvas = canvasRef.current

    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      console.warn(
        'WaterBlob: Canvas has zero dimensions, deferring initialization'
      )
      const retryTimeout = setTimeout(() => {
        if (!webglInitializedRef.current && canvasRef.current) {
          const newRect = canvasRef.current.getBoundingClientRect()
          if (newRect.width > 0 && newRect.height > 0) {
            setRetryKey((prev) => prev + 1)
          }
        }
      }, 100)
      return () => clearTimeout(retryTimeout)
    }

    const gl = canvas.getContext('webgl')

    if (!gl) {
      console.warn('WebGL not supported, showing fallback gradient')
      setHasWebGL(false)
      return
    }

    const isMobile =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const display = displayColorsRef.current!
    const target = targetColorsRef.current!
    const programInfo = setupWebGL(gl, display, isMobile)
    if (!programInfo) {
      setHasWebGL(false)
      return
    }

    webglInitializedRef.current = true

    if (initialMountRef.current) {
      yOffsetRef.current = -1.5
      revealPhaseRef.current = isMobile && !isGhost ? 1 : 0
      ambientRef.current = isMobile && !isGhost ? 0.15 : 0
      trailRef.current = 0
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    }

    const animate = createAnimationLoop(
      gl,
      programInfo,
      display,
      () => yOffsetRef.current,
      isMobile,
      () => revealPhaseRef.current,
      () => ambientRef.current,
      () => trailRef.current
    )

    let animationId = 0
    let startTimeoutId: ReturnType<typeof setTimeout>
    let accumulatedTime = 0
    let lastTimestamp: number | null = null
    let ghostOpacity = 1

    const shouldPauseLoop = () =>
      isPausedByDialogRef.current || pausedRef.current || isTabHiddenRef.current

    const loop = (timestamp: number) => {
      if (shouldPauseLoop()) {
        lastTimestamp = null
        animationId = 0
        return
      }

      if (lastTimestamp !== null) {
        accumulatedTime +=
          ((timestamp - lastTimestamp) / 1000) * animationSpeedRef.current
      }
      lastTimestamp = timestamp

      const riseRate = isQuick ? 0.06 : 0.035
      if (yOffsetRef.current < -0.001) {
        yOffsetRef.current += (0 - yOffsetRef.current) * riseRate
      } else {
        yOffsetRef.current = 0
      }

      if (isQuick) {
        ambientRef.current += (1.0 - ambientRef.current) * 0.08
      } else if (!isGhost) {
        ambientRef.current += (0.15 - ambientRef.current) * 0.02
      }

      if (isGhost) {
        trailRef.current += (1.0 - trailRef.current) * 0.12
      }

      if (isGhost && isQuick) {
        dispatchHeroFlashHead(yOffsetRef.current, trailRef.current)
      }

      if (isGhost) {
        revealPhaseRef.current = 0
        if (yOffsetRef.current > -0.5) {
          ghostOpacity -= isQuick ? 0.035 : 0.02
          ambientRef.current *= isQuick ? 0.92 : 0.98
          trailRef.current *= isQuick ? 0.95 : 0.98

          if (canvasRef.current) {
            canvasRef.current.style.opacity = Math.max(
              0,
              ghostOpacity
            ).toString()
          }
        }
        if (ghostOpacity <= 0) {
          if (isQuick) clearHeroFlashHead()
          animationId = 0
          return
        }
      } else if (yOffsetRef.current > -1.1 && revealPhaseRef.current < 1) {
        revealPhaseRef.current += (1 - revealPhaseRef.current) * 0.02
        if (revealPhaseRef.current > 0.999) revealPhaseRef.current = 1
      }

      lerpColors(display, target, paletteLerpSpeed)
      animate(accumulatedTime)

      animationId = requestAnimationFrame(loop)
    }

    const loopDelay = initialMountRef.current ? entryDelay : 0

    const startLoop = () => {
      initialMountRef.current = false
      if (!animationId) {
        animationId = requestAnimationFrame(loop)
      }
    }

    resumeLoopRef.current = startLoop
    startTimeoutId = setTimeout(startLoop, loopDelay)

    return () => {
      resumeLoopRef.current = null
      clearTimeout(startTimeoutId)
      if (animationId) cancelAnimationFrame(animationId)
      gl.deleteProgram(programInfo.program)
      gl.deleteShader(programInfo.vertShader)
      gl.deleteShader(programInfo.fragShader)
      if (programInfo.posBuffer) {
        gl.deleteBuffer(programInfo.posBuffer)
      }
      webglInitializedRef.current = false
    }
  }, [
    canvasRef,
    displayColorsRef,
    targetColorsRef,
    pausedRef,
    animationSpeedRef,
    isPausedByDialogRef,
    isTabHiddenRef,
    resumeLoopRef,
    paletteLerpSpeed,
    entryDelay,
    isGhost,
    isQuick,
    prefersReducedMotion,
    pauseWebGL,
    saveData,
    retryKey,
    setHasWebGL,
  ])
}
