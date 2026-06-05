/**
 * WebGL Helper Functions for WaterBlob Component
 *
 * Extracted utilities for shader compilation, program setup, and rendering.
 * Keeps the main component focused on React logic.
 */

import type { Colors, WebGLProgramInfo } from './waterBlob.types'
import { vertexShader, fragmentShader } from './waterBlob.shader'

/**
 * Compile and validate a WebGL shader
 */
export function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const shaderType = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment'
    console.error(`${shaderType} shader error:`, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

/**
 * Create and link WebGL program from shaders
 */
export function createWebGLProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertShader)
  gl.attachShader(program, fragShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  return program
}

/**
 * Setup geometry buffer for full-screen quad
 */
export function setupGeometry(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): WebGLBuffer | null {
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const posBuffer = gl.createBuffer()
  if (!posBuffer) return null

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  const posLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(posLocation)
  gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0)

  return posBuffer
}

/**
 * Get uniform locations from WebGL program
 */
export function getUniformLocations(
  gl: WebGLRenderingContext,
  program: WebGLProgram
) {
  return {
    uTimeLocation: gl.getUniformLocation(program, 'uTime'),
    uIsDarkModeLocation: gl.getUniformLocation(program, 'uIsDarkMode'),
    uIsMobileLocation: gl.getUniformLocation(program, 'uIsMobile'),
    uColor1Location: gl.getUniformLocation(program, 'uColor1'),
    uColor2Location: gl.getUniformLocation(program, 'uColor2'),
    uColor3Location: gl.getUniformLocation(program, 'uColor3'),
    uBackgroundColorLocation: gl.getUniformLocation(
      program,
      'uBackgroundColor'
    ),
    uYOffsetLocation: gl.getUniformLocation(program, 'uYOffset'),
    uRevealPhaseLocation: gl.getUniformLocation(program, 'uRevealPhase'),
    uAmbientLocation: gl.getUniformLocation(program, 'uAmbient'),
    uTrailLocation: gl.getUniformLocation(program, 'uTrail'),
  }
}

/**
 * Setup WebGL program and return program info
 */
export function setupWebGL(
  gl: WebGLRenderingContext,
  colors: Colors,
  isDarkMode: boolean,
  isMobile: boolean = false
): WebGLProgramInfo | null {
  // Compile shaders
  const vertShader = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

  if (!vertShader || !fragShader) return null

  // Create program
  const program = createWebGLProgram(gl, vertShader, fragShader)
  if (!program) return null

  // Setup geometry
  const posBuffer = setupGeometry(gl, program)
  if (!posBuffer) return null

  // Get uniform locations
  const uniforms = getUniformLocations(gl, program)

  // Set initial uniforms
  gl.uniform1f(uniforms.uIsDarkModeLocation, isDarkMode ? 1.0 : 0.0)
  gl.uniform1f(uniforms.uIsMobileLocation, isMobile ? 1.0 : 0.0)
  gl.uniform3fv(uniforms.uColor1Location, colors.blue)
  gl.uniform3fv(uniforms.uColor2Location, colors.purple)
  gl.uniform3fv(uniforms.uColor3Location, colors.pink)
  gl.uniform3fv(uniforms.uBackgroundColorLocation, colors.background)
  gl.uniform1f(uniforms.uAmbientLocation, 0.0)
  gl.uniform1f(uniforms.uTrailLocation, 0.0)

  return {
    program,
    ...uniforms,
    posBuffer,
    vertShader,
    fragShader,
  }
}

/**
 * Create animation loop for WebGL rendering.
 * Accepts elapsed time in seconds so the caller can pause/resume without
 * the animation jumping forward during paused intervals.
 */
