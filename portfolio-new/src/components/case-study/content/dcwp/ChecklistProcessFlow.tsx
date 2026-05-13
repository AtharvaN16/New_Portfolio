'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ChecklistProcessFlowArrows } from '@/components/case-study/content/dcwp/ChecklistProcessFlowArrows'
import { ChecklistProcessFlowBrackets } from '@/components/case-study/content/dcwp/ChecklistProcessFlowBrackets'
import { ChecklistProcessFlowChecklistNodes } from '@/components/case-study/content/dcwp/ChecklistProcessFlowChecklistNodes'
import { ChecklistProcessFlowGmkNodes } from '@/components/case-study/content/dcwp/ChecklistProcessFlowGmkNodes'
import { ChecklistProcessFlowPhaseTabs } from '@/components/case-study/content/dcwp/ChecklistProcessFlowPhaseTabs'
import { useTheme } from '@/components/providers/ThemeProvider'
import { getChecklistProcessFlowPalette } from '@/components/case-study/content/dcwp/checklistProcessFlowPalette'
import { useDiagramPhaseCycle } from '@/components/case-study/content/dcwp/useDiagramPhaseCycle'

interface ChecklistProcessFlowProps {
  /** When true, stops phase cycling; E blue only; G–M gray; chain arrows blue. */
  animationPaused?: boolean
}

