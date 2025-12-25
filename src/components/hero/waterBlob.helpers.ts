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
export function getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram) {
  return {
    uTimeLocation: gl.getUniformLocation(program, 'uTime'),
    uColor1Location: gl.getUniformLocation(program, 'uColor1'),
    uColor2Location: gl.getUniformLocation(program, 'uColor2'),
    uColor3Location: gl.getUniformLocation(program, 'uColor3'),
    uBackgroundColorLocation: gl.getUniformLocation(program, 'uBackgroundColor'),
  }
}

/**
 * Setup WebGL program and return program info
 */
export function setupWebGL(
  gl: WebGLRenderingContext,
  colors: Colors
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

  // Set initial colors
  gl.uniform3fv(uniforms.uColor1Location, colors.blue)
  gl.uniform3fv(uniforms.uColor2Location, colors.purple)
  gl.uniform3fv(uniforms.uColor3Location, colors.pink)
  gl.uniform3fv(uniforms.uBackgroundColorLocation, colors.background)

  return {
    program,
    ...uniforms,
    posBuffer,
    vertShader,
    fragShader,
  }
}

/**
 * Create animation loop for WebGL rendering
 */
export function createAnimationLoop(
  gl: WebGLRenderingContext,
  programInfo: WebGLProgramInfo,
  colors: Colors,
  speedMultiplier: number
): () => void {
  const startTime = Date.now()

  const animate = () => {
    const time = ((Date.now() - startTime) / 1000) * speedMultiplier
    gl.uniform1f(programInfo.uTimeLocation, time)

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
 * Setup canvas resize handler
 */
export function setupCanvasResize(canvas: HTMLCanvasElement): () => void {
  const CANVAS_RESIZE_DELAY_MS = 10

  const handleResize = () => {
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Set viewport
    const gl = canvas.getContext('webgl')
    if (gl) {
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
  }

  // Delay initial sizing to ensure parent has dimensions
  const timeoutId = setTimeout(handleResize, CANVAS_RESIZE_DELAY_MS)

  window.addEventListener('resize', handleResize)

  return () => {
    clearTimeout(timeoutId)
    window.removeEventListener('resize', handleResize)
  }
}
