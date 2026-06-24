'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { CASE_STUDY_HALF_COLUMN_IMAGE_SIZES } from '@/lib/case-study-image-sizes'

type LighthouseMetric = {
  label: string
  score: number
  colorClass: string
}

const desktopMetrics: LighthouseMetric[] = [
  { label: 'Performance', score: 23, colorClass: 'text-[#A03033] dark:text-[#FF8E8B]' }, // Dark red / Pastel red
  { label: 'Accessibility', score: 89, colorClass: 'text-[#D67027] dark:text-[#E89E62]' }, // Orange / Pastel orange
  { label: 'Best Practices', score: 50, colorClass: 'text-[#D67027] dark:text-[#E89E62]' }, // Orange / Pastel orange
  { label: 'SEO', score: 92, colorClass: 'text-[#5F7327] dark:text-[#A6CA7E]' }, // Olive / Pastel green
]

const mobileMetrics: LighthouseMetric[] = [
  { label: 'Performance', score: 35, colorClass: 'text-[#A03033] dark:text-[#FF8E8B]' },
  { label: 'Accessibility', score: 95, colorClass: 'text-[#5F7327] dark:text-[#A6CA7E]' },
  { label: 'Best Practices', score: 54, colorClass: 'text-[#D67027] dark:text-[#E89E62]' },
  { label: 'SEO', score: 92, colorClass: 'text-[#5F7327] dark:text-[#A6CA7E]' },
]

function CircularProgress({ score, label, colorClass }: { score: number, label: string, colorClass: string }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`flex flex-col items-center ${colorClass}`}>
      <div className="relative flex items-center justify-center w-24 h-24 mb-4">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-neutral-200 dark:text-neutral-800"
          />
          {/* Progress Circle */}
          <m.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Score Text */}
        <span className="text-2xl font-black tracking-tighter">
          {score}
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  )
}

export function AloLighthouseScores() {
  const [platform, setPlatform] = useState<'Desktop' | 'Mobile'>('Desktop')
  const metrics = platform === 'Desktop' ? desktopMetrics : mobileMetrics

  return (
    <div className="flex flex-col pt-10 pb-16 overflow-hidden bg-[rgb(var(--color-footer-bg))] my-16">
      
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 md:px-12 mb-12 gap-6">
        <h5 className="text-2xl md:text-2xl" style={{ fontFamily: 'var(--font-instrument), serif', color: 'rgb(var(--color-text-primary))' }}>
          Lighthouse Score
        </h5>
        
        <div className="flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setPlatform('Desktop')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              platform === 'Desktop' 
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setPlatform('Mobile')}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              platform === 'Mobile' 
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-12 items-center">
        
        {/* Left: Image */}
        <div className="flex justify-center items-center relative aspect-square w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <m.div
              key={platform}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-0 p-2 md:p-4 flex items-center justify-center"
            >
              <Image
                src={platform === 'Desktop' ? '/images/case-studies/alo-yoga-digital-analytics/desktopsite.avif' : '/images/case-studies/alo-yoga-digital-analytics/iphone14.avif'}
                alt={`${platform} preview`}
                fill
                sizes={CASE_STUDY_HALF_COLUMN_IMAGE_SIZES}
                className="object-contain"
              />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {metrics.map((m) => (
            <CircularProgress key={m.label} score={m.score} label={m.label} colorClass={m.colorClass} />
          ))}
        </div>
      </div>
    </div>
  )
}
