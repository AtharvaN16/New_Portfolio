'use client'

import { useState } from 'react'
import { m } from 'framer-motion'

/** Plot area — gradients and crosshairs only live here (no nested "panel"). */
const P = {
  left: 56,
  right: 764,
  top: 52,
  bottom: 420,
} as const

const midX = (P.left + P.right) / 2
const midY = (P.top + P.bottom) / 2

const plotW = P.right - P.left
const plotH = P.bottom - P.top

const C = {
  base: 'rgb(var(--color-footer-bg))',
  crosshair: 'rgb(var(--color-text-color40))',
  qLabel: 'rgb(var(--color-text-color70))',
  axisTitle: 'rgb(var(--color-text-primary-100))',
  brandOther: 'rgb(var(--color-text-primary-100))',
  aloBrand: 'rgb(var(--color-alo-data-accent))',
} as const

/** Radius scales with sqrt of keyword count (area ∝ keywords). */
const BASE_R = 5
const REF_K = 100_000
function calcRadius(keywords: number) {
  return Math.round(BASE_R * Math.sqrt(keywords / REF_K))
}

const brands = [
  {
    name: 'Alo Yoga',
    x: 105,
    y: 367,
    keywords: 409_500,
    keywordsLabel: '409.5K',
    labelBelow: false,
  },
  {
    name: 'Vuori',
    x: 252,
    y: 230,
    keywords: 397_800,
    keywordsLabel: '397.8K',
    labelBelow: false,
  },
  {
    name: 'Lululemon',
    x: 600,
    y: 255,
    keywords: 1_500_000,
    keywordsLabel: '1.5M',
    labelBelow: false,
  },
  {
    name: 'Gymshark',
    x: 670,
    y: 143,
    keywords: 402_800,
    keywordsLabel: '402.8K',
    labelBelow: true,
  },
  {
    name: 'Under Armour',
    x: 720,
    y: 122,
    keywords: 722_600,
    keywordsLabel: '722.6K',
    labelBelow: false,
    labelLeft: true,
  },
]

const quadrantLabels = [
  { label: 'Yoga + Gender-equal', x: P.left + 8, y: P.top + 18, anchor: 'start' as const },
  {
    label: 'Multi-sport + Gender-equal',
    x: P.right - 8,
    y: P.top + 18,
    anchor: 'end' as const,
  },
  {
    label: 'Yoga + Female-dominant',
    x: P.left + 8,
    y: P.bottom - 8,
    anchor: 'start' as const,
  },
  {
    label: 'Multi-sport + Female-dominant',
    x: P.right - 8,
    y: P.bottom - 8,
    anchor: 'end' as const,
  },
] as const

const AXIS = {
  xTitleY: P.bottom + 20,
  yTitleX: 44,
} as const

const BRAND_MARKER_EASE = [0.22, 1, 0.36, 1] as const
const TOOLTIP_W = 160
const TOOLTIP_H = 78

