'use client'
import { m } from 'framer-motion'

export function MarketVoidVenn() {
  return (
    <div className="w-full aspect-square max-w-[400px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 md:p-8 overflow-hidden">
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        {/* Activewear Market (Large Circle) */}
        <m.g
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle
            cx="240"
            cy="200"
            r="130"
            fill="currentColor"
            className="text-[#1F3A66] opacity-10"
          />
          <circle
            cx="240"
            cy="200"
            r="130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#1F3A66] opacity-30"
          />
          <text 
            x="290" 
            y="200" 
            className="fill-[#1F3A66] text-[14px] font-bold select-none" 
            textAnchor="middle"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Activewear Market
          </text>
        </m.g>

        {/* Alo Yoga Niche (Small Circle) */}
        <m.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: '110px', originY: '200px' }}
        >
          <circle
            cx="110"
            cy="200"
            r="70"
            fill="currentColor"
            className="text-[#ef4444] opacity-20"
          />
          <circle
            cx="110"
            cy="200"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#ef4444] opacity-40"
          />
          <text 
            x="90" 
            y="200" 
            className="fill-[#ef4444] text-[12px] font-bold select-none" 
            textAnchor="middle"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Alo Niche
          </text>
        </m.g>

        {/* "The Void" Label */}
        <text 
          x="180" 
          y="200" 
          className="fill-text-primary text-[10px] font-mono font-bold select-none" 
          textAnchor="middle"
        >
          THE VOID
        </text>
      </svg>
    </div>
  )
}
