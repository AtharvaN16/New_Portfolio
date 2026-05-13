'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { LINE_SEPARATOR, COMPONENT_SPACING } from '@/constants';

interface LineSeparatorProps {
  className?: string;
  style?: React.CSSProperties;
  onMouseLeave?: () => void;
}

const LineSeparator: React.FC<LineSeparatorProps> = ({ 
  className = '', 
  style = {},
  onMouseLeave
}) => {
  const separatorRef = useRef<SVGPathElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pluckAnimRef = useRef<gsap.core.Tween | null>(null);
  const wiggleAnimRef = useRef<gsap.core.Tween | null>(null);
  const hasAnimatedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const scrollTriggerRef = useRef<any>(null); // Use 'any' to avoid type conflicts
  
  // Pluck state
  const pluck = useRef({ x: 0, amplitude: 0 });

  // Generate pluck path with deformation
  const getPluckPath = (width: number, t: number, pluckX: number | null = null, pluckAmp: number = 0, isPluck: boolean = false) => {
    const points = LINE_SEPARATOR.POINTS;
    const amp = LINE_SEPARATOR.AMPLITUDE * t;
    const coords: [number, number][] = [];
    for (let i = 0; i <= points; i++) {
      const x = (width / points) * i;
      let y = 1;
      // Add wiggle (for initial animation)
      if (!isPluck) {
        y += Math.sin((i / points) * Math.PI * 1.2 + t * Math.PI * 1.2) * amp * Math.pow(i / points, 1.5);
      } else {
        y += Math.sin((i / points) * Math.PI * 1.2 + t * Math.PI * 1.2) * amp * Math.pow(i / points, 0.8);
      }
      // Add pluck if active (works for both positive and negative amplitudes)
      if (pluckX !== null && pluckAmp !== 0) {
        // Gaussian falloff for pluck
        const dist = Math.abs(x - pluckX);
        const falloff = Math.exp(-Math.pow(dist / LINE_SEPARATOR.FALLOFF_DISTANCE, 2));
        y += Math.sin((i / points) * Math.PI) * pluckAmp * falloff;
      }
      coords.push([x, y]);
    }
    let d = `M${coords[0][0]} ${coords[0][1]}`;
    for (let i = 0; i < points; i++) {
      const [x0, y0] = coords[i];
      const [x1, y1] = coords[i + 1];
      const cpx1 = x0 + (x1 - x0) / 3;
      const cpy1 = y0;
      const cpx2 = x0 + 2 * (x1 - x0) / 3;
      const cpy2 = y1;
      d += ` C${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x1} ${y1}`;
    }
    return d;
  };

  // Mouse move handler for pluck effect (now smooth)
  const handleLineMouseMove = (e: React.MouseEvent) => {
    const path = separatorRef.current;
    if (!path || !isVisibleRef.current) return;
    const svg = path.ownerSVGElement;
    const svgWidth = svg ? svg.getBoundingClientRect().width : window.innerWidth;
    const width = Math.max(svgWidth, 0);
    const rect = svg ? svg.getBoundingClientRect() : { left: 0, top: 0, height: 0 };
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate amplitude based on vertical position relative to line center
    const lineCenterY = rect.height / 2; // Line is at the center of the SVG
    const verticalOffset = y - lineCenterY;
    const maxAmplitude = LINE_SEPARATOR.MAX_AMPLITUDE;

    // Amplitude is positive when cursor is below the line, negative when above
    const amplitude = Math.max(-maxAmplitude, Math.min(maxAmplitude, -verticalOffset * LINE_SEPARATOR.AMPLITUDE_MULTIPLIER));
    
    // Animate pluckX and amplitude smoothly
    if (pluckAnimRef.current) pluckAnimRef.current.kill();
    const pluckState = { x: pluck.current.x, amplitude: pluck.current.amplitude };
    pluckAnimRef.current = gsap.to(pluckState, {
      x,
      amplitude,
      duration: LINE_SEPARATOR.PLUCK_DURATION,
      ease: LINE_SEPARATOR.PLUCK_EASE,
      onUpdate: () => {
        pluck.current.x = pluckState.x;
        pluck.current.amplitude = pluckState.amplitude;
        path.setAttribute('d', getPluckPath(width, 0, pluck.current.x, pluck.current.amplitude, true));
      }
    });
    // Don't make visible until scroll animation triggers
  };

  // Mouse leave handler for pluck effect (smooth return)
  const handleLineMouseLeave = () => {
    const path = separatorRef.current;
    if (!path || !isVisibleRef.current) return;
    const svg = path.ownerSVGElement;
    const svgWidth = svg ? svg.getBoundingClientRect().width : window.innerWidth;
    const width = Math.max(svgWidth, 0);
    if (pluckAnimRef.current) pluckAnimRef.current.kill();
    const pluckState = { x: pluck.current.x, amplitude: pluck.current.amplitude };
    pluckAnimRef.current = gsap.to(pluckState, {
      amplitude: 0,
      duration: LINE_SEPARATOR.SETTLE_DURATION,
      ease: LINE_SEPARATOR.SETTLE_EASE,
      onUpdate: () => {
        pluck.current.x = pluckState.x;
        pluck.current.amplitude = pluckState.amplitude;
        path.setAttribute('d', getPluckPath(width, 0, pluck.current.x, pluck.current.amplitude, true));
      },
      onComplete: () => {
        path.setAttribute('d', getPluckPath(width, 0, null, 0, false));
      }
    });
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  // Wiggly line animation function (original guitar pluck - DO NOT CHANGE)
  const getPath = (width: number, t: number) => {
    const points = 5;
    const amp = 30 * t;
    const coords: [number, number][] = [];
    for (let i = 0; i <= points; i++) {
      const x = (width / points) * i;
      const decay = Math.pow(i / points, 1.5);
      const phase = t * Math.PI * 1.2 + (1 - t) * Math.PI * 0.2;
      const y = 1 + Math.sin((i / points) * Math.PI * 1.2 + phase) * amp * decay;
      coords.push([x, y]);
    }
    let d = `M${coords[0][0]} ${coords[0][1]}`;
    for (let i = 0; i < points; i++) {
      const [x0, y0] = coords[i];
      const [x1, y1] = coords[i + 1];
      const cpx1 = x0 + (x1 - x0) / 3;
      const cpy1 = y0;
      const cpx2 = x0 + 2 * (x1 - x0) / 3;
      const cpy2 = y1;
      d += ` C${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x1} ${y1}`;
    }
    return d;
  };

  // Create line animation function
  const createLineAnimation = (pathEl: SVGPathElement) => {
    const svg = pathEl.ownerSVGElement;
    const svgWidth = svg ? svg.getBoundingClientRect().width : window.innerWidth;
    const width = Math.max(svgWidth, 0);
    const dashLength = pathEl.getTotalLength();
    const state = { t: 0, dash: dashLength };

    const tl = gsap.timeline();
    tl.to(state, {
      t: 1,
      dash: 0,
      duration: LINE_SEPARATOR.REVEAL_DURATION,
      ease: LINE_SEPARATOR.REVEAL_EASE,
      onUpdate: function() {
        let whipT = state.t < 0.7 ? state.t / 0.7 : 1 - (state.t - 0.7) / 0.3;
        whipT = Math.max(0, Math.min(1, whipT));
        pathEl.setAttribute('d', getPath(width, whipT * 1.25));
        pathEl.setAttribute('stroke-dashoffset', String(state.dash));
      },
      onComplete: function() {
        pathEl.setAttribute('d', getPath(width, 0));
        pathEl.setAttribute('stroke-dashoffset', '0');
        pathEl.setAttribute('stroke-opacity', '1');
        pathEl.setAttribute('opacity', '1');
        pathEl.style.strokeOpacity = '1';
        pathEl.style.opacity = '1';
        isVisibleRef.current = true;
      }
    }, 0);
    tl.to(pathEl, { strokeOpacity: 1, opacity: 1, duration: LINE_SEPARATOR.REVEAL_DURATION, ease: LINE_SEPARATOR.FADE_EASE }, 0);
  };

  // Initialize and setup ScrollTrigger
  useEffect(() => {
    let ScrollTriggerModule: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;
    const path = separatorRef.current;
    const wrapper = wrapperRef.current;
    
    if (!path || !wrapper) return;

    // Setup initial path state
    const setupPath = () => {
      const svg = path.ownerSVGElement;
      const svgWidth = svg ? svg.getBoundingClientRect().width : window.innerWidth;
      const width = Math.max(svgWidth, 0);
      const d = getPath(width, 0);
      path.setAttribute('d', d);
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', String(length));
      path.setAttribute('stroke-dashoffset', String(length));
      path.setAttribute('stroke-opacity', '0');
      path.setAttribute('opacity', '0');
    };

    setupPath();

    // Force invisible state - especially important for footer separator
    if (path) {
      path.style.strokeOpacity = '0';
      path.style.opacity = '0';
      path.setAttribute('stroke-opacity', '0');
      path.setAttribute('opacity', '0');
    }

    // Create ScrollTrigger with proper failsafes
    const initScrollTrigger = async () => {
      try {
        if (!ScrollTriggerModule) {
          const mod = await import('gsap/ScrollTrigger');
          ScrollTriggerModule = mod.ScrollTrigger;
          gsap.registerPlugin(ScrollTriggerModule);
        }

        // Use different trigger points to ensure both fire
        const isFooterContainer = wrapper.parentElement?.classList.contains('footer-line-separator-container');
        const isFooterSeparator = wrapper.classList.contains('footer-separator');
        const isTopSeparator = wrapper.classList.contains('top-separator');
        const triggerStart = (isFooterContainer || isFooterSeparator) ? LINE_SEPARATOR.SCROLL_TRIGGER_FOOTER_OFFSET : `top ${LINE_SEPARATOR.SCROLL_TRIGGER_TOP_OFFSET}`;
        const separatorType = isFooterContainer || isFooterSeparator ? 'footer' : 'top';
        // Use the non-sticky parent container as the trigger when available
        const triggerElement = wrapper.parentElement || wrapper;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`LineSeparator [${separatorType}] init:`, { 
            isFooterContainer,
            isFooterSeparator,
            isTopSeparator,
            triggerStart, 
            wrapperElement: wrapper.className,
            parentContainer: wrapper.parentElement?.className,
            triggerElementClass: (triggerElement as HTMLElement).className,
            pathOpacity: path.getAttribute('stroke-opacity'),
            hasAnimated: hasAnimatedRef.current
          });
        }

        const st = ScrollTriggerModule.create({
          trigger: triggerElement,
          start: triggerStart,
          once: true,
          onEnter: () => {
            if (process.env.NODE_ENV === 'development') {
              console.log(`ScrollTrigger [${separatorType}] onEnter fired:`, {
                hasAnimated: hasAnimatedRef.current,
                pathExists: !!separatorRef.current,
                wrapperClass: wrapper.className,
                parentClass: wrapper.parentElement?.className,
                triggerClass: (triggerElement as HTMLElement).className
              });
            }
            
            if (hasAnimatedRef.current) {
              if (process.env.NODE_ENV === 'development') {
                console.log(`ScrollTrigger [${separatorType}] SKIPPED - already animated`);
              }
              return;
            }
            hasAnimatedRef.current = true;
            
            // Delay before animation
            setTimeout(() => {
              if (separatorRef.current) {
                if (process.env.NODE_ENV === 'development') {
                  console.log(`Starting animation for [${separatorType}] separator`);
                }
                createLineAnimation(separatorRef.current);
              }
            }, LINE_SEPARATOR.DELAY_BEFORE_ANIMATION);
          }
        });

        scrollTriggerRef.current = st;
        
        // Call refresh after a short delay to ensure proper positioning
        setTimeout(() => {
          ScrollTriggerModule?.refresh();
        }, LINE_SEPARATOR.SCROLL_TRIGGER_REFRESH_DELAY);
        
      } catch (error) {
        console.warn('ScrollTrigger initialization failed:', error);
        // Fallback without ScrollTrigger
        setTimeout(() => {
          if (!hasAnimatedRef.current && separatorRef.current) {
            hasAnimatedRef.current = true;
            setTimeout(() => {
              if (separatorRef.current) {
                createLineAnimation(separatorRef.current);
              }
            }, LINE_SEPARATOR.DELAY_BEFORE_ANIMATION);
          }
        }, LINE_SEPARATOR.FALLBACK_ANIMATION_DELAY);
      }
    };

    initScrollTrigger();

    // Resize handler with debounce
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setupPath();
        if (ScrollTriggerModule) {
          ScrollTriggerModule.refresh();
        }
      }, LINE_SEPARATOR.RESIZE_DEBOUNCE_DELAY);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      if (pluckAnimRef.current) pluckAnimRef.current.kill();
      if (wiggleAnimRef.current) wiggleAnimRef.current.kill();
      if (scrollTriggerRef.current) {
        try {
          scrollTriggerRef.current.kill();
        } catch (error) {
          console.warn('ScrollTrigger cleanup failed:', error);
        }
        scrollTriggerRef.current = null;
      }
    };
  }, []); // No dependencies - identical behavior for all separators

  return (
    <div 
      ref={wrapperRef}
      className={`line-separator-wrapper ${className}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: LINE_SEPARATOR.Z_INDEX,
        width: '100%',
        paddingLeft: COMPONENT_SPACING.LINE_SEPARATOR_PADDING_HORIZONTAL,
        paddingTop: COMPONENT_SPACING.LINE_SEPARATOR_PADDING_VERTICAL,
        paddingBottom: COMPONENT_SPACING.LINE_SEPARATOR_PADDING_VERTICAL,
        paddingRight: COMPONENT_SPACING.LINE_SEPARATOR_PADDING_HORIZONTAL,
        background: 'transparent',
        marginTop: 'none',
        marginBottom: COMPONENT_SPACING.LINE_SEPARATOR_MARGIN_BOTTOM,
        ...style
      }}
    >
      <div 
        className="line-separator-inner"
        style={{
          overflow: 'hidden'
        }}
      >
        <svg
          className="line-separator-svg"
          width="100%"
          height={LINE_SEPARATOR.SVG_HEIGHT}
          style={{ overflow: 'visible' }}
          onMouseMove={handleLineMouseMove}
          onMouseLeave={handleLineMouseLeave}
        >
          <path
            ref={separatorRef}
            d=""
            stroke="var(--color-line-separator)"
            strokeWidth={1.5}
            strokeOpacity="0"
            opacity="0"
            style={{ strokeOpacity: 0, opacity: 0 }} // Force invisible state with inline style
            fill="none"
            strokeLinecap="round"
            transform="translate(0, 40)"
            className="line-separator-path"
          />
        </svg>
      </div>
    </div>
  );
};

export default LineSeparator; 