export function AloSearchPositionMap() {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null)

  const hoveredData = hoveredBrand ? brands.find((b) => b.name === hoveredBrand) ?? null : null

  return (
    <div className="w-full overflow-hidden">
      <svg
        role="img"
        aria-label="Competitive position map for Alo Yoga search visibility"
        viewBox="0 0 820 500"
        className="h-auto w-full"
      >
        <defs>
          {/* Four corner radials layered on one plot rect — avoids left/right rectangular "halves". */}
          <radialGradient
            id="aloMap-r-tl"
            gradientUnits="userSpaceOnUse"
            cx={P.left}
            cy={P.top}
            r={Math.max(plotW, plotH) * 0.95}
          >
            <stop offset="0%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.14} />
            <stop offset="42%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.04} />
            <stop offset="100%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="aloMap-r-tr"
            gradientUnits="userSpaceOnUse"
            cx={P.right}
            cy={P.top}
            r={Math.max(plotW, plotH) * 0.95}
          >
            <stop offset="0%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.11} />
            <stop offset="42%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.04} />
            <stop offset="100%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="aloMap-r-bl"
            gradientUnits="userSpaceOnUse"
            cx={P.left}
            cy={P.bottom}
            r={Math.max(plotW, plotH) * 0.95}
          >
            <stop offset="0%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.12} />
            <stop offset="42%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.04} />
            <stop offset="100%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0} />
          </radialGradient>
          <radialGradient
            id="aloMap-r-br"
            gradientUnits="userSpaceOnUse"
            cx={P.right}
            cy={P.bottom}
            r={Math.max(plotW, plotH) * 0.95}
          >
            <stop offset="0%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.09} />
            <stop offset="42%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0.04} />
            <stop offset="100%" stopColor="rgb(var(--color-text-primary-100))" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width="820" height="500" fill={C.base} />
        <rect x={P.left} y={P.top} width={plotW} height={plotH} fill="url(#aloMap-r-tr)" />
        <rect x={P.left} y={P.top} width={plotW} height={plotH} fill="url(#aloMap-r-bl)" />
        <rect x={P.left} y={P.top} width={plotW} height={plotH} fill="url(#aloMap-r-br)" />

        <line
          x1={midX}
          y1={P.top}
          x2={midX}
          y2={P.bottom}
          stroke={C.crosshair}
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />
        <line
          x1={P.left}
          y1={midY}
          x2={P.right}
          y2={midY}
          stroke={C.crosshair}
          strokeWidth={1.5}
          strokeDasharray="6 5"
        />

        <g
          fill={C.qLabel}
          opacity={0.45}
          style={{ fontSize: 11, fontWeight: 600, fontFamily: 'monospace', textTransform: 'uppercase' }}
        >
          {quadrantLabels.map(({ label, x, y, anchor }) => (
            <text key={label} x={x} y={y} textAnchor={anchor}>
              {label.toUpperCase()}
            </text>
          ))}
        </g>

        <text
          x={(P.left + P.right) / 2}
          y={AXIS.xTitleY}
          textAnchor="middle"
          fill={C.axisTitle}
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          Sport breadth (Yoga-only → Multi-sport)
        </text>

        <text
          x={AXIS.yTitleX}
          y={midY}
          textAnchor="middle"
          transform={`rotate(-90 ${AXIS.yTitleX} ${midY})`}
          fill={C.axisTitle}
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          Audience gender balance
        </text>

        {brands.map(({ name, x, y, keywords, labelBelow, ...rest }, index) => {
          const labelLeft = 'labelLeft' in rest && rest.labelLeft
          const r = calcRadius(keywords)
          const isAlo = name === 'Alo Yoga'
          const fill = isAlo ? C.aloBrand : C.brandOther
          const isHovered = hoveredBrand === name

          const labelX = labelLeft ? x - r - 5 : x + r + 5
          const labelAnchor = labelLeft ? 'end' : 'start'
          const labelY = labelBelow ? y + r + 14 : y - r - 4

          return (
            <m.g
              key={name}
              data-testid="alo-map-brand-marker"
              initial={{ opacity: 0, scale: 0.82 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center', cursor: 'pointer' }}
              transition={{
                delay: 0.18 + index * 0.08,
                duration: 0.58,
                ease: BRAND_MARKER_EASE,
              }}
              viewport={{ once: true, margin: '-8% 0px -18% 0px' }}
              whileInView={{ opacity: 1, scale: 1 }}
              onMouseEnter={() => setHoveredBrand(name)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={fill}
                fillOpacity={isHovered ? 1 : 0.75}
                style={{ transition: 'fill-opacity 0.15s ease' }}
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={labelAnchor}
                fill={fill}
                style={{ fontSize: 13, fontWeight: 700 }}
              >
                {name}
              </text>
            </m.g>
          )
        })}

        {/* Tooltip — rendered last so it sits above all markers */}
        {hoveredData &&
          (() => {
            const r = calcRadius(hoveredData.keywords)
            const nearRight = hoveredData.x > midX
            const rawTx = nearRight
              ? hoveredData.x - r - 12 - TOOLTIP_W
              : hoveredData.x + r + 12
            const rawTy = hoveredData.y - TOOLTIP_H / 2
            const tx = Math.max(P.left, Math.min(P.right - TOOLTIP_W, rawTx))
            const ty = Math.max(P.top, Math.min(P.bottom - TOOLTIP_H, rawTy))
            const isAlo = hoveredData.name === 'Alo Yoga'
            const accentFill = isAlo ? C.aloBrand : C.brandOther

            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={tx}
                  y={ty}
                  width={TOOLTIP_W}
                  height={TOOLTIP_H}
                  rx={4}
                  fill={C.base}
                  stroke="rgb(var(--color-text-color40))"
                  strokeWidth={1}
                />
                {/* Brand name */}
                <text
                  x={tx + 12}
                  y={ty + 18}
                  fill="rgb(var(--color-text-color70))"
                  style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}
                >
                  {hoveredData.name}
                </text>
                {/* Keyword count + upward arrow */}
                <text x={tx + 12} y={ty + 50} style={{ fontSize: 20, fontWeight: 800 }}>
                  <tspan fill={accentFill}>{hoveredData.keywordsLabel}</tspan>
                  <tspan fill="#22c55e" dx={5} style={{ fontSize: 14, fontWeight: 700 }}>
                    ↑
                  </tspan>
                </text>
                {/* "organic keywords" label */}
                <text
                  x={tx + 12}
                  y={ty + 65}
                  fill="rgb(var(--color-text-color70))"
                  style={{ fontSize: 10, fontWeight: 500 }}
                >
                  organic keywords
                </text>
              </g>
            )
          })()}
      </svg>
    </div>
  )
}
