'use client'

import Image from 'next/image'
import { SectionDivider } from './pratt-shared'

export function PrattServiceSafariBlueprintSection() {
  return (
    <>
        {/* ── Service Blueprint ── */}
        <div className="mt-16 md:mt-20 mb-0">
          <p
            className="text-base md:text-[18px] font-normal leading-normal mb-8 md:mb-10"
            style={{ color: 'rgb(var(--color-text-color90))' }}
          >
            After experiencing the service firsthand and speaking with
            the client to better understand how the service operates, we
            created a service blueprint. You can explore the full
            blueprint by clicking the link below.
          </p>
          <figure className="w-full overflow-x-auto">
            <Image
              src="/images/case-studies/pratt-institute-visitor-experience/blueprint.avif"
              alt="Service blueprint mapping visitor actions, front-stage and back-stage employee actions, technology, and support processes across all five journey phases"
              width={2400}
              height={1350}
              className="w-full h-auto min-w-[640px]"
              quality={90}
              sizes="(max-width: 768px) 200vw, 896px"
            />
          </figure>
        </div>

        <SectionDivider />
    </>
  )
}
