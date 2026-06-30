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
import {
  deltaFramesFromMs,
  lerpByReferenceFrames,
  multiplyByReferenceFrames,
} from './waterBlob.motion'
import type { Colors } from './waterBlob.types'
import { dispatchHeroFlashHead, clearHeroFlashHead } from './hero-flash-head'
import { dispatchHeroBlobF2Settled } from './hero-entry-timing'

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
  webglInitDelay: number
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
  webglInitDelay,
}: UseWaterBlobAnimationParams) {
  const [retryKey, setRetryKey] = useState(0)
  const webglInitializedRef = useRef(false)
  const initialMountRef = useRef(true)
  const f2SettledDispatchedRef = useRef(false)
  const yOffsetRef = useRef(-1.5)
  const revealPhaseRef = useRef(0)
  const ambientRef = useRef(0)
  const trailRef = useRef(0)

  // WebGL init runs once per mount (plus retry / a11y toggles).
  // Theme changes are handled by useWaterBlobColorRefs → lerpColors → per-frame
  // uniform updates in createAnimationLoop — no program rebuild needed.
  useEffect(() => {
    if (prefersReducedMotion || pauseWebGL || saveData) {
      return
    }

    let cancelled = false
    let disposeWebGL: (() => void) | null = null

    const initWebGL = () => {
      if (
        cancelled ||
        !canvasRef.current ||
        !displayColorsRef.current ||
        !targetColorsRef.current
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
          if (!cancelled && !webglInitializedRef.current && canvasRef.current) {
            const newRect = canvasRef.current.getBoundingClientRect()
            if (newRect.width > 0 && newRect.height > 0) {
              setRetryKey((prev) => prev + 1)
            }
          }
        }, 100)
        disposeWebGL = () => clearTimeout(retryTimeout)
        return
      }

      const gl = canvas.getContext('webgl')

      if (!gl) {
        console.warn('WebGL not supported, showing fallback gradient')
        setHasWebGL(false)
        return
      }

      const isMobile =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 768
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
        ambientRef.current = isMobile && !isGhost ? 0.22 : 0
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
        () => trailRef.current,
        canvas
      )

      let animationId = 0
      let accumulatedTime = 0
      let lastTimestamp: number | null = null
      let ghostOpacity = 1
      let isDisposed = false

      const shouldPauseLoop = () =>
        isPausedByDialogRef.current ||
        pausedRef.current ||
        isTabHiddenRef.current

      const loop = (timestamp: number) => {
        if (shouldPauseLoop()) {
          lastTimestamp = null
          animationId = 0
          return
        }

        const deltaMs =
          lastTimestamp === null ? 1000 / 60 : timestamp - lastTimestamp
        const deltaFrames = deltaFramesFromMs(deltaMs)

        if (lastTimestamp !== null) {
          accumulatedTime += (deltaMs / 1000) * animationSpeedRef.current
        }
        lastTimestamp = timestamp

        const riseRate = isQuick ? 0.06 : 0.035
        if (yOffsetRef.current < -0.001) {
          yOffsetRef.current = lerpByReferenceFrames(
            yOffsetRef.current,
            0,
            riseRate,
            deltaFrames
          )
        } else {
          yOffsetRef.current = 0
        }

        if (isQuick) {
          ambientRef.current = lerpByReferenceFrames(
            ambientRef.current,
            1.0,
            0.08,
            deltaFrames
          )
        } else if (!isGhost) {
          ambientRef.current = lerpByReferenceFrames(
            ambientRef.current,
            0.15,
            0.02,
            deltaFrames
          )
        }

        if (isGhost) {
          trailRef.current = lerpByReferenceFrames(
            trailRef.current,
            1.0,
            0.12,
            deltaFrames
          )
        }

        if (isGhost && isQuick) {
          dispatchHeroFlashHead(yOffsetRef.current, trailRef.current)
        }

        if (isGhost) {
          revealPhaseRef.current = 0
          if (yOffsetRef.current > -0.5) {
            ghostOpacity -= (isQuick ? 0.035 : 0.02) * deltaFrames
            ambientRef.current = multiplyByReferenceFrames(
              ambientRef.current,
              isQuick ? 0.92 : 0.98,
              deltaFrames
            )
            trailRef.current = multiplyByReferenceFrames(
              trailRef.current,
              isQuick ? 0.95 : 0.98,
              deltaFrames
            )

            if (canvasRef.current) {
              canvasRef.current.style.opacity = Math.max(
                0,
                ghostOpacity
              ).toString()
            }
          }
          if (ghostOpacity <= 0) {
            animationId = 0
            disposeWebGL?.()
            return
          }
        } else if (yOffsetRef.current > -1.1 && revealPhaseRef.current < 1) {
          revealPhaseRef.current = lerpByReferenceFrames(
            revealPhaseRef.current,
            1,
            0.02,
            deltaFrames
          )
          if (revealPhaseRef.current > 0.999) {
            revealPhaseRef.current = 1
            if (!isGhost && !f2SettledDispatchedRef.current) {
              f2SettledDispatchedRef.current = true
              dispatchHeroBlobF2Settled()
            }
          }
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
      const startTimeoutId = setTimeout(startLoop, loopDelay)

      disposeWebGL = () => {
        if (isDisposed) return
        isDisposed = true
        if (isGhost && isQuick) clearHeroFlashHead()
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
    }

    const initTimeoutId = setTimeout(initWebGL, webglInitDelay)

    return () => {
      cancelled = true
      clearTimeout(initTimeoutId)
      disposeWebGL?.()
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
    webglInitDelay,
  ])
}
