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
    <div className="w-full max-w-[600px] bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="hidden sm:grid sm:grid-cols-3 bg-surface-elevated border-b border-border p-4 font-bold text-sm uppercase tracking-wider text-text-color70">
        <div>Platform</div>
        <div>Current</div>
        <div className="text-primary-main">Proposed</div>
      </div>
      <div className="divide-y divide-border">
        {platforms.map((p, i) => (
          <m.div 
            key={p.name}
            className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:items-center sm:gap-4"
            data-platform-row
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{p.icon}</span>
              <span className="font-bold text-text-primary">{p.name}</span>
            </div>
            <div className="text-sm text-text-color70 italic">
              <span className="mb-1 block text-[10px] not-italic uppercase tracking-widest text-text-tertiary sm:hidden">
                Current role
              </span>
              {p.current}
            </div>
            <div className="text-sm font-medium text-text-primary">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-primary-main sm:hidden">
                Proposed role
              </span>
              {p.proposed}
            </div>
          </m.div>
        ))}
      </div>
    </div>
  )
}
