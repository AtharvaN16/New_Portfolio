'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/components/providers/AccessibilityProvider'

interface HighlightRect {
  top: number
  left: number
  width: number
  height: number
  id: string
}

export function ReadingGuide() {
  const { readingGuide } = useAccessibility()
  const [mounted, setMounted] = useState(false)
  const [isMac, setIsMac] = useState(false)
  const [sentenceRects, setSentenceRects] = useState<HighlightRect[]>([])
  const [wordRects, setWordRects] = useState<HighlightRect[]>([])
  const currentSentenceRef = useRef<string>('')

  useEffect(() => {
    setMounted(true)
    setIsMac(
      typeof navigator !== 'undefined' && 
      (/Mac|iPod|iPhone|iPad/.test(navigator.platform) || /Mac/.test(navigator.userAgent))
    )
  }, [])

  const speak = useCallback((text: string) => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) return
    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    } catch (err) {
      console.error('Speech synthesis error:', err)
    }
  }, [])

  const getRangeFromOffsets = useCallback((container: HTMLElement, start: number, end: number) => {
    try {
      const range = document.createRange()
      let currentOffset = 0
      let startNode: Node | null = null
      let startOffset = 0
      let endNode: Node | null = null
      let endOffset = 0

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
      let node: Node | null
      while ((node = walker.nextNode())) {
        const len = node.textContent?.length || 0
        
        if (!startNode && currentOffset + len >= start) {
          startNode = node
          startOffset = start - currentOffset
        }
        
        if (!endNode && currentOffset + len >= end) {
          endNode = node
          endOffset = end - currentOffset
          break
        }
        
        currentOffset += len
      }

      if (startNode && endNode) {
        range.setStart(startNode, Math.max(0, startOffset))
        range.setEnd(endNode, Math.min(endNode.textContent?.length || 0, endOffset))
        return range
      }
    } catch (e) {
      console.debug('Error creating range:', e)
    }
    return null
  }, [])

  useEffect(() => {
    if (!mounted || !readingGuide) {
      setSentenceRects([])
      setWordRects([])
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      try {
        let range: Range | null = null
        
        if (document.caretRangeFromPoint) {
          range = document.caretRangeFromPoint(e.clientX, e.clientY)
        } else if ((document as any).caretPositionFromPoint) {
          const position = (document as any).caretPositionFromPoint(e.clientX, e.clientY)
          if (position) {
            range = document.createRange()
            range.setStart(position.offsetNode, position.offset)
            range.setEnd(position.offsetNode, position.offset)
          }
        }

        if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
          const textNode = range.startContainer
          const offset = range.startOffset
          const container = textNode.parentElement?.closest('p, li, h1, h2, h3, h4, h5, blockquote, div') as HTMLElement
          
          if (!container) return

          const fullText = container.textContent || ''
          
          // Calculate global offset using a range
          const preRange = document.createRange()
          preRange.selectNodeContents(container)
          preRange.setEnd(textNode, offset)
          const globalOffset = preRange.toString().length

          // Sentence detection using Intl.Segmenter (robust) or fallback
          let sStart = 0, sEnd = fullText.length
          
          if ('Intl' in window && 'Segmenter' in (Intl as any)) {
            const segmenter = new (Intl as any).Segmenter(document.documentElement.lang || 'en', { granularity: 'sentence' })
            const segments = segmenter.segment(fullText)
            const sentence = segments.containing(globalOffset)
            if (sentence) {
              sStart = sentence.index
              sEnd = sentence.index + sentence.segment.length
            }
          } else {
            // Fallback for older browsers
            const sentenceBreaks = /[.!?](\s+|$)/g
            let match
            while ((match = sentenceBreaks.exec(fullText)) !== null) {
              const matchEnd = match.index + match[0].length
              if (matchEnd <= globalOffset) sStart = matchEnd
              else { sEnd = matchEnd; break }
            }
          }

          // Word detection (simple within current node for speed)
          const nodeText = textNode.textContent || ''
          let wStart = offset, wEnd = offset
          const wordBreaks = /[\s,.;:!?()"]/
          while (wStart > 0 && !wordBreaks.test(nodeText[wStart - 1])) wStart--
          while (wEnd < nodeText.length && !wordBreaks.test(nodeText[wEnd])) wEnd++

          // Update Rects
          const sRange = getRangeFromOffsets(container, sStart, sEnd)
          if (sRange) {
            setSentenceRects(Array.from(sRange.getClientRects()).map((r, i) => ({
              top: r.top, left: r.left, width: r.width, height: r.height, id: `s-${i}`
            })))
          }

          const wRange = document.createRange()
          wRange.setStart(textNode, wStart)
          wRange.setEnd(textNode, wEnd)
          setWordRects(Array.from(wRange.getClientRects()).map((r, i) => ({
            top: r.top, left: r.left, width: r.width, height: r.height, id: `w-${i}`
          })))

          currentSentenceRef.current = fullText.substring(sStart, sEnd).trim()
        } else {
          // Check if we are over a non-text element that might have text
          const element = document.elementFromPoint(e.clientX, e.clientY)
          if (!element?.textContent?.trim()) {
            setSentenceRects([])
            setWordRects([])
            currentSentenceRef.current = ''
          }
        }
      } catch (err) {
        console.debug('Reading guide error:', err)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault()
        speak(currentSentenceRef.current)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [mounted, readingGuide, speak, getRangeFromOffsets])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {readingGuide && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Sentence Highlight */}
          {sentenceRects.map((rect) => (
            <motion.div
              key={rect.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bg-primary/10 dark:bg-primary/20 rounded-sm"
              style={{
                top: rect.top - 1,
                left: rect.left - 2,
                width: rect.width + 4,
                height: rect.height + 2,
              }}
              transition={{ duration: 0.1 }}
            />
          ))}

          {/* Word Highlight */}
          {wordRects.map((rect) => (
            <motion.div
              key={rect.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bg-primary/30 dark:bg-primary/40 rounded-sm shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.3)]"
              style={{
                top: rect.top - 1,
                left: rect.left - 2,
                width: rect.width + 4,
                height: rect.height + 2,
              }}
              transition={{ duration: 0.05 }}
            />
          ))}

          {/* Tooltip */}
          {currentSentenceRef.current && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md text-white text-xs rounded-full border border-white/10"
            >
              Press <span className="font-bold text-primary">{isMac ? '⌥ Option' : 'Alt'} + R</span> to read aloud
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
