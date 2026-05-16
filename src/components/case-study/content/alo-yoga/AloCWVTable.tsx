'use client'

import { m } from 'framer-motion'

const cwvData = [
  {
    platform: 'Desktop',
    assessment: 'FAIL',
    lcp: '2.6s (Needs Imp.)',
    inp: '189ms (Good)',
    cls: '0.66 (Poor)',
    lcpStatus: 'warning',
    inpStatus: 'success',
    clsStatus: 'error',
  },
  {
    platform: 'Mobile',
    assessment: 'FAIL',
    lcp: '2.5s (Needs Imp.)',
    inp: '244ms (Needs Imp.)',
    cls: '0.06 (Good)',
    lcpStatus: 'warning',
    inpStatus: 'warning',
    clsStatus: 'success',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-text-primary dark:text-text-primary' // Black in the image
    case 'warning':
      return 'text-[#D67027] dark:text-[#E89E62]' // Orange from image, pastel for dark mode
    case 'error':
      return 'text-[#A03033] dark:text-[#FF8E8B]' // Dark red from image, pastel for dark mode
    default:
      return 'text-neutral-600'
  }
}

export function AloCWVTable() {
  return (
    <div className="w-full overflow-x-auto my-16">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <th className="pb-6 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-text-primary))' }}>Platform</th>
            <th className="pb-6 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'rgb(var(--color-text-primary))' }}>Assessment</th>
            <th className="pb-6 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-text-primary))' }}>LCP (Speed)</th>
            <th className="pb-6 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-text-primary))' }}>INP (Responsiveness)</th>
            <th className="pb-6 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: 'rgb(var(--color-text-primary))' }}>CLS (Stability)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
          {cwvData.map((row) => (
            <tr key={row.platform} className="group hover:bg-white/50 dark:hover:bg-neutral-800/30 transition-colors">
              <td className="py-8 px-4 font-bold text-base md:text-lg" style={{ color: 'rgb(var(--color-text-primary))' }}>
                {row.platform}
              </td>
              <td className="py-8 px-4 text-center">
                <span className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-[#FFD1D3] dark:bg-[#FFD1D3]/20 text-[#000000] dark:text-[#FFA5A5] text-sm md:text-base font-bold tracking-tight">
                  {row.assessment}
                </span>
              </td>
              <td className={`py-8 px-4 font-bold text-base md:text-lg ${getStatusColor(row.lcpStatus)}`}>
                {row.lcp}
              </td>
              <td className={`py-8 px-4 font-bold text-base md:text-lg ${getStatusColor(row.inpStatus)}`}>
                {row.inp}
              </td>
              <td className={`py-8 px-4 font-bold text-base md:text-lg ${getStatusColor(row.clsStatus)}`}>
                {row.cls}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
