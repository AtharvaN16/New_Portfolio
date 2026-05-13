interface ChecklistProcessFlowGmkNodesProps {
  pauseMode: boolean
  portalFocus: boolean
  dashboardFocus: boolean
  portalDashAnim: string | undefined
  dashboardDashAnim: string | undefined
  ghiFade: number
  jmkFade: number
  blueNodeBg: string
  phaseBlue: string
  nodeGray: string
  nodeGrayBorder: string
  nodeText: string
  yellowGreen: string
  receiveLicenseText: string
}

/** Nodes G–K (application row + post-app). */
export function ChecklistProcessFlowGmkNodes({
  pauseMode,
  portalFocus,
  dashboardFocus,
  portalDashAnim,
  dashboardDashAnim,
  ghiFade,
  jmkFade,
  blueNodeBg,
  phaseBlue,
  nodeGray,
  nodeGrayBorder,
  nodeText,
  yellowGreen,
  receiveLicenseText,
}: ChecklistProcessFlowGmkNodesProps) {
  const portalOn = !pauseMode && portalFocus
  const ghiBlueStroke = pauseMode || portalOn

  return (
    <>
      <g style={{ opacity: ghiFade, transition: 'opacity 0.65s ease' }}>
        <rect
          x="596"
          y="252"
          width="140"
          height="48"
          rx="6"
          fill={portalOn ? blueNodeBg : nodeGray}
          stroke={ghiBlueStroke ? phaseBlue : nodeGrayBorder}
          strokeWidth={ghiBlueStroke ? 1.5 : 1}
          strokeDasharray={portalOn ? '6 4' : undefined}
          className={pauseMode ? undefined : portalDashAnim}
          filter={portalOn ? 'url(#cpf-glow)' : undefined}
        />
        <text x="666" y="269" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Complete the</text>
        <text x="666" y="283" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">application</text>

        <rect
          x="774"
          y="252"
          width="140"
          height="48"
          rx="6"
          fill={portalOn ? blueNodeBg : nodeGray}
          stroke={ghiBlueStroke ? phaseBlue : nodeGrayBorder}
          strokeWidth={ghiBlueStroke ? 1.5 : 1}
          strokeDasharray={portalOn ? '6 4' : undefined}
          className={pauseMode ? undefined : portalDashAnim}
          filter={portalOn ? 'url(#cpf-glow)' : undefined}
        />
        <text x="844" y="269" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Submit required</text>
        <text x="844" y="283" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">documents</text>

        <rect
          x="952"
          y="252"
          width="112"
          height="48"
          rx="6"
          fill={portalOn ? blueNodeBg : nodeGray}
          stroke={ghiBlueStroke ? phaseBlue : nodeGrayBorder}
          strokeWidth={ghiBlueStroke ? 1.5 : 1}
          strokeDasharray={portalOn ? '6 4' : undefined}
          className={pauseMode ? undefined : portalDashAnim}
          filter={portalOn ? 'url(#cpf-glow)' : undefined}
        />
        <text x="1008" y="269" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Pay the</text>
        <text x="1008" y="283" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">license fees</text>
      </g>

      <g style={{ opacity: jmkFade, transition: 'opacity 0.65s ease' }}>
        <rect
          x="1080"
          y="252"
          width="150"
          height="48"
          rx="6"
          fill={dashboardFocus ? blueNodeBg : nodeGray}
          stroke={pauseMode || dashboardFocus ? phaseBlue : nodeGrayBorder}
          strokeWidth={pauseMode || dashboardFocus ? 1.5 : 1}
          strokeDasharray={dashboardFocus ? '6 4' : undefined}
          className={dashboardDashAnim}
          filter={dashboardFocus ? 'url(#cpf-glow)' : undefined}
        />
        <text x="1155" y="269" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">Schedule exam and</text>
        <text x="1155" y="283" fill={nodeText} textAnchor="middle" fontSize="10" fontFamily="system-ui,sans-serif">fingerprints</text>

        <rect
          x="1248"
          y="252"
          width="112"
          height="48"
          rx="6"
          fill={dashboardFocus ? blueNodeBg : nodeGray}
          stroke={pauseMode || dashboardFocus ? phaseBlue : nodeGrayBorder}
          strokeWidth={pauseMode || dashboardFocus ? 1.5 : 1}
          strokeDasharray={dashboardFocus ? '6 4' : undefined}
          className={dashboardDashAnim}
          filter={dashboardFocus ? 'url(#cpf-glow)' : undefined}
        />
        <text x="1304" y="269" fill={nodeText} textAnchor="middle" fontSize="9.5" fontFamily="system-ui,sans-serif">Manage</text>
        <text x="1304" y="283" fill={nodeText} textAnchor="middle" fontSize="9.5" fontFamily="system-ui,sans-serif">application</text>

        <rect x="1380" y="250" width="100" height="52" rx="6" fill={yellowGreen} />
        <text
          x="1430"
          y="273"
          fill={receiveLicenseText}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          Receive
        </text>
        <text
          x="1430"
          y="287"
          fill={receiveLicenseText}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          License
        </text>
      </g>
    </>
  )
}
