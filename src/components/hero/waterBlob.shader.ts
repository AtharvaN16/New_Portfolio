/**
 * Water Blob Shader
 *
 * Simplified WebGL shader for animated gradient blobs.
 * REMOVED from old portfolio:
 * - 100-particle loop (performance killer)
 * - Mouse interaction (didn't work well)
 * - Complex trail system
 *
 * KEPT from old portfolio:
 * - Smooth blob animation
 * - Beautiful gradient blending
 * - Theme color support
 *
 * Uses design tokens for colors - no hardcoded values!
 */

export const vertexShader = `
  precision highp float;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5; // Convert from -1,1 to 0,1 range
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

export const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor1; // Blue (from design tokens)
  uniform vec3 uColor2; // Purple (from design tokens)
  uniform vec3 uColor3; // Pink (from design tokens)
  uniform vec3 uBackgroundColor; // Background (from design tokens)

  // Simple noise function for organic movement
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Smooth noise with interpolation
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal noise for natural movement
  float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0; i < 4; i++) {
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Turbulence for irregular blob shapes
  float turbulence(vec2 p, float power) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0; i < 4; i++) {
      value += amplitude * abs(smoothNoise(p * frequency));
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return pow(value, power);
  }

  // Create irregular water blob shape (like old portfolio)
  float irregularWaterShape(vec2 uv, vec2 center, float baseSize, float time, float seed) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);

    // Create irregular shape using turbulence
    float angle = atan(toCenter.y, toCenter.x);
    float turbulentRadius = baseSize * (0.8 + 0.4 * turbulence(
      vec2(cos(angle), sin(angle)) * 3.0 + time * 0.02 + seed, 0.8
    ));

    // Add noise distortion for organic edges
    float edgeNoise = fractalNoise(uv * 6.0 + time * 0.05 + seed);
    turbulentRadius += edgeNoise * 0.08;

    // Soft falloff - blob fades out at edges
    float influence = 1.0 - smoothstep(turbulentRadius * 0.6, turbulentRadius * 1.8, dist);

    // Add internal variation
    float internalNoise = fractalNoise(uv * 4.0 + time * 0.03 + seed);
    influence *= (0.7 + 0.3 * internalNoise);

    return clamp(influence, 0.0, 1.0);
  }

  // Organic movement for blobs
  vec2 blobMotion(float time, float speed, vec2 basePos, float seed) {
    float angle1 = time * speed + seed;
    float angle2 = time * speed * 0.7 + seed * 2.0 + 1.5;

    vec2 motion1 = vec2(cos(angle1), sin(angle1)) * 0.12;
    vec2 motion2 = vec2(cos(angle2), sin(angle2 * 1.3)) * 0.08;
    vec2 motion3 = vec2(sin(angle1 * 0.5), cos(angle2 * 0.8)) * 0.05;

    return basePos + motion1 + motion2 + motion3;
  }

  void main() {
    vec2 uv = vUv;

    // Use background color from design tokens (white in light mode, dark in dark mode)
    vec3 backgroundColor = uBackgroundColor;

    // Create two blob shapes that move around (like old portfolio)
    // Left blob (blue/purple)
    vec2 blob1Center = blobMotion(uTime, 0.3, vec2(0.25, 0.45), 0.0);
    float blob1 = irregularWaterShape(uv, blob1Center, 0.45, uTime, 0.0);

    // Right blob (purple/pink)
    vec2 blob2Center = blobMotion(uTime, 0.28, vec2(0.75, 0.5), 3.14159);
    float blob2 = irregularWaterShape(uv, blob2Center, 0.45, uTime, 5.0);

    // Normalize so they don't oversaturate when overlapping
    blob1 = clamp(blob1, 0.0, 1.0);
    blob2 = clamp(blob2, 0.0, 1.0);
    float combined = blob1 + blob2;
    if(combined > 1.0) {
      float excess = combined - 1.0;
      blob1 -= excess * (blob1 / combined);
      blob2 -= excess * (blob2 / combined);
    }

    // Distinct blobs with seamless glowing intersection
    float totalWater = clamp(blob1 + blob2, 0.0, 1.0);
    
    // Identify the intersection boundary (smooth, no gaps)
    float difference = abs(blob1 - blob2);
    float isIntersection = 1.0 - smoothstep(0.0, 0.2, difference);
    
    // Start with background color
    vec3 color = backgroundColor;
    
    // Determine which color to show based on dominance
    // Use smooth transitions to avoid gaps
    float blob1Dominance = smoothstep(-0.05, 0.05, blob1 - blob2);
    
    // In non-intersection areas, show pure colors based on dominance
    vec3 dominantColor = mix(uColor3, uColor1, blob1Dominance);
    color = mix(color, dominantColor, totalWater * (1.0 - isIntersection));
    
    // In intersection zone, ADD colors for bright glow (seamless)
    float overlap = min(blob1, blob2);
    vec3 glowColor = uColor1 + uColor3; // Additive light
    color = mix(color, glowColor, overlap * isIntersection);

    // Add glow effect - brighten the center of blobs
    float glow = max(blob1, blob2);
    float glowIntensity = pow(glow, 0.6) * 0.4; // Stronger glow
    color += color * glowIntensity; // Brighten by adding color to itself

    // Increase saturation
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, 1.25); // Boost saturation by 25%

    // Fade in the water (background shows where totalWater is low)
    // Use stronger fade to keep colors vibrant
    color = mix(backgroundColor, color, pow(totalWater, 0.8));

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface WaterBlobUniforms {
  uTime: { value: number }
  uColor1: { value: [number, number, number] }
  uColor2: { value: [number, number, number] }
  uColor3: { value: [number, number, number] }
}
