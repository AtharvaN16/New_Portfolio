import type { DiagramPhase } from '@/components/case-study/content/dcwp/useDiagramPhaseCycle'
import {
  DASHBOARD_DELAY_MS,
  IDLE_RESET_MS,
  PORTAL_DELAY_MS,
} from '@/components/case-study/content/dcwp/diagramPhaseConstants'

interface ChecklistProcessFlowBracketsProps {
  phase: DiagramPhase
  phaseBlue: string
  arrowGray: string
  nodeText: string
  bracketPillFill: string
  paused: boolean
  reducedMotion: boolean
}

const fadeTransition = 'opacity 0.65s ease'
/** Matches lane de-emphasis in ChecklistProcessFlow — readable, not washed out. */
const DEEMPHASIS = 0.72

/** Bottom scope brackets: Checklist + Application Portal + Dashboard; L→R fill while phase is active. */
export function ChecklistProcessFlowBrackets({
  phase,
  phaseBlue,
  arrowGray,
  nodeText,
  bracketPillFill,
  paused,
  reducedMotion,
}: ChecklistProcessFlowBracketsProps) {
  const checklistOn = !paused && phase === 'idle'
  const portalOn = !paused && phase === 'portal'
  const dashboardOn = !paused && phase === 'dashboard'

  /** Paused: no lane fading — full opacity on all bracket groups. */
  const checklistOpacity = paused ? 1 : checklistOn ? 1 : DEEMPHASIS
  const portalOpacity = paused ? 1 : portalOn ? 1 : DEEMPHASIS
  const dashboardOpacity = paused ? 1 : dashboardOn ? 1 : DEEMPHASIS

  const showFill = !paused && !reducedMotion
  const fillOpacity = 0.42

  return (
    <g>
      <g style={{ opacity: checklistOpacity, transition: fadeTransition }}>
        <line
          x1="12"
          y1="439"
          x2="582"
          y2="439"
          stroke={checklistOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="12"
          y1="433"
          x2="12"
          y2="445"
          stroke={checklistOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="582"
          y1="433"
          x2="582"
          y2="445"
          stroke={checklistOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <g clipPath="url(#cpf-bracket-clip-checklist)">
          <rect x="238" y="431" width="118" height="24" fill={bracketPillFill} />
          {checklistOn && (
            <rect
              x="238"
              y="431"
              height="24"
              fill={phaseBlue}
              opacity={fillOpacity}
              width={reducedMotion ? 118 : 0}
              className={showFill ? 'cpf-bracket-fill-118' : undefined}
              style={showFill ? { animationDuration: `${PORTAL_DELAY_MS}ms` } : undefined}
            />
          )}
        </g>
        <rect
          x="238"
          y="431"
          width="118"
          height="24"
          rx="4"
          fill="none"
          stroke={checklistOn ? phaseBlue : arrowGray}
          strokeWidth={checklistOn ? 1.5 : 1.5}
          filter={checklistOn ? 'url(#cpf-glow)' : undefined}
        />
        <text
          x="297"
          y="447"
          fill={checklistOn ? 'white' : nodeText}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="500"
          fontFamily="system-ui,sans-serif"
        >
          Checklist Page
        </text>
      </g>

      <g style={{ opacity: portalOpacity, transition: fadeTransition }}>
        <line
          x1="586"
          y1="439"
          x2="1072"
          y2="439"
          stroke={portalOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="586"
          y1="433"
          x2="586"
          y2="445"
          stroke={portalOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="1072"
          y1="433"
          x2="1072"
          y2="445"
          stroke={portalOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <g clipPath="url(#cpf-bracket-clip-portal)">
          <rect x="759" y="431" width="140" height="24" fill={bracketPillFill} />
          {portalOn && (
            <rect
              x="759"
              y="431"
              height="24"
              fill={phaseBlue}
              opacity={fillOpacity}
              width={reducedMotion ? 140 : 0}
              className={showFill ? 'cpf-bracket-fill-140' : undefined}
              style={showFill ? { animationDuration: `${DASHBOARD_DELAY_MS}ms` } : undefined}
            />
          )}
        </g>
        <rect
          x="759"
          y="431"
          width="140"
          height="24"
          rx="4"
          fill="none"
          stroke={portalOn ? phaseBlue : arrowGray}
          strokeWidth={portalOn ? 2 : 1.5}
          filter={portalOn ? 'url(#cpf-glow)' : undefined}
        />
        <text
          x="829"
          y="447"
          fill={portalOn ? 'white' : nodeText}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="500"
          fontFamily="system-ui,sans-serif"
        >
          Application Portal
        </text>
      </g>

      <g style={{ opacity: dashboardOpacity, transition: fadeTransition }}>
        <line
          x1="1076"
          y1="439"
          x2="1516"
          y2="439"
          stroke={dashboardOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="1076"
          y1="433"
          x2="1076"
          y2="445"
          stroke={dashboardOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <line
          x1="1516"
          y1="433"
          x2="1516"
          y2="445"
          stroke={dashboardOn ? phaseBlue : arrowGray}
          strokeWidth="1.5"
        />
        <g clipPath="url(#cpf-bracket-clip-dashboard)">
          <rect x="1246" y="431" width="100" height="24" fill={bracketPillFill} />
          {dashboardOn && (
            <rect
              x="1246"
              y="431"
              height="24"
              fill={phaseBlue}
              opacity={fillOpacity}
              width={reducedMotion ? 100 : 0}
              className={showFill ? 'cpf-bracket-fill-100' : undefined}
              style={showFill ? { animationDuration: `${IDLE_RESET_MS}ms` } : undefined}
            />
          )}
        </g>
        <rect
          x="1246"
          y="431"
          width="100"
          height="24"
          rx="4"
          fill="none"
          stroke={dashboardOn ? phaseBlue : arrowGray}
          strokeWidth={dashboardOn ? 2 : 1.5}
          filter={dashboardOn ? 'url(#cpf-glow)' : undefined}
        />
        <text
          x="1296"
          y="447"
          fill={dashboardOn ? 'white' : nodeText}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="500"
          fontFamily="system-ui,sans-serif"
        >
          Dashboard
        </text>
      </g>
    </g>
  )
}
