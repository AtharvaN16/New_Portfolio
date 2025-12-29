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
  uniform vec3 uColor1; // Blue (from design tokens)
  uniform vec3 uColor2; // Purple (from design tokens)
  uniform vec3 uColor3; // Pink (from design tokens)
  uniform vec3 uBackgroundColor; // Background (from design tokens)
  
  // === TUNING CONSTANTS (no more magic numbers!) ===
  const float ATMOSPHERIC_NOISE_STRENGTH = 0.03;
  const float EDGE_GLOW_STRENGTH = 0.08;
  const float SUBSURFACE_SCATTER_INTENSITY = 0.05;
  const float DENSITY_SATURATION_BOOST = 0.4;
  const float BASE_SATURATION = 1.25;
  const float VOLUMETRIC_DENSITY_INFLUENCE = 0.05;

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

  // Create irregular water blob with character-specific turbulence
  // turbulenceAmount: controls chaos (0.2 = calm, 0.6 = energetic)
  // edgeSharpness: controls edge definition (0.75 = sharp, 0.6 = soft)
  float irregularWaterShape(vec2 uv, vec2 center, float baseSize, float time, float seed, 
                            float turbulenceAmount, float edgeSharpness, float proximityToOther) {
    vec2 toCenter = uv - center;
    float dist = length(toCenter);

    // Create irregular shape using turbulence (with character-specific amount)
    float angle = atan(toCenter.y, toCenter.x);
    float turbulentRadius = baseSize * (0.8 + turbulenceAmount * turbulence(
      vec2(cos(angle), sin(angle)) * 3.0 + time * 0.02 + seed, 0.8
    ));

    // Add noise distortion for organic edges
    float edgeNoise = fractalNoise(uv * 6.0 + time * 0.05 + seed);
    turbulentRadius += edgeNoise * 0.08;

    // Sharp edges by default, soften based on proximity to other blob
    float edgeSoftness = mix(edgeSharpness, 0.6, proximityToOther); // Soften near other blob
    float influence = 1.0 - smoothstep(turbulentRadius * edgeSoftness, turbulentRadius * 1.5, dist);

    // Very subtle volumetric density - barely noticeable depth
    float densityFalloff = exp(-dist / (turbulentRadius * 0.5));
    influence *= densityFalloff * VOLUMETRIC_DENSITY_INFLUENCE + (1.0 - VOLUMETRIC_DENSITY_INFLUENCE);

    // Very subtle atmospheric texture
    float atmosphericNoise = fractalNoise(uv * 12.0 + time * 0.08 + seed);
    influence *= (1.0 - ATMOSPHERIC_NOISE_STRENGTH) + (ATMOSPHERIC_NOISE_STRENGTH * atmosphericNoise);

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

    // === BLOB 1 (Blue) - DOMINANT, CALM ===
    // Larger size (70% bigger), slower movement, low turbulence, smooth edges
    vec2 blob1Center = blobMotion(uTime, 0.18, vec2(0.25, 0.45), 0.0, 1.0);
    
    // Calculate proximity to blob2 for edge softening
    vec2 blob2Center = blobMotion(uTime, 0.32, vec2(0.75, 0.5), 3.14159, 1.3);
    float distanceBetween = length(blob1Center - blob2Center);
    float proximity1 = smoothstep(0.6, 0.3, distanceBetween); // Soften when close
    
    float blob1 = irregularWaterShape(uv, blob1Center, 0.55, uTime, 0.0, 0.25, 0.80, proximity1);

    // === BLOB 2 (Pink) - SECONDARY, ENERGETIC ===
    // Smaller size, faster movement, high turbulence, dynamic
    float proximity2 = smoothstep(0.6, 0.3, distanceBetween);
    float blob2 = irregularWaterShape(uv, blob2Center, 0.38, uTime, 5.0, 0.55, 0.80, proximity2);

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
    
    // === GLOW EFFECT (Applied to background first - physically accurate) ===
    float glowPower = mix(0.8, 0.6, uIsDarkMode);
    float glowStrength = mix(0.15, 0.4, uIsDarkMode);
    float glowIntensity = pow(totalWater, glowPower) * glowStrength;
    vec3 color = backgroundColor + backgroundColor * glowIntensity;
    
    // === NATURAL CONCENTRATION GRADIENT MIXING ===
    // Use cubic easing for more realistic color pooling (not linear)
    float mixRatio = blob1 / max(blob1 + blob2, 0.001);
    mixRatio = mixRatio * mixRatio * (3.0 - 2.0 * mixRatio); // Cubic smoothstep
    
    // Natural mixing intensity based on overlap (no binary intersection!)
    float mixingIntensity = blob1 * blob2; // Natural where both present
    
    // Blend colors with concentration gradient
    vec3 blendedColor = mix(uColor3, uColor1, mixRatio);
    
    // === DENSITY-BASED SATURATION ===
    // More density = more saturated (like more dye concentration)
    float densitySaturation = BASE_SATURATION * (1.0 + totalWater * DENSITY_SATURATION_BOOST);
    float luminance = dot(blendedColor, vec3(0.299, 0.587, 0.114));
    blendedColor = mix(vec3(luminance), blendedColor, densitySaturation);
    
    // === HIGHLIGHTS (thick areas) & SHADOWS (thin edges) ===
    float highlight = pow(totalWater, 0.5) * mixingIntensity * 0.3; // Bright where overlapping
    float shadow = pow(1.0 - totalWater, 1.5) * 0.15; // Darken thin edges
    blendedColor = blendedColor * (1.0 + highlight) * (1.0 - shadow);
    
    // Composite blobs onto glowing background
    color = mix(color, blendedColor, totalWater);
    
    // === SUBSURFACE SCATTERING (subtle light bleed) ===
    float edgeDistance = 1.0 - totalWater;
    float subsurfaceScatter = smoothstep(0.7, 1.0, edgeDistance) * totalWater * SUBSURFACE_SCATTER_INTENSITY;
    vec3 backlight = mix(uColor1, uColor3, 0.5) * 1.3;
    color += backlight * subsurfaceScatter;
    
    // === EDGE GLOW (luminous halos) ===
    float edgeGlow = pow(1.0 - totalWater, 2.0) * totalWater * EDGE_GLOW_STRENGTH;
    color += color * edgeGlow;

    // === FINAL ATMOSPHERIC FADE ===
    float atmosphericAlpha = pow(totalWater, 0.78);
    color = mix(backgroundColor, color, atmosphericAlpha);

    gl_FragColor = vec4(color, 1.0);
  }
`

export interface WaterBlobUniforms {
  uTime: { value: number }
  uColor1: { value: [number, number, number] }
  uColor2: { value: [number, number, number] }
  uColor3: { value: [number, number, number] }
}
