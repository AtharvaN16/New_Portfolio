import fs from 'fs'
import path from 'path'

const SRC = 'src/components/case-study/content/PrattVisitorExperienceContent.tsx'
const OUT_DIR = 'src/components/case-study/content/pratt'

const lines = fs.readFileSync(SRC, 'utf8').split('\n')

function dedentChunk(start, end, spaces = 14) {
  return lines
    .slice(start - 1, end)
    .map((line) => {
      if (!line.trim()) return ''
      if (line.startsWith(' '.repeat(spaces))) return line.slice(spaces)
      if (line.startsWith(' '.repeat(spaces - 2))) return line.slice(spaces - 2)
      return line.trimStart()
    })
    .join('\n')
}

function writeSection({ file, fn, start, end, imports }) {
  const body = dedentChunk(start, end)
  const importBlock = imports ? `${imports}\n\n` : ''
  const content = `'use client'

${importBlock}export function ${fn}() {
  return (
    <>
${body
  .split('\n')
  .map((line) => (line ? `      ${line}` : ''))
  .join('\n')}
    </>
  )
}
`
  fs.writeFileSync(path.join(OUT_DIR, file), content)
}

const sharedRaw = lines.slice(13, 138).join('\n')
const sharedBody = sharedRaw
  .replace(/^function Accordion/m, 'export function Accordion')
  .replace(/^function SectionDivider/m, 'export function SectionDivider')
  .replace(/^function OpportunityAreas/m, 'export function OpportunityAreas')

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(
  path.join(OUT_DIR, 'pratt-shared.tsx'),
  `'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

${sharedBody}
`
)

const IMAGE = `import Image from 'next/image'`
const ANIMATED = `import { AnimatedText } from '@/components/ui/AnimatedText'`
const SHARED = `import { Accordion, OpportunityAreas, SectionDivider } from './pratt-shared'`

const sections = [
  {
    file: 'PrattKeyCharactersSection.tsx',
    fn: 'PrattKeyCharactersSection',
    start: 207,
    end: 315,
    imports: `${IMAGE}\n${ANIMATED}\nimport { SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattServiceSafariIntroSection.tsx',
    fn: 'PrattServiceSafariIntroSection',
    start: 317,
    end: 361,
    imports: `${IMAGE}\n${ANIMATED}`,
  },
  {
    file: 'PrattServiceSafariPhasesSection.tsx',
    fn: 'PrattServiceSafariPhasesSection',
    start: 363,
    end: 611,
    imports: `${IMAGE}\nimport { OpportunityAreas } from './pratt-shared'`,
  },
  {
    file: 'PrattServiceSafariBlueprintSection.tsx',
    fn: 'PrattServiceSafariBlueprintSection',
    start: 613,
    end: 637,
    imports: `${IMAGE}\nimport { SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattSurveyAnalysisIntroSection.tsx',
    fn: 'PrattSurveyAnalysisIntroSection',
    start: 639,
    end: 677,
    imports: `${IMAGE}\n${ANIMATED}`,
  },
  {
    file: 'PrattSurveyAnalysisAccordionsSection.tsx',
    fn: 'PrattSurveyAnalysisAccordionsSection',
    start: 678,
    end: 977,
    imports: `import { Accordion, SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattCoDesignSection.tsx',
    fn: 'PrattCoDesignSection',
    start: 979,
    end: 1170,
    imports: `${IMAGE}\n${ANIMATED}\nimport { SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattIntervention1Section.tsx',
    fn: 'PrattIntervention1Section',
    start: 1173,
    end: 1250,
    imports: ANIMATED,
  },
  {
    file: 'PrattIntervention1PhasesSection.tsx',
    fn: 'PrattIntervention1PhasesSection',
    start: 1252,
    end: 1538,
    imports: `${IMAGE}\nimport { Accordion } from './pratt-shared'`,
  },
  {
    file: 'PrattIntervention1ImpactSection.tsx',
    fn: 'PrattIntervention1ImpactSection',
    start: 1540,
    end: 1588,
    imports: `import { SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattIntervention2Section.tsx',
    fn: 'PrattIntervention2Section',
    start: 1590,
    end: 1634,
    imports: `${IMAGE}\n${ANIMATED}`,
  },
  {
    file: 'PrattIntervention2ChangesEarlySection.tsx',
    fn: 'PrattIntervention2ChangesEarlySection',
    start: 1636,
    end: 1761,
    imports: IMAGE,
  },
  {
    file: 'PrattIntervention2ChangesLateSection.tsx',
    fn: 'PrattIntervention2ChangesLateSection',
    start: 1763,
    end: 1930,
    imports: IMAGE,
  },
  {
    file: 'PrattIntervention2ImpactSection.tsx',
    fn: 'PrattIntervention2ImpactSection',
    start: 1932,
    end: 2059,
    imports: `import { SectionDivider } from './pratt-shared'`,
  },
  {
    file: 'PrattConclusionSection.tsx',
    fn: 'PrattConclusionSection',
    start: 2061,
    end: 2072,
    imports: '',
  },
]

for (const section of sections) {
  writeSection(section)
}

console.log(`Wrote ${sections.length + 1} pratt files`)