export function createAnimationLoop(
  gl: WebGLRenderingContext,
  programInfo: WebGLProgramInfo,
  colors: Colors,
  getYOffset: () => number = () => 0,
  isMobile: boolean = false,
  getRevealPhase: () => number = () => 1,
  getAmbient: () => number = () => 0,
  getTrail: () => number = () => 0
): (time: number) => void {
  let lastFrameTime = 0
  const mobileFrameInterval = 1 / 30 // 30 FPS target for mobile

  const animate = (time: number) => {
    // 30 FPS throttling for mobile efficiency
    if (isMobile) {
      if (time - lastFrameTime < mobileFrameInterval) return
      lastFrameTime = time
    }

    gl.uniform1f(programInfo.uTimeLocation, time)
    gl.uniform1f(programInfo.uYOffsetLocation, getYOffset())
    gl.uniform1f(programInfo.uRevealPhaseLocation, getRevealPhase())
    gl.uniform1f(programInfo.uAmbientLocation, getAmbient())
    gl.uniform1f(programInfo.uTrailLocation, getTrail())
    gl.uniform1f(programInfo.uIsMobileLocation, isMobile ? 1.0 : 0.0)


    // Update colors dynamically (for interactive mode)
    gl.uniform3fv(programInfo.uColor1Location, colors.blue)
    gl.uniform3fv(programInfo.uColor2Location, colors.purple)
    gl.uniform3fv(programInfo.uColor3Location, colors.pink)
    gl.uniform3fv(programInfo.uBackgroundColorLocation, colors.background)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  return animate
}

/**
 * Setup canvas resize handler using ResizeObserver (modern approach)
 * Checks dimensions before every resize to avoid unnecessary updates.
 * On mobile, it ignores small height changes typical of address bar toggling.
 */
export function setupCanvasResize(canvas: HTMLCanvasElement): () => void {
  let lastWidth = 0
  let lastHeight = 0

  const resizeCanvasToDisplaySize = () => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    // Performance:
    // - Mobile: Render at 0.25x resolution (Ultra efficiency, soft organic look)
    // - Desktop: Cap at 1.5x (Avoids over-rendering on 3x Retina/4K screens)
    const dpr = isMobile ? 0.25 : Math.min(window.devicePixelRatio || 1, 1.5)
    const rect = canvas.getBoundingClientRect()

    const displayWidth = Math.round(rect.width * dpr)
    const displayHeight = Math.round(rect.height * dpr)

    // Check if the change is significant enough to warrant a resize.
    // On mobile, height changes < 60px (dpr adjusted) are likely just the address bar.
    const heightDiff = Math.abs(displayHeight - lastHeight)
    const widthDiff = Math.abs(displayWidth - lastWidth)

    // Logic: 
    // 1. If width changed, always resize.
    // 2. If it's NOT mobile, always resize on any change.
    // 3. If it IS mobile, only resize height if the change is > 60px (address bar threshold).
    const needResize =
      lastWidth === 0 || // First run
      widthDiff > 0 ||
      (!isMobile && heightDiff > 0) ||
      (isMobile && heightDiff > 60 * dpr)

    if (needResize) {
      canvas.width = displayWidth
      canvas.height = displayHeight
      lastWidth = displayWidth
      lastHeight = displayHeight

      // Update WebGL viewport
      const gl = canvas.getContext('webgl')
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    return needResize
  }

  // Initial resize
  resizeCanvasToDisplaySize()

  // Use ResizeObserver for efficient resize detection
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvasToDisplaySize()
  })

  resizeObserver.observe(canvas)

  // Fallback: also listen to window resize for older edge cases
  window.addEventListener('resize', resizeCanvasToDisplaySize)

  return () => {
    resizeObserver.disconnect()
    window.removeEventListener('resize', resizeCanvasToDisplaySize)
  }
}

/**
 * Lerp all color channels in-place toward target values.
 * Mutates the `current` object directly so closures that captured it see updates.
 */
export function lerpColors(
  current: Colors,
  target: Colors,
  speed: number
): void {
  const keys: (keyof Colors)[] = ['blue', 'purple', 'pink', 'background']
  for (const key of keys) {
    for (let i = 0; i < 3; i++) {
      current[key][i] += (target[key][i] - current[key][i]) * speed
    }
  }
}