export function ChecklistProcessFlow({
  animationPaused = false,
}: ChecklistProcessFlowProps) {
  const { theme } = useTheme()
  const palette = getChecklistProcessFlowPalette(theme)
  const {
    nodeGray,
    nodeGrayBorder,
    nodeText,
    phaseBlue,
    blueNodeBg,
    yellowGreen,
    arrowGray,
    redColor,
    bracketPillFill,
    receiveLicenseText,
  } = palette

  const [scrollMode, setScrollMode] = useState(false)
  const [isMdUp, setIsMdUp] = useState(false)
  const { phase: diagramPhase, reducedMotion } =
    useDiagramPhaseCycle(animationPaused)

  const pauseMode = animationPaused

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const apply = () => setIsMdUp(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /** Desktop: always wide + scroll. Mobile: fit full diagram; tap toggles wide scroll. */
  const wideScroll = isMdUp || scrollMode
  const mobileToggle = !isMdUp

  /** Non-focused lanes stay readable; highlights are removed (neutral grays) when not active. */
  const DEEMPHASIS = 0.72
  const checklistFade =
    pauseMode || diagramPhase === 'idle' ? 1 : DEEMPHASIS
  const ghiFade =
    pauseMode || diagramPhase === 'portal' ? 1 : DEEMPHASIS
  const jmkFade =
    pauseMode || diagramPhase === 'dashboard' ? 1 : DEEMPHASIS

  const checklistFocus = !pauseMode && diagramPhase === 'idle'
  const portalFocus = !pauseMode && diagramPhase === 'portal'
  const dashboardFocus = !pauseMode && diagramPhase === 'dashboard'

  const checklistDashAnim =
    checklistFocus && !reducedMotion ? 'cpf-dash-anim' : undefined
  const portalDashAnim =
    portalFocus && !reducedMotion ? 'cpf-dash-anim' : undefined
  const dashboardDashAnim =
    dashboardFocus && !reducedMotion ? 'cpf-dash-anim' : undefined

  // ── Coordinate system ──────────────────────────────────────────────────────
  // viewBox: 0 0 1520 472
  //
  // y=180   → red feedback horizontal track (24px above Node E top at y=204)
  // y=172   → red arc labels
  // y=64    → phase header tops
  // y=96    → phase header bottoms
  // Gap phase tabs → first flow row: 64px (B top @ y=160)
  // y=160   → Node B top
  // y=204   → Node E top
  // y=250   → Node K top
  // y=252   → Nodes A/C/G/H/I/J top   (main flow y-band)
  // y=302   → Node F top
  // y=342   → Node D top
  // y=439   → bracket line + pill labels (y=447)
  //
  // Phase columns:
  //   PREPARATION         x = 1  – 402
  //   APPLICATION PROCESS x = 406 – 1068
  //   POST APPLICATION    x = 1072 – 1519 (includes Manage application before Receive License)
  //
  // E and F (x=412) are fully inside APPLICATION PROCESS ✓
  // G–H gap = 38 px, H–I gap = 38 px ✓
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        'w-full',
        wideScroll ? 'overflow-x-auto touch-pan-x' : 'overflow-hidden',
        mobileToggle && 'cursor-pointer',
      )}
      onClick={() => {
        if (mobileToggle) setScrollMode((s) => !s)
      }}
      onKeyDown={(e) => {
        if (mobileToggle && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setScrollMode((s) => !s)
        }
      }}
      role={mobileToggle ? 'button' : undefined}
      tabIndex={mobileToggle ? 0 : undefined}
      aria-pressed={mobileToggle ? scrollMode : undefined}
      aria-label={
        mobileToggle
          ? scrollMode
            ? 'HIC license application process flow diagram — tap to fit the full diagram on screen'
            : 'HIC license application process flow diagram — tap to enlarge and scroll horizontally'
          : undefined
      }
    >
      <svg
        viewBox="0 0 1520 472"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'block h-auto',
          wideScroll ? 'w-full min-w-[1044px] max-w-none' : 'w-full',
        )}
        aria-hidden={mobileToggle}
        role={isMdUp ? 'img' : undefined}
        aria-label={
          isMdUp ? 'HIC license application process flow diagram' : undefined
        }
      >
        <defs>
          <clipPath id="cpf-bracket-clip-checklist">
            <rect x="238" y="431" width="118" height="24" rx="4" />
          </clipPath>
          <clipPath id="cpf-bracket-clip-portal">
            <rect x="759" y="431" width="140" height="24" rx="4" />
          </clipPath>
          <clipPath id="cpf-bracket-clip-dashboard">
            <rect x="1246" y="431" width="100" height="24" rx="4" />
          </clipPath>
          <filter id="cpf-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="1.25" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="cpf-arrow" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill={arrowGray} />
          </marker>
          <marker id="cpf-arrow-blue" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill={phaseBlue} />
          </marker>
          <marker id="cpf-red" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill={redColor} />
          </marker>
          <style type="text/css">
            {`
              /* Dash period 6+4=10; offset -10 loops seamlessly (reduces stutter). */
              @keyframes cpf-dash-spin {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: -10; }
              }
              .cpf-dash-anim {
                will-change: stroke-dashoffset;
                animation: cpf-dash-spin 1.05s linear infinite;
              }
              @keyframes cpf-bracket-fill-118 {
                from { width: 0; }
                to { width: 118px; }
              }
              @keyframes cpf-bracket-fill-140 {
                from { width: 0; }
                to { width: 140px; }
              }
              @keyframes cpf-bracket-fill-100 {
                from { width: 0; }
                to { width: 100px; }
              }
              .cpf-bracket-fill-118 {
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-name: cpf-bracket-fill-118;
              }
              .cpf-bracket-fill-140 {
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-name: cpf-bracket-fill-140;
              }
              .cpf-bracket-fill-100 {
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-name: cpf-bracket-fill-100;
              }
            `}
          </style>
        </defs>

        <ChecklistProcessFlowPhaseTabs
          phase={diagramPhase}
          phaseBlue={phaseBlue}
          paused={pauseMode}
        />

        <ChecklistProcessFlowChecklistNodes
          checklistFade={checklistFade}
          checklistFocus={checklistFocus}
          paused={pauseMode}
          checklistDashAnim={checklistDashAnim}
          blueNodeBg={blueNodeBg}
          phaseBlue={phaseBlue}
          nodeGray={nodeGray}
          nodeGrayBorder={nodeGrayBorder}
          nodeText={nodeText}
        />

        <ChecklistProcessFlowGmkNodes
          pauseMode={pauseMode}
          portalFocus={portalFocus}
          dashboardFocus={dashboardFocus}
          portalDashAnim={portalDashAnim}
          dashboardDashAnim={dashboardDashAnim}
          ghiFade={ghiFade}
          jmkFade={jmkFade}
          blueNodeBg={blueNodeBg}
          phaseBlue={phaseBlue}
          nodeGray={nodeGray}
          nodeGrayBorder={nodeGrayBorder}
          nodeText={nodeText}
          yellowGreen={yellowGreen}
          receiveLicenseText={receiveLicenseText}
        />

        <ChecklistProcessFlowArrows
          arrowGray={arrowGray}
          redColor={redColor}
          accentBlue={phaseBlue}
          pauseChainBlue={pauseMode}
        />

        <ChecklistProcessFlowBrackets
          phase={diagramPhase}
          phaseBlue={phaseBlue}
          arrowGray={arrowGray}
          nodeText={nodeText}
          bracketPillFill={bracketPillFill}
          paused={pauseMode}
          reducedMotion={reducedMotion}
        />
      </svg>
    </div>
  )
}
