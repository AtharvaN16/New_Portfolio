'use client'
import { m } from 'framer-motion'
import { CaseStudyReadMore } from '@/components/case-study/CaseStudyReadMore'
import { IndexabilityWall } from './IndexabilityWall'
import { MarketVoidVenn } from './MarketVoidVenn'
import { PlatformRoleGrid } from './PlatformRoleGrid'

interface AloYogaContentProps {
  isContentRevealed: boolean
  onToggleContent: () => void
}

export function AloYogaContent({ isContentRevealed, onToggleContent }: AloYogaContentProps) {
  return (
    <m.section 
      className="w-full px-6 2xl:px-[140px] py-16 md:py-24 max-w-[1920px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-[1044px] mx-auto text-left">
        {/* Abstract / Intro */}
        <h3 className="text-lg md:text-[28px] font-bold text-text-primary mb-6 md:mb-[28px]">
          Abstract
        </h3>
        <p className="text-base md:text-[18px] font-normal text-text-color70 leading-relaxed mb-12">
          Alo Yoga is a global lifestyle powerhouse, but its digital strategy is stuck in the past. 
          This case study explores the &quot;Yoga Trap&quot;—the gap between cultural dominance and search visibility.
        </p>

        {/* Cinematic Hero Placeholder */}
        <div className="relative w-full aspect-video bg-neutral-100 dark:bg-neutral-800 mb-12 overflow-hidden flex items-center justify-center border border-dashed border-neutral-300">
           <span className="text-neutral-500 font-mono text-sm px-4 text-center">
             PLACEHOLDER: public/videos/case-studies/alo-yoga/hero-loop.mp4
           </span>
        </div>
        
        <CaseStudyReadMore 
          readTime="8 min read"
          isContentRevealed={isContentRevealed}
          onToggleContent={onToggleContent}
        >
          <div className="space-y-32 mt-24">
             <div className="max-w-[800px]">
               <h2 className="text-3xl md:text-[48px] font-bold mb-8 text-[#1F3A66] leading-[1.1] tracking-tighter">
                 Alo wins the room, but loses the search bar.
               </h2>
               <p className="text-lg md:text-[22px] text-text-color70 leading-relaxed">
                 While peers like Lululemon and Gymshark capture the broader activewear market, Alo remains 
                 largely invisible to anyone not specifically looking for &quot;yoga.&quot;
               </p>
             </div>

             {/* Chapter 1: The Indexability Wall */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
               <div>
                 <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                   The Indexability Wall
                 </h3>
                 <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-8">
                   A significant portion of the site is invisible to Google. Important collections 
                   are being blocked before they can even be crawled.
                 </p>
                 <div className="flex flex-col">
                   <span className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-2">Technical Blockage</span>
                   <span className="text-3xl md:text-[40px] font-bold text-text-primary" style={{ fontFamily: 'var(--font-vulf-mono)' }}>
                     36.5% NON-INDEXABLE
                   </span>
                 </div>
               </div>
               <div className="flex justify-center md:justify-end">
                 <IndexabilityWall />
               </div>
             </div>

             <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

             {/* Chapter 2: The Market Void */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
               <div className="order-2 md:order-1 flex justify-center md:justify-start">
                 <MarketVoidVenn />
               </div>
               <div className="order-1 md:order-2">
                 <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                   The Market Void
                 </h3>
                 <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-8">
                   Alo is a yoga brand. But searchers aren&apos;t just looking for yoga. 
                   There are 572,000 monthly searches for men&apos;s workout gear that Alo doesn&apos;t touch.
                 </p>
                 <div className="flex flex-col">
                   <span className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-2">Monthly Search Opportunity</span>
                   <span className="text-4xl md:text-[64px] font-bold text-text-primary tracking-tighter" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                     572,000
                   </span>
                 </div>
               </div>
             </div>

             <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

             {/* Chapter 3: The Echo Chamber */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
               <div>
                 <h3 className="text-xl md:text-[28px] font-bold mb-6 text-text-primary">
                   The Echo Chamber
                 </h3>
                 <p className="text-base md:text-[18px] text-text-color70 leading-relaxed mb-8">
                   5 million followers, but one message. By posting the same campaigns everywhere, 
                   Alo is talking to the same people twice instead of finding new ones.
                 </p>
                 <div className="flex flex-col">
                   <span className="text-sm font-mono uppercase tracking-widest text-text-color70 mb-2">Engagement Gap</span>
                   <span className="text-3xl md:text-[40px] font-bold text-text-primary" style={{ fontFamily: 'var(--font-vulf-mono)' }}>
                     LOWEST WEB-TO-SOCIAL
                   </span>
                 </div>
               </div>
               <div className="flex justify-center md:justify-end">
                 <PlatformRoleGrid />
               </div>
             </div>

             <div className="border-t border-[rgb(var(--color-text-color10))] w-full" />

             {/* Conclusion / Roadmap */}
             <div className="max-w-[800px] mx-auto text-center pb-24">
               <h2 className="text-3xl md:text-[48px] font-bold mb-12 text-text-primary leading-[1.1] tracking-tighter">
                 The Path to Mindful Dominance
               </h2>
               <div className="relative space-y-16">
                 {/* Vertical line */}
                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgb(var(--color-text-color10))] hidden md:block" />
                 
                 {[
                   {
                     step: '01',
                     title: 'Technical Foundation',
                     description: 'Unblock discovery by resolving URL indexability issues and optimizing crawl efficiency.'
                   },
                   {
                     step: '02',
                     title: 'Market Expansion',
                     description: 'Capture the 572K+ monthly search volume in the Men’s and General Activewear categories.'
                   },
                   {
                     step: '03',
                     title: 'Audience Differentiation',
                     description: 'Shift from content duplication to platform-specific narratives that drive real web traffic.'
                   }
                 ].map((item, i) => (
                   <m.div 
                     key={item.step}
                     className="relative z-10 bg-white dark:bg-neutral-900 md:w-[60%] mx-auto p-8 rounded-2xl border border-[rgb(var(--color-text-color10))] shadow-sm"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                   >
                     <span className="text-sm font-mono text-text-color70 mb-2 block">PHASE {item.step}</span>
                     <h4 className="text-xl font-bold text-text-primary mb-3">{item.title}</h4>
                     <p className="text-base text-text-color70 leading-relaxed">{item.description}</p>
                   </m.div>
                 ))}
               </div>
             </div>
          </div>
        </CaseStudyReadMore>
      </div>
    </m.section>
  )
}
