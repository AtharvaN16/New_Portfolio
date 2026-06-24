'use client'

import { useState, useEffect, useRef } from 'react'
import { m, useInView, AnimatePresence } from 'framer-motion'

export function AloSearchForbidden() {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'initial' | 'mouse-moving' | 'clicking' | 'typing' | 'loading' | 'error'>('initial')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  const fullText = 'alo yoga'

  useEffect(() => {
    let isMounted = true

    const runSequence = async () => {
      if (!isInView) return

      // Reset
      setPhase('initial')
      setText('')
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (!isMounted) return

      // Mouse moving to search bar
      setPhase('mouse-moving')
      await new Promise((resolve) => setTimeout(resolve, 800))
      if (!isMounted) return

      // Click
      setPhase('clicking')
      await new Promise((resolve) => setTimeout(resolve, 200))
      if (!isMounted) return

      // Typing
      setPhase('typing')
      for (let i = 0; i <= fullText.length; i++) {
        setText(fullText.slice(0, i))
        await new Promise((resolve) => setTimeout(resolve, 120))
        if (!isMounted) return
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!isMounted) return

      // Loading
      setPhase('loading')
      await new Promise((resolve) => setTimeout(resolve, 1500))
      if (!isMounted) return

      // Error
      setPhase('error')
      await new Promise((resolve) => setTimeout(resolve, 4000))
      if (!isMounted) return

      // Loop
      runSequence()
    }

    if (isInView) {
      runSequence()
    }

    return () => {
      isMounted = false
    }
  }, [isInView])

  return (
    <div
      className="mb-12 flex justify-center md:justify-start"
    >
      <div
        className="inline-block p-8 md:p-16"
        style={{ background: 'linear-gradient(180deg, #A8D3FF 0%, #FFF4DF 100%)' }}
      >
        <div
          ref={ref}
          className="relative w-[300px] md:w-[520px] aspect-video bg-white overflow-hidden shadow-2xl rounded-xl"
          style={{ isolation: 'isolate', cursor: 'none' }}
        >
        <AnimatePresence mode="wait">
          {phase !== 'error' ? (
            <m.div
              key="google-ui"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.05 } 
              }}
              className="w-full h-full flex flex-col p-6 md:p-10 bg-white"
            >
              {/* Google Logo Mock */}
              <div className="flex justify-center mb-6 md:mb-8 mt-4 md:mt-8 scale-75 md:scale-100">
                <span className="text-2xl md:text-2xl font-bold tracking-tight">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full max-w-[320px] mx-auto mb-6 md:mb-8">
                <m.div 
                  animate={phase === 'clicking' ? { scale: 0.98 } : { scale: 1 }}
                  className="w-full h-8 md:h-10 px-4 py-1.5 rounded-full border border-neutral-200 shadow-sm flex items-center text-xs md:text-sm text-neutral-800"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <div className="relative flex-1">
                    {text}
                    {phase === 'typing' && (
                      <m.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute ml-0.5 h-3.5 md:h-4 w-[1.5px] bg-[#4285F4] inline-block align-middle"
                      />
                    )}
                  </div>
                </m.div>
              </div>

              {/* Mock Results */}
              {phase === 'loading' && (
                <div className="space-y-3 md:space-y-4 max-w-[380px] mx-auto w-full px-4 md:px-0">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="h-2.5 md:h-3 bg-neutral-100 rounded-md w-3/4 animate-pulse" />
                      <div className="h-1.5 md:h-2 bg-neutral-50 rounded-md w-full animate-pulse" />
                    </div>
                  ))}
                </div>
              )}

              {/* Simulated Mouse Cursor */}
              {(phase === 'mouse-moving' || phase === 'clicking') && (
                <m.div
                  initial={{ x: 400, y: 250, opacity: 0 }}
                  animate={{ 
                    x: 260, 
                    y: 125, 
                    opacity: 1,
                    scale: phase === 'clicking' ? 0.8 : 1
                  }}
                  transition={{ 
                    x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.1 }
                  }}
                  className="absolute z-50 pointer-events-none"
                >

                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="white" stroke="black"/>
                  </svg>
                </m.div>
              )}
            </m.div>
          ) : (
            <m.div
              key="error-ui"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  type: 'spring',
                  damping: 12,
                  stiffness: 200
                }
              }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10 bg-[#FAFAFA]"
            >
              <div className="text-center">
                <h1 className="text-2xl md:text-8xl font-black text-[#EA4335] mb-2 md:mb-4 tracking-tighter">
                  403
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 md:mb-6">
                  Forbidden
                </h2>
                <div className="h-px w-12 md:w-16 bg-neutral-300 mx-auto mb-4 md:mb-6" />
                <p className="text-xs md:text-sm text-neutral-500 max-w-[280px] md:max-w-[400px] leading-normal">
                  You don't have permission to access this resource on the server.
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
  )
}
