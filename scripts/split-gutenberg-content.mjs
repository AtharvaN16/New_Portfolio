import fs from 'fs'
import path from 'path'

// Regenerate: git show HEAD:src/components/case-study/content/GutenbergContent.tsx > /tmp/GutenbergContent.original.tsx
// (Use pre-split commit if orchestrator already replaced the monolith.)
const SRC = '/tmp/GutenbergContent.original.tsx'
const OUT_DIR = 'src/components/case-study/content/gutenberg'

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

function writeSection({ file, fn, start, end, imports, stateful = false, spaces = 14 }) {
  const body = dedentChunk(start, end, spaces)
  const importBlock = imports ? `${imports}\n\n` : ''

  const stateBlock = stateful
    ? `  const [isSUSCalloutOpen, setIsSUSCalloutOpen] = useState(false)\n\n`
    : ''

  const statefulImports = stateful
    ? `'use client'\n\nimport { useState } from 'react'\nimport { m } from 'framer-motion'\n`
    : `'use client'\n\n`

  const content = `${statefulImports}${importBlock}export function ${fn}() {
${stateBlock}  return (
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

const ANIMATED = `import { AnimatedText } from '@/components/ui/AnimatedText'`
const OPTIMIZED = `import { OptimizedImage } from '@/components/case-study/OptimizedImage'`
const BARS = `import { AnimatedBars } from '@/components/case-study/AnimatedBars'`
fs.mkdirSync(OUT_DIR, { recursive: true })

writeSection({
  file: 'GutenbergOverviewSection.tsx',
  fn: 'GutenbergOverviewSection',
  start: 28,
  end: 84,
  imports: '',
  spaces: 8,
})

const sections = [
  {
    file: 'GutenbergProjectOverviewSection.tsx',
    fn: 'GutenbergProjectOverviewSection',
    start: 92,
    end: 135,
    imports: ANIMATED,
  },
  {
    file: 'GutenbergResearchObjectivesSection.tsx',
    fn: 'GutenbergResearchObjectivesSection',
    start: 137,
    end: 237,
    imports: '',
  },
  {
    file: 'GutenbergMethodologyIntroSection.tsx',
    fn: 'GutenbergMethodologyIntroSection',
    start: 241,
    end: 414,
    imports: `${ANIMATED}\n${OPTIMIZED}`,
  },
  {
    file: 'GutenbergMethodologySusSection.tsx',
    fn: 'GutenbergMethodologySusSection',
    start: 416,
    end: 574,
    imports: OPTIMIZED,
    stateful: true,
  },
  {
    file: 'GutenbergFinding1Section.tsx',
    fn: 'GutenbergFinding1Section',
    start: 586,
    end: 785,
    imports: `${ANIMATED}\n${OPTIMIZED}\n${BARS}`,
  },
  {
    file: 'GutenbergFinding2Section.tsx',
    fn: 'GutenbergFinding2Section',
    start: 792,
    end: 999,
    imports: `${ANIMATED}\n${BARS}`,
  },
  {
    file: 'GutenbergFinding3IntroSection.tsx',
    fn: 'GutenbergFinding3IntroSection',
    start: 1003,
    end: 1134,
    imports: `${ANIMATED}\n${OPTIMIZED}`,
  },
  {
    file: 'GutenbergFinding3SubfindingsSection.tsx',
    fn: 'GutenbergFinding3SubfindingsSection',
    start: 1135,
    end: 1372,
    imports: `${OPTIMIZED}\n${BARS}`,
  },
  {
    file: 'GutenbergFinding3RecommendationSection.tsx',
    fn: 'GutenbergFinding3RecommendationSection',
    start: 1374,
    end: 1397,
    imports: OPTIMIZED,
  },
  {
    file: 'GutenbergClosingSection.tsx',
    fn: 'GutenbergClosingSection',
    start: 1401,
    end: 1470,
    imports: '',
  },
]

for (const section of sections) {
  writeSection(section)
}

console.log(`Wrote Gutenberg overview + ${sections.length} section files`)
