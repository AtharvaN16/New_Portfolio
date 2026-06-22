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
  uniform float uIsMobile;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uBackgroundColor;
  uniform float uYOffset;
  uniform float uRevealPhase;
  uniform float uAmbient;
  uniform float uTrail;

  // Constants baked to dark-mode values — uIsDarkMode was always 1.0 at runtime.
  // Light-mode appearance is achieved via background + palette colors, not shader branches.
  const float ATMOSPHERIC_NOISE  = 0.03;
  const float EDGE_GLOW          = 0.12;
  const float SUBSURFACE_SCATTER = 0.08;
  const float DENSITY_SAT_BOOST  = 0.4;
  const float BASE_SATURATION    = 1.25;
  const float VOLUMETRIC_DENSITY = 0.05;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

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

  float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    int iterations = uIsMobile > 0.5 ? 2 : 4;
    for(int i = 0; i < 4; i++) {
      if (i >= iterations) break;
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  float turbulence(vec2 p, float power) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    int iterations = uIsMobile > 0.5 ? 2 : 4;
    for(int i = 0; i < 4; i++) {
      if (i >= iterations) break;
      value += amplitude * abs(smoothNoise(p * frequency));
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return pow(value, power);
  }

  float irregularWaterShape(vec2 uv, vec2 center, float baseSize, float time, float seed,
                            float turbulenceAmount, float edgeSharpness, float proximityToOther) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);
    float angle = atan(toCenter.y, toCenter.x);

    float noiseVal = uIsMobile > 0.5
      ? turbulence(vec2(cos(angle), sin(angle)) * 2.0 + time * 0.03 + seed, 1.0)
      : turbulence(vec2(cos(angle), sin(angle)) * 3.0 + time * 0.05 + seed, 0.8);

    float turbulentRadius = baseSize * (0.8 + turbulenceAmount * noiseVal);

    if (uIsMobile < 0.5) {
      float edgeNoise = fractalNoise(uv * 6.0 + time * 0.05 + seed);
      turbulentRadius += edgeNoise * 0.08;
    }

    float edgeSoftness = mix(edgeSharpness, 0.6, proximityToOther);
    float influence = 1.0 - smoothstep(turbulentRadius * edgeSoftness, turbulentRadius * 1.5, dist);

    float densityFalloff = uIsMobile > 0.5
      ? 1.0 - clamp(dist / (turbulentRadius * 1.2), 0.0, 1.0)
      : exp(-dist / (turbulentRadius * 0.5));
    influence *= densityFalloff * VOLUMETRIC_DENSITY + (1.0 - VOLUMETRIC_DENSITY);

    float atmosphericNoise = uIsMobile > 0.5
      ? smoothNoise(uv * 8.0 + time * 0.05 + seed)
      : fractalNoise(uv * 12.0 + time * 0.08 + seed);
    influence *= (1.0 - ATMOSPHERIC_NOISE) + (ATMOSPHERIC_NOISE * atmosphericNoise);

    return clamp(influence, 0.0, 1.0);
  }

  vec2 blobMotion(float time, float speed, vec2 basePos, float seed, float amplitude) {
    float angle1 = time * speed + seed;
    float angle2 = time * speed * 0.7 + seed * 2.0 + 1.5;
    float angle3 = time * speed * 1.618 + seed * 3.0 + 2.9;
    vec2 motion1 = vec2(cos(angle1), sin(angle1)) * (0.12 * amplitude);
    vec2 motion2 = vec2(cos(angle2), sin(angle2 * 1.3)) * (0.08 * amplitude);
    vec2 motion3 = vec2(sin(angle1 * 0.5), cos(angle2 * 0.8)) * (0.05 * amplitude);
    vec2 motion4 = vec2(cos(angle3 * 0.9), sin(angle3)) * (0.04 * amplitude);
    return basePos + motion1 + motion2 + motion3 + motion4;
  }

  void main() {
    vec2 uv = vUv;
    vec3 backgroundColor = uBackgroundColor;

    // === BLOB CENTERS ===
    vec2 blob1Center = blobMotion(uTime, 0.18, vec2(0.25, 0.45), 0.0, 1.0);
    blob1Center.y += uYOffset;
    vec2 blob2Center = blobMotion(uTime, 0.32, vec2(0.75, 0.5), 3.14159, 1.3);
    blob2Center.y += uYOffset;

    float fieldBlend = (1.0 - uRevealPhase) * (1.0 - uRevealPhase);
    vec2 plasmaCenter = vec2(0.5, 0.47 + uYOffset);
    blob1Center = mix(blob1Center, plasmaCenter + vec2(-0.05, 0.02), fieldBlend * 0.65);
    blob2Center = mix(blob2Center, plasmaCenter + vec2(0.06, -0.01), fieldBlend * 0.60);

    float distanceBetween = length(blob1Center - blob2Center);
    float proximity1 = smoothstep(0.6, 0.3, distanceBetween);
    float proximity2 = proximity1;

    float size1 = mix(1.35, 1.0, uRevealPhase);
    float size2 = mix(1.28, 1.0, uRevealPhase);
    float breath1 = 1.0 + 0.06 * sin(uTime * 0.27);
    float breath2 = 1.0 + 0.06 * sin(uTime * 0.19 + 2.1);
    float blob1 = irregularWaterShape(uv, blob1Center, 0.55 * size1 * breath1, uTime, 0.0, 0.25, 0.80, proximity1);
    float blob2 = irregularWaterShape(uv, blob2Center, 0.38 * size2 * breath2, uTime, 5.0, 0.55, 0.80, proximity2);

    blob1 = clamp(blob1, 0.0, 1.0);
    blob2 = clamp(blob2, 0.0, 1.0);
    float combined = blob1 + blob2;
    if(combined > 1.0) {
      float excess = combined - 1.0;
      blob1 -= excess * (blob1 / combined);
      blob2 -= excess * (blob2 / combined);
    }

    float totalWater = clamp(blob1 + blob2, 0.0, 1.0);

    // === GLOW (additive, emissive — dark mode) ===
    float glowIntensity = uIsMobile > 0.5
      ? pow(totalWater, 0.65) * 0.48
      : pow(totalWater, 0.6) * 0.4;
    vec3 color = backgroundColor * (1.0 + glowIntensity);

    // === COLOR MIXING ===
    float mixRatio = blob1 / max(blob1 + blob2, 0.001);
    mixRatio = mixRatio * mixRatio * (3.0 - 2.0 * mixRatio);
    float mixingIntensity = blob1 * blob2;
    vec3 blendedColor = mix(uColor2, uColor1, mixRatio);

    // === DENSITY-BASED SATURATION ===
    float densitySaturation = BASE_SATURATION * (1.0 + totalWater * DENSITY_SAT_BOOST);
    float luminance = dot(blendedColor, vec3(0.299, 0.587, 0.114));
    blendedColor = mix(vec3(luminance), blendedColor, densitySaturation);

    // === HIGHLIGHTS ===
    float highlight = pow(totalWater, 0.5) * mixingIntensity * 0.3;
    blendedColor *= (1.0 + highlight);

    color = mix(color, blendedColor, totalWater);

    // === SUBSURFACE SCATTERING ===
    float edgeDistance = 1.0 - totalWater;
    float subsurfaceScatter = smoothstep(0.7, 1.0, edgeDistance) * totalWater * SUBSURFACE_SCATTER;
    vec3 backlight = mix(uColor1, uColor2, 0.5) * 1.3;
    color += backlight * subsurfaceScatter;

    // === EDGE GLOW ===
    float edgeGlow = pow(1.0 - totalWater, 2.0) * totalWater * EDGE_GLOW;
    color += color * edgeGlow;

    // === ATMOSPHERIC FADE ===
    float atmosphericAlpha = uIsMobile > 0.5
      ? pow(totalWater, 0.82)
      : pow(totalWater, 0.78);
    color = mix(backgroundColor, color, atmosphericAlpha);

    // === PLASMA ENTRY STATE (F1) ===
    // Classic thermal rim — see hero-f1-plasma.ts for theme customization options.
    // Skipped once settled (uRevealPhase >= 1). Also skipped on mobile (revealPhase = 1).
    if (uRevealPhase < 0.999) {
      vec3 tRed    = vec3(0.85, 0.06, 0.02);
      vec3 tOrange = vec3(1.0,  0.42, 0.02);
      vec3 tYellow = vec3(1.0,  0.92, 0.12);
      vec3 tWhite  = vec3(1.0,  1.0,  0.97);
      vec3 tBlue   = vec3(0.08, 0.72, 1.0);
      vec3 plasmaRaw = vec3(0.0);
      plasmaRaw = mix(plasmaRaw, tRed,    smoothstep(0.04, 0.18, totalWater));
      plasmaRaw = mix(plasmaRaw, tOrange, smoothstep(0.18, 0.32, totalWater));
      plasmaRaw = mix(plasmaRaw, tYellow, smoothstep(0.32, 0.40, totalWater));
      plasmaRaw = mix(plasmaRaw, tWhite,  smoothstep(0.40, 0.62, totalWater));
      plasmaRaw = mix(plasmaRaw, tBlue,   smoothstep(0.62, 0.72, totalWater));
      plasmaRaw = mix(plasmaRaw, vec3(0.0), smoothstep(0.72, 0.80, totalWater));
      float plasmaAlpha = smoothstep(0.02, 0.08, totalWater);
      vec3 plasmaColor = mix(backgroundColor, plasmaRaw, plasmaAlpha);
      float revealEased = uRevealPhase * uRevealPhase * (3.0 - 2.0 * uRevealPhase);
      color = mix(plasmaColor, color, revealEased);
    }

    // === AMBIENT ILLUMINATION ===
    float ambientWash = exp(-abs(vUv.y - uYOffset) * 1.8) * uAmbient;
    vec3 lightColor = mix(uColor1, vec3(1.0), 0.7);
    color += lightColor * ambientWash * 0.25;

    // === FIRST-FLASH WHITE TRAIL ===
    // Analytical — uses already-computed blob centers and totalWater, zero extra samples.
    // Uniform branch: false on mobile (uTrail always 0) and after F1 fades.
    if (uTrail > 0.001) {
      float approxTopEdge = max(blob1Center.y, blob2Center.y) + 0.52;
      float d = approxTopEdge - vUv.y;
      float wake = d >= 0.0 ? exp(-d * 1.4) : exp(d * 7.0);
      float edgeMod = 1.0 - 0.6 * totalWater;
      color += vec3(1.0) * wake * edgeMod * uTrail * 0.95;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface WaterBlobUniforms {
  uTime: { value: number }
  uColor1: { value: [number, number, number] }
  uColor2: { value: [number, number, number] }
  uYOffset: { value: number }
  uRevealPhase: { value: number }
  uAmbient: { value: number }
  uTrail: { value: number }
}
