'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { PaperPlane } from '@/components/ui/PaperPlane'

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin)
}

export interface PaperPlaneFlightRef {
  play: () => void
}

interface PaperPlaneFlightProps {
  onComplete?: () => void
}

export const PaperPlaneFlight = forwardRef<PaperPlaneFlightRef, PaperPlaneFlightProps>(
  ({ onComplete }, ref) => {
    const planeRef = useRef<SVGSVGElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
    const filterRef = useRef<SVGFETurbulenceElement>(null)

    // Path data: Straight line at 45 degrees
    const flightPathD = "M 0,0 L 1500,-1500"
    const PLANE_SIZE = 28
    // Nose tip in SVG (23x23) is ~ (21.3, 2.8)
    // Scaled to PLANE_SIZE: (21.3 * 36/23, 2.8 * 36/23) = (33.3, 4.4)
    const NOSE_OFFSET_X = (21.3 * PLANE_SIZE) / 23
    const NOSE_OFFSET_Y = (2.8 * PLANE_SIZE) / 23

    useImperativeHandle(ref, () => ({
      play: () => {
        if (!planeRef.current || !pathRef.current) return

        const path = pathRef.current
        const plane = planeRef.current
        const pathLength = path.getTotalLength()

        // 1. Reset state
        gsap.set(plane, { 
          x: 0, 
          y: 0, 
          rotation: 0, 
          scale: 1, 
          opacity: 1, 
          visibility: 'visible' 
        })
        
        // Setup simple trail: a dash that follows the plane
        const trailLength = 80
        const gap = 26 // distance from nose to tail (scaled for PLANE_SIZE 28)
        const initialOffset = trailLength + gap
        
        gsap.set(path, { 
          strokeDasharray: `${trailLength}, ${pathLength * 2}`,
          strokeDashoffset: initialOffset, 
          opacity: 0,
          visibility: 'visible'
        })

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to([plane, path], { 
              duration: 0.1, 
              opacity: 0, 
              onComplete: () => {
                if (onComplete) onComplete()
              }
            })
          }
        })

        // 2. Flight Animation
        tl.to(plane, {
          duration: 1.5,
          motionPath: {
            path: path,
            autoRotate: false,
            align: path,
            alignOrigin: [0.93, 0.12] // Nose tip registration
          },
          ease: "power2.in"
        }, 0)

        // 3. Simplified Trail Animation
        tl.to(path, {
          duration: 1.5,
          strokeDashoffset: initialOffset - pathLength, 
          opacity: 1,
          ease: "power2.in"
        }, 0)
      }
    }))

    return (
      <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="pencil-scribble-v12">
            <feTurbulence 
              ref={filterRef}
              type="fractalNoise" 
              baseFrequency="0.9" 
              numOctaves="3" 
              seed="1" 
              result="noise" 
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <svg 
          className="absolute overflow-visible" 
          width="1" height="1" viewBox="0 0 1 1"
          style={{ top: `${NOSE_OFFSET_Y}px`, left: `${NOSE_OFFSET_X}px` }}
        >
          <path
            ref={pathRef}
            d={flightPathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="100, 2000"
            strokeLinecap="round"
            filter="url(#pencil-scribble-v12)"
            style={{ visibility: 'hidden' }}
          />
        </svg>

        <div className="absolute" style={{ top: '0px', left: '0px' }}>
          <PaperPlane
            ref={planeRef}
            className="text-current"
            style={{ 
              width: `${PLANE_SIZE}px`, 
              height: `${PLANE_SIZE}px`,
              visibility: 'hidden' 
            }}
          />
        </div>
      </div>
    )
  }
)

PaperPlaneFlight.displayName = 'PaperPlaneFlight'
