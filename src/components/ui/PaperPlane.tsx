'use client'

import { forwardRef } from 'react'

interface PaperPlaneProps {
  className?: string
  style?: React.CSSProperties
}

export const PaperPlane = forwardRef<SVGSVGElement, PaperPlaneProps>(
  ({ className, style }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <g clipPath="url(#clip0_plane_new)">
          <mask id="mask0_plane_new" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="23">
            <path d="M23 0H0V23H23V0Z" fill="white"/>
          </mask>
          <g mask="url(#mask0_plane_new)">
            <path d="M21.3114 2.85412L14.0933 19.5994L7.82161 15.064L21.3114 2.85412Z" fill="currentColor" fillOpacity="0.9"/>
            <path d="M21.3121 2.85339L6.07813 13.8073L2.07014 10.9116L21.3121 2.85339Z" fill="currentColor" fillOpacity="0.7"/>
            <path d="M6.07773 13.8078L6.09182 18.2914L7.86814 15.0714L21.3115 2.85388L6.07773 13.8078Z" fill="currentColor" fillOpacity="0.5"/>
            <path d="M6.0916 18.2911L8.74949 15.738L7.85867 15.0695L6.0916 18.2911Z" fill="currentColor" fillOpacity="0.3"/>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_plane_new">
            <rect width="23" height="23" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    )
  }
)

PaperPlane.displayName = 'PaperPlane'
