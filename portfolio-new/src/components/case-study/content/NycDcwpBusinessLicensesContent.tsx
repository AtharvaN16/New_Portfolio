'use client'

import { m } from 'framer-motion'

export function NycDcwpBusinessLicensesContent() {
  return (
    <m.section
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[940px] mx-auto text-left">
        <h2 className="text-2xl md:text-[40px] font-bold text-text-primary mb-6 md:mb-8 leading-tight tracking-[-0.05em]">
          Helping 14,000+ business owners renew and apply for licenses with
          less hassle and more clarity
        </h2>

        <div className="space-y-12 md:space-y-16">
          <section>
            <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
              The Client
            </h3>
            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                The New York City Department of Consumer and Worker Protection
                is responsible for issuing licenses to more than 45,000
                businesses across over 40 industries and enforces major
                consumer protection, licensing, and workplace laws.
              </p>
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                The product in scope was the department&apos;s online portal,
                where business owners apply for or renew their licenses.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
              About the Project
            </h3>
            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                NYC DCWP Chief Information Officer Rina Sharma approached Pratt
                Institute with a project to improve the functionality of the
                business portal, with a specific focus on the Home Improvement
                License category. This category has the highest number of
                licensees, with more than 14,000 businesses.
              </p>
              <p className="text-base md:text-[20px] font-normal text-text-color90 leading-relaxed">
                Many home improvement contractors tend to be older, may be less
                comfortable with digital systems, and often have limited
                English proficiency. The goal of the project was to identify
                pain points in the application and renewal journey and make the
                process easier to navigate with less confusion and friction.
              </p>
            </div>
          </section>
        </div>
      </div>
    </m.section>
  )
}
