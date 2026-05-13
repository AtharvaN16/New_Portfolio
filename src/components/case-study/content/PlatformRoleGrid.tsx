'use client'
import { m } from 'framer-motion'

const platforms = [
  {
    name: 'Instagram',
    current: 'Campaign duplication',
    proposed: 'Lifestyle & Community',
    icon: '📸'
  },
  {
    name: 'TikTok',
    current: 'Re-posted Reels',
    proposed: 'Edu-tainment & Trends',
    icon: '📱'
  },
  {
    name: 'Web',
    current: 'Static Catalog',
    proposed: 'Personalized Experience',
    icon: '🌐'
  }
]

export function PlatformRoleGrid() {
  return (
    <div className="w-full max-w-[600px] bg-white dark:bg-neutral-900 border border-[rgb(var(--color-text-color10))] rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-3 bg-neutral-50 dark:bg-neutral-800/50 border-b border-[rgb(var(--color-text-color10))] p-4 font-bold text-sm uppercase tracking-wider text-text-color70">
        <div>Platform</div>
        <div>Current</div>
        <div className="text-primary-main">Proposed</div>
      </div>
      <div className="divide-y divide-[rgb(var(--color-text-color10))]">
        {platforms.map((p, i) => (
          <m.div 
            key={p.name}
            className="grid grid-cols-3 p-4 items-center"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{p.icon}</span>
              <span className="font-bold text-text-primary">{p.name}</span>
            </div>
            <div className="text-sm text-text-color70 italic">{p.current}</div>
            <div className="text-sm font-medium text-text-primary">{p.proposed}</div>
          </m.div>
        ))}
      </div>
    </div>
  )
}
