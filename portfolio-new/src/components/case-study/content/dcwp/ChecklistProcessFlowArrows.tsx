interface ChecklistProcessFlowArrowsProps {
  arrowGray: string
  redColor: string
  accentBlue: string
  /** G→M chain + E→merge→G (top only) blue when paused; bottom fork→merge always gray. */
  pauseChainBlue: boolean
}

export function ChecklistProcessFlowArrows({
  arrowGray,
  redColor,
  accentBlue,
  pauseChainBlue,
}: ChecklistProcessFlowArrowsProps) {
  /** Top route (Start online app) to merge + into Complete — blue only while paused. */
  const topMerge = pauseChainBlue ? accentBlue : arrowGray
  const topMergeMarker = pauseChainBlue ? 'url(#cpf-arrow-blue)' : 'url(#cpf-arrow)'
  /** G → Manage application row — blue when paused teaching mode. */
  const chain = pauseChainBlue ? accentBlue : arrowGray
  const chainMarker = pauseChainBlue ? 'url(#cpf-arrow-blue)' : 'url(#cpf-arrow)'

  return (
    <g>
      <line x1="187" y1="288" x2="204" y2="288" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />
      <line x1="206" y1="196" x2="206" y2="372" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="206" y1="196" x2="215" y2="196" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />
      <line x1="206" y1="280" x2="215" y2="280" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />
      <line x1="206" y1="372" x2="215" y2="372" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />

      <line x1="383" y1="196" x2="398" y2="196" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="383" y1="280" x2="398" y2="280" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="383" y1="372" x2="398" y2="372" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="398" y1="196" x2="398" y2="372" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="398" y1="228" x2="412" y2="228" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />
      <line x1="398" y1="335" x2="412" y2="335" stroke={arrowGray} strokeWidth="1.5" markerEnd="url(#cpf-arrow)" />

      <line x1="567" y1="228" x2="582" y2="228" stroke={topMerge} strokeWidth="1.5" />
      <line x1="567" y1="335" x2="582" y2="335" stroke={arrowGray} strokeWidth="1.5" />
      <line x1="582" y1="228" x2="582" y2="276" stroke={topMerge} strokeWidth="1.5" />
      <line x1="582" y1="276" x2="582" y2="335" stroke={arrowGray} strokeWidth="1.5" />
      <line
        x1="582"
        y1="276"
        x2="596"
        y2="276"
        stroke={topMerge}
        strokeWidth="1.5"
        markerEnd={topMergeMarker}
      />

      <line x1="736" y1="276" x2="774" y2="276" stroke={chain} strokeWidth="1.5" markerEnd={chainMarker} />
      <line x1="914" y1="276" x2="952" y2="276" stroke={chain} strokeWidth="1.5" markerEnd={chainMarker} />
      <line x1="1064" y1="276" x2="1080" y2="276" stroke={chain} strokeWidth="1.5" markerEnd={chainMarker} />
      <line x1="1230" y1="276" x2="1248" y2="276" stroke={chain} strokeWidth="1.5" markerEnd={chainMarker} />
      <line x1="1360" y1="276" x2="1380" y2="276" stroke={chain} strokeWidth="1.5" markerEnd={chainMarker} />

      <path
        d="M1072,276 L1072,180 L490,180 L490,204"
        stroke={redColor}
        strokeWidth="1.25"
        fill="none"
        markerEnd="url(#cpf-red)"
      />
      <text
        x="781"
        y="172"
        fill={redColor}
        textAnchor="middle"
        fontSize="9"
        fontStyle="italic"
        fontFamily="system-ui,sans-serif"
      >
        If application is incomplete
      </text>

      <path
        d="M1230,276 L1238,276 L1238,180 L1072,180 L1072,276"
        stroke={redColor}
        strokeWidth="1.25"
        fill="none"
        markerEnd="url(#cpf-red)"
      />
      <text
        x="1151"
        y="172"
        fill={redColor}
        textAnchor="middle"
        fontSize="9"
        fontStyle="italic"
        fontFamily="system-ui,sans-serif"
      >
        If you fail
      </text>
    </g>
  )
}
