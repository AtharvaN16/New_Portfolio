'use client'

export function GutenbergResearchObjectivesSection() {
  return (
    <>
        {/* Research Objectives Section */}
        <h3
          className="text-sm md:text-base font-semibold normal-case mb-6 md:mb-[28px]"
          style={{ color: 'rgb(var(--color-text-tertiary))' }}
        >
          Research Objectives
        </h3>

        <p
          className="text-base md:text-[18px] font-normal leading-normal mb-8 md:mb-10"
          style={{ color: 'rgb(var(--color-text-color90))' }}
        >
          The objective of the study is to understand the use of the{' '}
          <span className="font-semibold">Table of Contents</span>,{' '}
          <span className="font-semibold">Authoring from scratch</span>,
          and the functionality of the{' '}
          <span className="font-semibold">drag and drop features</span> in
          the CMS.
        </p>

        <ul className="space-y-6 md:space-y-7">
          <li className="flex items-start gap-4">
            <span
              className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
            />
            <div>
              <div className="text-base md:text-[18px] font-semibold leading-normal text-text-body">
                Table of contents (TOC)
              </div>
              <p
                className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Explore users&apos; challenges in creating and managing
                the TOC, their understanding of different options offered
                in TOC, and the reasoning behind their actions.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span
              className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
            />
            <div>
              <div className="text-base md:text-[18px] font-semibold leading-normal text-text-body">
                Authoring content from scratch
              </div>
              <p
                className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Explore users&apos; starting points, their authoring
                process, and where challenges or misunderstandings arise.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span
              className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
            />
            <div>
              <div className="text-base md:text-[18px] font-semibold leading-normal text-text-body">
                Drag-and-drop
              </div>
              <p
                className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Explore where users get confused, what creates the highest
                cognitive load, and why drag-and-drop feels difficult.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span
              className="mt-[0.6em] h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: 'rgb(var(--color-text-secondary))' }}
            />
            <div>
              <div className="text-base md:text-[18px] font-semibold text-text-body leading-normal">
                AI-assisted content generation
              </div>
              <p
                className="text-base md:text-[18px] font-normal mt-1 md:mt-1.5 leading-normal"
                style={{ color: 'rgb(var(--color-text-tertiary))' }}
              >
                Explore how users discover and interact with the &quot;Generate
                with AI&quot; tool.
              </p>
            </div>
          </li>
        </ul>

        {/* Divider */}
        <div
          className="border-t my-24 md:my-32"
          style={{ borderColor: 'rgb(var(--color-text-color10))' }}
        />
    </>
  )
}
