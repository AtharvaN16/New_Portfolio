'use client'

import { useState } from 'react'
import { m } from 'framer-motion'

export function AloSEOPieChart() {
  const [hovered, setHovered] = useState<string | null>(null)

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const total = 392
  const nonIndexable = 143
  const indexable = 249
  const errors4xx = 104

  const pctNonIndexable = nonIndexable / total
  const pctIndexable = indexable / total
  const pctErrors = errors4xx / total

  return (
    <div className="relative w-full max-w-[480px] ml-auto font-sans">
      
      {/* Outer labels */}
      <div 
        className="absolute top-4 right-0 md:right-[-20px] text-right z-10 transition-all duration-300 min-w-[140px]"
      >
        <p className={`font-bold text-sm md:text-base transition-colors duration-300 ${hovered ? 'text-red-500' : 'text-neutral-900 dark:text-neutral-100'}`}>
          {hovered ? '4xx Client Errors' : 'Non-Indexable URLs'}
        </p>
        <p className={`text-sm transition-colors duration-300 ${hovered ? 'text-red-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
          {hovered ? '104 (26.5%)' : '143 (36.5%)'}
        </p>
      </div>

      <div 
        className="absolute bottom-4 left-0 md:left-[-20px] text-left z-10 transition-opacity duration-300 min-w-[140px]" 
        style={{ opacity: hovered ? 0.3 : 1 }}
      >
        <p className="font-bold text-sm md:text-base text-neutral-900 dark:text-neutral-100">Indexable URLs</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">249 (63.5%)</p>
      </div>

      {/* SVG Donut */}
      <div 
        className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] mx-auto"
        onMouseEnter={() => setHovered('chart')}
        onMouseLeave={() => setHovered(null)}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 overflow-visible">
          
          {/* Non-Indexable (Pink) */}
          <m.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#FF8E8B" // pink/salmon
            strokeWidth="20"
            strokeDasharray={`0 ${circumference}`}
            whileInView={{ strokeDasharray: `${circumference * pctNonIndexable} ${circumference}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeDashoffset={0}
            className="cursor-pointer transition-opacity duration-300"
            style={{ opacity: hovered === 'indexable' ? 0.3 : 1 }}
          />

          {/* Indexable (Purple) */}
          <m.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#8B7AF0" // purple
            strokeWidth="20"
            strokeDasharray={`0 ${circumference}`}
            whileInView={{ strokeDasharray: `${circumference * pctIndexable} ${circumference}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            strokeDashoffset={-(circumference * pctNonIndexable)}
            className="cursor-pointer transition-opacity duration-300"
          />

          {/* 4xx Errors overlay (Red) on hover */}
          <m.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#FF3B30" // strong red for errors
            strokeWidth="20"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ 
              strokeDasharray: hovered ? `${circumference * pctErrors} ${circumference}` : `0 ${circumference}`
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            strokeDashoffset={0}
            className="pointer-events-none"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[10px] md:text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-0.5">
              Total URLs Crawled
            </p>
            <p className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100">
              392
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
