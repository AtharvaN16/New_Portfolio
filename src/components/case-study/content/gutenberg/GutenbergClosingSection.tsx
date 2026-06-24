'use client'

export function GutenbergClosingSection() {
  return (
    <>
        {/* Challenges */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t" style={{ borderColor: 'rgb(var(--color-text-color20))' }}>
          <h3
            className="text-lg md:text-case-heading font-bold text-text-primary mb-8 md:mb-12 leading-tight tracking-[-0.05em]"
          >
            Challenges
          </h3>
          <div className="space-y-6 md:space-y-8">
            <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
              <strong className="font-bold text-text-primary">Learning Tobii Software:</strong>{' '}
              The eye-tracking software was difficult to navigate. It took time to understand how to export data, generate heat maps, and create areas of interest for analysis.
            </p>
            <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
              <strong className="font-bold text-text-primary">Platform Limitations:</strong>{' '}
              Because all user actions happened within a single URL with no page changes, many standard eye-tracking metrics (like page-level heat maps and automatic areas of interest) didn&apos;t work. We had to use workarounds or skip some analyses we&apos;d planned.
            </p>
            <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
              <strong className="font-bold text-text-primary">Google Analytics Not Available:</strong>{' '}
              We were supposed to use Google Analytics to find additional insights, but the client did not have Google Analytics set up properly, which limited our ability to gather supplementary behavioral data.
            </p>
            <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
              <strong className="font-bold text-text-primary">Issues Fixed During Research:</strong>{' '}
              The client was super quick to fix a lot of issues we told them about through our own hypothesis and heuristic analysis during the midpoint presentation, which meant we could not properly test them with all participants.
            </p>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mt-16 md:mt-24">
          <h3
            className="text-lg md:text-case-heading font-bold text-text-primary mb-8 md:mb-12 leading-tight tracking-[-0.05em]"
          >
            Key Takeaway
          </h3>
          <h4 className="text-base md:text-xl font-bold text-text-primary mb-4 md:mb-6">
            Value of documentation and Triangulation of evidence
          </h4>
          <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
            Creating the problem sheet, rainbow spreadsheet, collecting evidence from gaze replays and RTA notes helped me clearly see which issues were worth prioritizing. In past projects, it was sometimes difficult to convince clients (and myself) that I was solving the right problems. Triangulating evidence across multiple data sources, where behavioral metrics, eye-tracking patterns, and verbal feedback all point to the same issue, made the case much stronger.
          </p>
        </div>

        {/* Client Response */}
        <div className="mt-16 md:mt-24">
          <h3
            className="text-lg md:text-case-heading font-bold text-text-primary mb-6 md:mb-10 leading-tight tracking-[-0.05em]"
          >
            Client Response
          </h3>
          <p className="text-base md:text-[18px] font-normal leading-normal" style={{ color: 'rgb(var(--color-text-color90))' }}>
            The client was highly impressed with the research. They explained that this is the oldest part of their platform and has never been updated; while they were aware of some of the issues, this was the first time they had clear evidence to support them. They told us that a design overhaul is planned for 2026 and noted that our recommendations will be very helpful for their work. They were also surprised by how simple some of the proposed solutions were, commenting that they wished they had thought of them sooner.
          </p>
        </div>

        <div
          className="border-t my-16 md:my-24"
          style={{ borderColor: 'rgb(var(--color-text-color10))' }}
        />

        {/* The End */}
        <div className="py-8 md:py-12">
          <h3
            className="text-xl md:text-2xl font-bold uppercase tracking-[-0.02em] mb-6 md:mb-8 text-[var(--cs-pop-light)] dark:text-[var(--cs-pop-dark)]"
          >
            The End
          </h3>
          <p className="text-xl md:text-case-heading font-bold text-text-primary">
            Thank you for reading this case-study
          </p>
        </div>
    </>
  )
}
