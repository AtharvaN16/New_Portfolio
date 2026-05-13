/** SVG diagram tokens — tuned for page background in light vs dark theme. */

export interface ChecklistProcessFlowPalette {
  nodeGray: string
  nodeGrayBorder: string
  nodeText: string
  phaseBlue: string
  blueNodeBg: string
  yellowGreen: string
  arrowGray: string
  redColor: string
  bracketPillFill: string
  receiveLicenseText: string
}

const dark: ChecklistProcessFlowPalette = {
  nodeGray: '#1E2330',
  nodeGrayBorder: '#353D52',
  nodeText: '#BFC4D0',
  phaseBlue: '#3183CB',
  blueNodeBg: '#142032',
  yellowGreen: '#C5E84B',
  arrowGray: '#515870',
  redColor: '#F05252',
  bracketPillFill: '#2A303C',
  receiveLicenseText: '#1A1A1A',
}

const light: ChecklistProcessFlowPalette = {
  nodeGray: '#E8EDF5',
  nodeGrayBorder: '#B8C4D8',
  nodeText: '#1E293B',
  phaseBlue: '#2563EB',
  blueNodeBg: '#DBEAFE',
  yellowGreen: '#9CAF3E',
  arrowGray: '#64748B',
  redColor: '#DC2626',
  bracketPillFill: '#E2E8F0',
  receiveLicenseText: '#0F172A',
}

export function getChecklistProcessFlowPalette(
  theme: 'light' | 'dark',
): ChecklistProcessFlowPalette {
  return theme === 'light' ? light : dark
}
