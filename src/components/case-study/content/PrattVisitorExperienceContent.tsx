'use client'

import { m } from 'framer-motion'
import { PrattCoDesignSection } from './pratt/PrattCoDesignSection'
import { PrattConclusionSection } from './pratt/PrattConclusionSection'
import { PrattIntervention1ImpactSection } from './pratt/PrattIntervention1ImpactSection'
import { PrattIntervention1PhasesSection } from './pratt/PrattIntervention1PhasesSection'
import { PrattIntervention1Section } from './pratt/PrattIntervention1Section'
import { PrattIntervention2ChangesEarlySection } from './pratt/PrattIntervention2ChangesEarlySection'
import { PrattIntervention2ChangesLateSection } from './pratt/PrattIntervention2ChangesLateSection'
import { PrattIntervention2ImpactSection } from './pratt/PrattIntervention2ImpactSection'
import { PrattIntervention2Section } from './pratt/PrattIntervention2Section'
import { PrattKeyCharactersSection } from './pratt/PrattKeyCharactersSection'
import { PrattServiceSafariBlueprintSection } from './pratt/PrattServiceSafariBlueprintSection'
import { PrattServiceSafariIntroSection } from './pratt/PrattServiceSafariIntroSection'
import { PrattServiceSafariPhasesSection } from './pratt/PrattServiceSafariPhasesSection'
import { PrattSurveyAnalysisAccordionsSection } from './pratt/PrattSurveyAnalysisAccordionsSection'
import { PrattSurveyAnalysisIntroSection } from './pratt/PrattSurveyAnalysisIntroSection'

export function PrattVisitorExperienceContent() {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="cs-content text-left">
        <div>
            <PrattKeyCharactersSection />
            <PrattServiceSafariIntroSection />
            <PrattServiceSafariPhasesSection />
            <PrattServiceSafariBlueprintSection />
            <PrattSurveyAnalysisIntroSection />
            <PrattSurveyAnalysisAccordionsSection />
            <PrattCoDesignSection />
            <PrattIntervention1Section />
            <PrattIntervention1PhasesSection />
            <PrattIntervention1ImpactSection />
            <PrattIntervention2Section />
            <PrattIntervention2ChangesEarlySection />
            <PrattIntervention2ChangesLateSection />
            <PrattIntervention2ImpactSection />
            <PrattConclusionSection />
        </div>
      </div>
    </m.section>
  )
}
