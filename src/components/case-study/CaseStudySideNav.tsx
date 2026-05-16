'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { useLenis } from '@/components/providers/LenisProvider'

export interface NavItem {
  id: string
  label: string
}

interface CaseStudySideNavProps {
  isVisible: boolean
  navItems: NavItem[]
  themeColor?: string // hex or rgb color string for the active item
}

export function CaseStudySideNav({ 
  isVisible, 
  navItems, 
  themeColor = '#4285F4' 
}: CaseStudySideNavProps) {
  console.log('[DEBUG-sidenav] CaseStudySideNav rendering, isVisible:', isVisible)
  const [activeId, setActiveId] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          console.log(`[DEBUG-sidenav] Observer fired for ${entry.target.id}, isIntersecting: ${entry.isIntersecting}`)
        })
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          console.log(`[DEBUG-sidenav] Setting activeId to: ${visibleEntries[0].target.id}`)
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -40% 0px',
      }
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        console.log(`[DEBUG-sidenav] Observing element: ${item.id}`)
        observer.observe(element)
      } else {
        console.log(`[DEBUG-sidenav] Element NOT FOUND: ${item.id}`)
      }
    })

    return () => observer.disconnect()
  }, [navItems, isVisible])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const currentLenis = (window as any).lenis
      if (currentLenis) {
        console.log('[DEBUG-sidenav] Scrolling via Lenis to:', id)
        currentLenis.scrollTo(element, { offset: -100, duration: 1.5 })
      } else {
        console.log('[DEBUG-sidenav] Scrolling via native scrollIntoView to:', id)
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      console.log('[DEBUG-sidenav] Element not found for scrolling:', id)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 xl:right-8 2xl:right-12 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex items-center w-48 pointer-events-none"
        >
          <div 
            className="flex flex-col gap-3 py-6 px-2 w-full pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('[DEBUG-sidenav] Clicking:', item.id)
                    scrollTo(item.id)
                  }}
                  className="flex items-center text-right justify-end group/item w-full py-2 relative h-6"
                >
                  {/* Text Label */}
                  <span 
                    className={`absolute right-0 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 break-words whitespace-normal leading-relaxed text-right max-w-[130px]
                      ${isActive ? '' : 'text-neutral-400 group-hover/item:text-neutral-600 dark:text-neutral-500 dark:group-hover/item:text-neutral-300'}
                      ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                    `}
                    style={isActive ? { color: themeColor } : {}}
                  >
                    {item.label}
                  </span>
                  
                  {/* Indicator Bar */}
                  <div 
                    className={`h-[2px] transition-all duration-300 rounded-full absolute right-0
                      ${isActive ? 'w-8' : 'w-4 bg-neutral-300 dark:bg-neutral-700'}
                      ${isHovered ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
                    `}
                    style={isActive ? { backgroundColor: themeColor } : {}}
                  />
                </button>
              )
            })}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
