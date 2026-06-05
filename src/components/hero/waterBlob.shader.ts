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
  uniform float uIsDarkMode; // 1.0 for dark mode, 0.0 for light mode
  uniform float uIsMobile;   // 1.0 for mobile, 0.0 for desktop
  uniform vec3 uColor1; // Blue (from design tokens)
  uniform vec3 uColor2; // Purple (from design tokens)
  uniform vec3 uColor3; // Pink (from design tokens)
  uniform vec3 uBackgroundColor; // Background (from design tokens)
  uniform float uYOffset; // Vertical offset for entry animation (UV space, lerps to 0)
  uniform float uRevealPhase; // 0.0 = plasma entry state, 1.0 = settled waterblob
  uniform float uAmbient; // 0 to 1 intensity of the ambient light wake
  // === TUNING CONSTANTS ===
  // Light mode uses reduced atmospheric effects (pigment metaphor)
  // Dark mode uses stronger glow effects (emissive metaphor)
  const float ATMOSPHERIC_NOISE_LIGHT = 0.02;  // Reduced for light mode
  const float ATMOSPHERIC_NOISE_DARK = 0.03;
  const float EDGE_GLOW_LIGHT = 0.04;          // Much less glow on light
  const float EDGE_GLOW_DARK = 0.08;
  const float SUBSURFACE_SCATTER_LIGHT = 0.03; // Subtle on light
  const float SUBSURFACE_SCATTER_DARK = 0.05;
  const float DENSITY_SAT_BOOST_LIGHT = 0.20;  // Reduced: avoids color clipping on light bg
  const float DENSITY_SAT_BOOST_DARK = 0.4;
  const float BASE_SATURATION_LIGHT = 1.15;    // Reduced: colors are already saturated palette choices
  const float BASE_SATURATION_DARK = 1.25;
  const float VOLUMETRIC_DENSITY_LIGHT = 0.08; // More density/opacity
  const float VOLUMETRIC_DENSITY_DARK = 0.05;

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

    // Optimization: reduce octaves on mobile
    int iterations = uIsMobile > 0.5 ? 2 : 4;

    for(int i = 0; i < 4; i++) {
      if (i >= iterations) break;
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

    // Optimization: reduce octaves on mobile
    int iterations = uIsMobile > 0.5 ? 2 : 4;

    for(int i = 0; i < 4; i++) {
      if (i >= iterations) break;
      value += amplitude * abs(smoothNoise(p * frequency));
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return pow(value, power);
  }

  // Create irregular water blob with character-specific turbulence
  // turbulenceAmount: controls chaos (0.2 = calm, 0.6 = energetic)
  // edgeSharpness: controls edge definition (0.75 = sharp, 0.6 = soft)
  float irregularWaterShape(vec2 uv, vec2 center, float baseSize, float time, float seed, 
                            float turbulenceAmount, float edgeSharpness, float proximityToOther, float isDark) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);

    // Create irregular shape using turbulence (with character-specific amount)
    float angle = atan(toCenter.y, toCenter.x);
    
    // Optimization: Use simpler turbulence math on mobile
    float noiseVal = uIsMobile > 0.5 
      ? turbulence(vec2(cos(angle), sin(angle)) * 2.0 + time * 0.02 + seed, 1.0)
      : turbulence(vec2(cos(angle), sin(angle)) * 3.0 + time * 0.02 + seed, 0.8);
      
    float turbulentRadius = baseSize * (0.8 + turbulenceAmount * noiseVal);

    // Mobile Optimization: Skip secondary edgeNoise distortion
    if (uIsMobile < 0.5) {
      float edgeNoise = fractalNoise(uv * 6.0 + time * 0.05 + seed);
      turbulentRadius += edgeNoise * 0.08;
    }

    // Sharp edges by default, soften based on proximity to other blob
    float edgeSoftness = mix(edgeSharpness, 0.6, proximityToOther); // Soften near other blob
    float influence = 1.0 - smoothstep(turbulentRadius * edgeSoftness, turbulentRadius * 1.5, dist);

    // Volumetric density - theme-specific (more opaque in light mode)
    float volumetricStrength = mix(VOLUMETRIC_DENSITY_LIGHT, VOLUMETRIC_DENSITY_DARK, isDark);
    
    // Mobile Optimization: Use linear falloff instead of exp()
    float densityFalloff = uIsMobile > 0.5 
      ? 1.0 - clamp(dist / (turbulentRadius * 1.2), 0.0, 1.0)
      : exp(-dist / (turbulentRadius * 0.5));
      
    influence *= densityFalloff * volumetricStrength + (1.0 - volumetricStrength);

    // Atmospheric texture - theme-specific (less noise in light mode)
    // Mobile Optimization: Use simpler noise call
    float atmosphericStrength = mix(ATMOSPHERIC_NOISE_LIGHT, ATMOSPHERIC_NOISE_DARK, isDark);
    float atmosphericNoise = uIsMobile > 0.5 
      ? smoothNoise(uv * 8.0 + time * 0.05 + seed)
      : fractalNoise(uv * 12.0 + time * 0.08 + seed);
      
    influence *= (1.0 - atmosphericStrength) + (atmosphericStrength * atmosphericNoise);

    return clamp(influence, 0.0, 1.0);
  }

  // Organic movement for blobs with variable amplitude
  vec2 blobMotion(float time, float speed, vec2 basePos, float seed, float amplitude) {
    float angle1 = time * speed + seed;
    float angle2 = time * speed * 0.7 + seed * 2.0 + 1.5;

    vec2 motion1 = vec2(cos(angle1), sin(angle1)) * (0.12 * amplitude);
    vec2 motion2 = vec2(cos(angle2), sin(angle2 * 1.3)) * (0.08 * amplitude);
    vec2 motion3 = vec2(sin(angle1 * 0.5), cos(angle2 * 0.8)) * (0.05 * amplitude);

    return basePos + motion1 + motion2 + motion3;
  }

  void main() {
    vec2 uv = vUv;

    vec3 backgroundColor = uBackgroundColor;

    // === BLOB CENTERS ===
    vec2 blob1Center = blobMotion(uTime, 0.18, vec2(0.25, 0.45), 0.0, 1.0);
    blob1Center.y += uYOffset;
    vec2 blob2Center = blobMotion(uTime, 0.32, vec2(0.75, 0.5), 3.14159, 1.3);
    blob2Center.y += uYOffset;

    // During plasma reveal: merge centers into one unified field, expand sizes.
    // fieldBlend eases out quadratically so separation feels organic.
    float fieldBlend = (1.0 - uRevealPhase) * (1.0 - uRevealPhase);
    vec2 plasmaCenter = vec2(0.5, 0.47 + uYOffset);
    blob1Center = mix(blob1Center, plasmaCenter + vec2(-0.05, 0.02), fieldBlend * 0.65);
    blob2Center = mix(blob2Center, plasmaCenter + vec2(0.06, -0.01), fieldBlend * 0.60);

    float distanceBetween = length(blob1Center - blob2Center);
    float proximity1 = smoothstep(0.6, 0.3, distanceBetween);
    float proximity2 = proximity1;

    float size1 = mix(1.35, 1.0, uRevealPhase);
    float size2 = mix(1.28, 1.0, uRevealPhase);
    float blob1 = irregularWaterShape(uv, blob1Center, 0.55 * size1, uTime, 0.0, 0.25, 0.80, proximity1, uIsDarkMode);
    float blob2 = irregularWaterShape(uv, blob2Center, 0.38 * size2, uTime, 5.0, 0.55, 0.80, proximity2, uIsDarkMode);

    // Normalize to prevent over-saturation
    blob1 = clamp(blob1, 0.0, 1.0);
    blob2 = clamp(blob2, 0.0, 1.0);
    float combined = blob1 + blob2;
    if(combined > 1.0) {
      float excess = combined - 1.0;
      blob1 -= excess * (blob1 / combined);
      blob2 -= excess * (blob2 / combined);
    }

    float totalWater = clamp(blob1 + blob2, 0.0, 1.0);
    
    // === GLOW EFFECT - Theme-specific behavior ===
    // Dark mode: Strong glow (emissive light metaphor)
    // Light mode: Subtle glow (pigment/ink metaphor)
    float glowPower = mix(0.9, 0.6, uIsDarkMode);        // Sharper falloff in light mode
    float glowStrength = mix(0.08, 0.4, uIsDarkMode);    // Much less glow in light mode
    
    // Mobile Optimization: Avoid expensive pow() for glow if possible
    float glowIntensity = uIsMobile > 0.5 
      ? totalWater * glowStrength 
      : pow(totalWater, glowPower) * glowStrength;
    // Dark mode: additive glow (emissive effect on dark background)
    // Light mode: subtle depth cue shadow under blobs (glow on white just clips to 1.0)
    float depthCue = glowIntensity * 0.04 * (1.0 - uIsDarkMode);
    vec3 color = backgroundColor * (1.0 - depthCue)
               + backgroundColor * glowIntensity * uIsDarkMode;
    
    // === NATURAL CONCENTRATION GRADIENT MIXING ===
    // Use cubic easing for more realistic color pooling (not linear)
    float mixRatio = blob1 / max(blob1 + blob2, 0.001);
    mixRatio = mixRatio * mixRatio * (3.0 - 2.0 * mixRatio); // Cubic smoothstep
    
    // Natural mixing intensity based on overlap (no binary intersection!)
    float mixingIntensity = blob1 * blob2; // Natural where both present
    
    // Blend colors with concentration gradient
    vec3 blendedColor = mix(uColor3, uColor1, mixRatio);
    
    // === DENSITY-BASED SATURATION - Theme-specific ===
    // Light mode needs MORE saturation to compensate for lower luminance contrast
    float baseSat = mix(BASE_SATURATION_LIGHT, BASE_SATURATION_DARK, uIsDarkMode);
    float densitySatBoost = mix(DENSITY_SAT_BOOST_LIGHT, DENSITY_SAT_BOOST_DARK, uIsDarkMode);
    float densitySaturation = baseSat * (1.0 + totalWater * densitySatBoost);
    float luminance = dot(blendedColor, vec3(0.299, 0.587, 0.114));
    blendedColor = mix(vec3(luminance), blendedColor, densitySaturation);
    
    // === HIGHLIGHTS (thick areas) & PIGMENT EDGE DARKENING (thin edges) ===
    float highlight = pow(totalWater, 0.5) * mixingIntensity * 0.3; // Bright where overlapping
    // Watercolor pigment accumulation at edges — dark ring at blob boundary, light mode only
    float pigmentEdge = smoothstep(0.0, 0.4, totalWater)
                      * (1.0 - smoothstep(0.4, 0.9, totalWater))
                      * 0.25
                      * (1.0 - uIsDarkMode);
    blendedColor = blendedColor * (1.0 + highlight) * (1.0 - pigmentEdge);
    
    // Composite blobs onto glowing background
    color = mix(color, blendedColor, totalWater);
    
    // === SUBSURFACE SCATTERING - Theme-specific ===
    float scatterStrength = mix(SUBSURFACE_SCATTER_LIGHT, SUBSURFACE_SCATTER_DARK, uIsDarkMode);
    float edgeDistance = 1.0 - totalWater;
    float subsurfaceScatter = smoothstep(0.7, 1.0, edgeDistance) * totalWater * scatterStrength;
    vec3 backlight = mix(uColor1, uColor3, 0.5) * 1.3;
    color += backlight * subsurfaceScatter;
    
    // === EDGE GLOW - Theme-specific ===
    float edgeGlowStrength = mix(EDGE_GLOW_LIGHT, EDGE_GLOW_DARK, uIsDarkMode);
    float edgeGlow = pow(1.0 - totalWater, 2.0) * totalWater * edgeGlowStrength;
    color += color * edgeGlow;

    // === FINAL ATMOSPHERIC FADE ===
    // Mobile Optimization: Simple linear fade instead of pow()
    float atmosphericAlpha = uIsMobile > 0.5
      ? totalWater * 0.9
      : pow(totalWater, 0.78);
    color = mix(backgroundColor, color, atmosphericAlpha);

    // === PLASMA ENTRY STATE ===
    // Thermal rim: pitch black → red → orange → yellow → white → blue → pitch black interior
    // Red = outermost (coolest, widest band). Blue = innermost (hottest, narrowest).
    vec3 tRed    = vec3(0.85, 0.06, 0.02);
    vec3 tOrange = vec3(1.0,  0.42, 0.02);
    vec3 tYellow = vec3(1.0,  0.92, 0.12);
    vec3 tWhite  = vec3(1.0,  1.0,  0.97);
    vec3 tBlue   = vec3(0.08, 0.72, 1.0);
    vec3 plasmaRaw = vec3(0.0);
    plasmaRaw = mix(plasmaRaw, tRed,    smoothstep(0.04, 0.18, totalWater));
    plasmaRaw = mix(plasmaRaw, tOrange, smoothstep(0.18, 0.32, totalWater));
    plasmaRaw = mix(plasmaRaw, tYellow, smoothstep(0.32, 0.46, totalWater));
    plasmaRaw = mix(plasmaRaw, tWhite,  smoothstep(0.46, 0.55, totalWater));
    plasmaRaw = mix(plasmaRaw, tBlue,   smoothstep(0.55, 0.65, totalWater));
    plasmaRaw = mix(plasmaRaw, vec3(0.0), smoothstep(0.65, 0.80, totalWater)); // interior → black
    float plasmaAlpha = smoothstep(0.02, 0.08, totalWater);
    vec3 plasmaColor = mix(backgroundColor, plasmaRaw, plasmaAlpha);

    // Blend plasma → waterblob as reveal progresses (cubic ease)
    float revealEased = uRevealPhase * uRevealPhase * (3.0 - 2.0 * uRevealPhase);
    color = mix(plasmaColor, color, revealEased);

    // === AMBIENT ILLUMINATION (The "Box" Lighting) ===
    // Create a very soft vertical wash of light that follows the pulse uYOffset.
    // Exponential falloff ensures it's brightest near the matter pulse.
    float ambientWash = exp(-abs(vUv.y - uYOffset) * 1.8) * uAmbient;
    vec3 lightColor = mix(uColor1, vec3(1.0), 0.7); // Bright thermal light
    color += lightColor * ambientWash * 0.25; // Additive background illumination

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface WaterBlobUniforms {
  uTime: { value: number }
  uColor1: { value: [number, number, number] }
  uColor2: { value: [number, number, number] }
  uColor3: { value: [number, number, number] }
  uYOffset: { value: number }
  uRevealPhase: { value: number }
  uAmbient: { value: number }
}
