interface ChecklistProcessFlowChecklistNodesProps {
  checklistFade: number
  /** True during idle phase of the auto animation (A–F blue wave). */
  checklistFocus: boolean
  /** Paused: only “Start online application” (E) is blue; rest of checklist gray. */
  paused: boolean
  checklistDashAnim: string | undefined
  blueNodeBg: string
  phaseBlue: string
  nodeGray: string
  nodeGrayBorder: string
  nodeText: string
}

const DASH_PATTERN = '6 4'

export function ChecklistProcessFlowChecklistNodes({
  checklistFade,
  checklistFocus,
  paused,
  checklistDashAnim,
  blueNodeBg,
  phaseBlue,
  nodeGray,
  nodeGrayBorder,
  nodeText,
}: ChecklistProcessFlowChecklistNodesProps) {
  const waveBlue = checklistFocus && !paused
  const eBlue = paused || waveBlue

  return (
    <g
      style={{
        opacity: checklistFade,
        transition: 'opacity 0.65s ease',
      }}
    >
      <rect
        x="12"
        y="252"
        width="175"
        height="72"
        rx="6"
        fill={waveBlue ? blueNodeBg : nodeGray}
        stroke={waveBlue ? phaseBlue : nodeGrayBorder}
        strokeWidth={waveBlue ? 1.5 : 1}
        strokeDasharray={waveBlue ? DASH_PATTERN : undefined}
        className={waveBlue ? checklistDashAnim : undefined}
      />
      <text x="99" y="274" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Gather information about</text>
      <text x="99" y="288" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">HIC license application</text>
      <text x="99" y="302" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">process</text>

      <rect
        x="215"
        y="160"
        width="168"
        height="72"
        rx="6"
        fill={nodeGray}
        stroke={nodeGrayBorder}
        strokeWidth="1"
      />
      <text x="299" y="182" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Obtain Sales Tax</text>
      <text x="299" y="196" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Identification /</text>
      <text x="299" y="210" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Application Confirmation #</text>

      <rect
        x="215"
        y="252"
        width="168"
        height="56"
        rx="6"
        fill={nodeGray}
        stroke={nodeGrayBorder}
        strokeWidth="1"
      />
      <text x="299" y="273" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Obtain Proof of Workers&apos;</text>
      <text x="299" y="287" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Compensation Insurance</text>

      <rect
        x="215"
        y="342"
        width="168"
        height="60"
        rx="6"
        fill={waveBlue ? blueNodeBg : nodeGray}
        stroke={waveBlue ? phaseBlue : nodeGrayBorder}
        strokeWidth={waveBlue ? 1.5 : 1}
        strokeDasharray={waveBlue ? DASH_PATTERN : undefined}
        className={waveBlue ? checklistDashAnim : undefined}
      />
      <text x="299" y="361" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Gather other documents</text>
      <text x="299" y="375" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">based on requirements</text>
      <text x="299" y="389" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">checklist</text>

      <rect
        x="412"
        y="204"
        width="155"
        height="48"
        rx="6"
        fill={eBlue ? blueNodeBg : nodeGray}
        stroke={eBlue ? phaseBlue : nodeGrayBorder}
        strokeWidth={eBlue ? 1.5 : 1}
        strokeDasharray={waveBlue ? DASH_PATTERN : undefined}
        className={waveBlue ? checklistDashAnim : undefined}
        filter={eBlue ? 'url(#cpf-glow)' : undefined}
      />
      <text
        x="490"
        y="232"
        fill={nodeText}
        textAnchor="middle"
        fontSize="10"
        fontWeight="500"
        fontFamily="system-ui,sans-serif"
      >
        Start online application
      </text>

      <rect
        x="412"
        y="302"
        width="155"
        height="66"
        rx="6"
        fill={waveBlue ? blueNodeBg : nodeGray}
        stroke={waveBlue ? phaseBlue : nodeGrayBorder}
        strokeWidth={waveBlue ? 1.5 : 1}
        strokeDasharray={waveBlue ? DASH_PATTERN : undefined}
        className={waveBlue ? checklistDashAnim : undefined}
      />
      <text x="490" y="321" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Schedule in-person</text>
      <text x="490" y="335" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">appointment via call</text>
      <text x="490" y="349" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">or email</text>
    </g>
  )
}
