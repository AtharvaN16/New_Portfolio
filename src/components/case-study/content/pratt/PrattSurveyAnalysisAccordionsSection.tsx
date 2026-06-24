'use client'

import { Accordion, SectionDivider } from './pratt-shared'

export function PrattSurveyAnalysisAccordionsSection() {
  return (
    <>
        {/* Accordion subsections */}
        <div>
          <Accordion title="Survey Highlights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                {[
                  { label: 'Responses', value: '718' },
                  { label: 'Positive comments', value: '82%' },
                  { label: 'Average rating', value: '4.5/5' },
                ].map(({ label, value }) => (
                  <p
                    key={label}
                    className="text-base md:text-[18px] font-normal leading-normal"
                    style={{ color: 'rgb(var(--color-text-color90))' }}
                  >
                    {label}:{' '}
                    <span
                      className="font-bold"
                      style={{
                        color: 'rgb(var(--color-case-study-gold))',
                      }}
                    >
                      {value}
                    </span>
                  </p>
                ))}
              </div>
              <div>
                <p className="text-base md:text-[18px] font-bold text-text-primary mb-4">
                  Sentiment Distribution:
                </p>
                <ul className="space-y-2">
                  {[
                    'Very Positive (102): 14%',
                    'Positive (184): 26%',
                    'Neutral (396): 55%',
                    'Negative (36): 5%',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            'rgb(var(--color-text-tertiary))',
                        }}
                      />
                      <span
                        className="text-base md:text-[18px] font-normal leading-normal"
                        style={{
                          color: 'rgb(var(--color-text-tertiary))',
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Accordion>

          <Accordion
            title="Information Gaps"
            subtitle="108 information requests identified from 220 responses"
          >
            <div className="space-y-8">
              {[
                {
                  priority: 'High Priority',
                  color: '#C0392B',
                  startIndex: 1,
                  items: [
                    'Academic Programs & Curriculum (32 requests | 19.9%)',
                    'Financial Aid & Scholarships (31 requests | 19.3%)',
                  ],
                },
                {
                  priority: 'Medium Priority',
                  color: '#D97706',
                  startIndex: 3,
                  items: [
                    'Housing & Residential Life (16 requests)',
                    'Admissions & Portfolio (10 requests)',
                  ],
                },
                {
                  priority: 'Low Priority',
                  color: '#4A8C5C',
                  startIndex: 5,
                  items: [
                    'Career & Job Outcomes (8 requests)',
                    'Study Abroad Programs (4 requests)',
                    'Campus Life & Social (3 requests)',
                    'Student Demographics (2 requests)',
                  ],
                },
              ].map(({ priority, color, startIndex, items }) => (
                <div key={priority}>
                  <h5
                    className="text-base md:text-[18px] font-bold mb-3"
                    style={{ color }}
                  >
                    {priority}
                  </h5>
                  <ol className="space-y-2 list-none">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                          style={{
                            color: 'rgb(var(--color-text-tertiary))',
                          }}
                        >
                          {startIndex + i}.
                        </span>
                        <span
                          className="text-base md:text-[18px] font-normal leading-normal"
                          style={{
                            color: 'rgb(var(--color-text-tertiary))',
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Top Strengths">
            <ol className="space-y-6 list-none">
              {[
                {
                  title: 'Tour Guides (225 mentions)',
                  desc: 'Visitors praised ambassadors for being knowledgeable, passionate, friendly, and relatable',
                },
                {
                  title: 'Campus Environment (154 mentions)',
                  desc: 'The physical environment, architecture, and overall campus atmosphere made strong impressions',
                },
                {
                  title: 'Department Visits (55 mentions)',
                  desc: 'Seeing actual program facilities and learning about specific academic offerings was valuable',
                },
              ].map(({ title, desc }, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="text-base md:text-[18px] font-bold flex-shrink-0"
                    style={{ color: 'rgb(var(--color-text-tertiary))' }}
                  >
                    {i + 1}.
                  </span>
                  <div>
                    <p className="text-base md:text-[18px] font-bold text-text-primary mb-1">
                      {title}
                    </p>
                    <p
                      className="text-base md:text-[18px] font-normal leading-normal"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Accordion>

          <Accordion
            title="Visitor Impact"
            subtitle="How the visit influenced likelihood to apply"
          >
            <h5 className="text-base md:text-lg font-bold text-text-primary mb-6">
              Application Intent Score
            </h5>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="flex-1">
                <p className="text-base md:text-[18px] font-bold text-text-primary mb-4">
                  How it&apos;s calculated:
                </p>
                <ol className="space-y-4 list-none">
                  <li className="flex items-start gap-4">
                    <span
                      className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      1.
                    </span>
                    <div>
                      <p
                        className="text-base md:text-[18px] font-normal leading-normal"
                        style={{ color: 'rgb(var(--color-text-color90))' }}
                      >
                        Categorize each visitor response:
                      </p>
                      <ul className="mt-2 space-y-1 ml-1">
                        {[
                          'More likely to apply → Promoter',
                          'Neutral/same → Passive',
                          'Less likely to apply → Detractor',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span
                              className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor:
                                  'rgb(var(--color-text-tertiary))',
                              }}
                            />
                            <span
                              className="text-base md:text-[18px] font-normal leading-normal"
                              style={{
                                color: 'rgb(var(--color-text-tertiary))',
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span
                      className="text-base md:text-[18px] font-normal flex-shrink-0 w-5"
                      style={{ color: 'rgb(var(--color-text-tertiary))' }}
                    >
                      2.
                    </span>
                    <div>
                      <p className="text-base md:text-[18px] font-bold text-text-color70">
                        Calculate the score:
                      </p>
                      <p
                        className="text-base md:text-[18px] font-normal mt-1 leading-normal"
                        style={{ color: 'rgb(var(--color-text-tertiary))' }}
                      >
                        Score = (Promoters &minus; Detractors) / Total
                        Visitors &times; 100
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="flex flex-col gap-8">
                <div
                  className="flex flex-col items-center justify-center w-28 h-28 rounded-lg border"
                  style={{
                    borderColor: 'rgb(var(--color-text-color10))',
                    backgroundColor: 'rgb(var(--color-surface-elevated))',
                  }}
                >
                  <span
                    className="text-2xl font-bold"
                    style={{ color: 'rgb(var(--color-case-study-gold))' }}
                  >
                    68
                  </span>
                  <span className="text-sm font-medium text-text-primary mt-1">
                    Excellent
                  </span>
                </div>
                <div>
                  <p className="text-base md:text-[18px] font-bold text-text-primary mb-3">
                    Breakdown
                  </p>
                  <ul className="space-y-2">
                    {[
                      '494 visitors (69%) – More likely to apply',
                      '217 visitors (30%) – Neutral',
                      '7 visitors (1%) – Less likely',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-[0.55em] h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              'rgb(var(--color-text-tertiary))',
                          }}
                        />
                        <span
                          className="text-base md:text-[18px] font-normal leading-normal"
                          style={{
                            color: 'rgb(var(--color-text-tertiary))',
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Accordion>
        </div>

        <SectionDivider />
    </>
  )
}
