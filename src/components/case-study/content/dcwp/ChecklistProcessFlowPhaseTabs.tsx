import type { DiagramPhase } from '@/components/case-study/content/dcwp/useDiagramPhaseCycle'

interface ChecklistProcessFlowPhaseTabsProps {
  phase: DiagramPhase
  phaseBlue: string
  /** All tabs equally faded (animation paused). */
  paused: boolean
}

/** Inactive tabs only — stronger fade than lane de-emphasis on the diagram. */
const TAB_INACTIVE = 0.32
const fade = 'opacity 0.65s ease'

export function ChecklistProcessFlowPhaseTabs({
  phase,
  phaseBlue,
  paused,
}: ChecklistProcessFlowPhaseTabsProps) {
  /** Paused: no fading — all tabs full opacity. */
  const op = (p: DiagramPhase) =>
    paused ? 1 : phase === p ? 1 : TAB_INACTIVE

  return (
    <>
      <g style={{ opacity: op('idle'), transition: fade }}>
        <rect x="1" y="64" width="401" height="32" rx="2" fill={phaseBlue} />
        <text x="201" y="85" fill="white" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fontFamily="system-ui,sans-serif">PREPARATION</text>
      </g>
      <g style={{ opacity: op('portal'), transition: fade }}>
        <rect x="406" y="64" width="662" height="32" rx="2" fill={phaseBlue} />
        <text x="737" y="85" fill="white" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fontFamily="system-ui,sans-serif">APPLICATION PROCESS</text>
      </g>
      <g style={{ opacity: op('dashboard'), transition: fade }}>
        <rect x="1072" y="64" width="448" height="32" rx="2" fill={phaseBlue} />
        <text x="1296" y="85" fill="white" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="2.5" fontFamily="system-ui,sans-serif">POST APPLICATION</text>
      </g>
    </>
  )
}
