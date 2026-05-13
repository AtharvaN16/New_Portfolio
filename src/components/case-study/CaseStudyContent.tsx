import type { ReactNode } from 'react'

interface CaseStudyContentProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper component for case study MDX content
 * Applies custom prose styling to match existing design
 */
export function CaseStudyContent({
  children,
  className = '',
}: CaseStudyContentProps) {
  return (
    <div className={`prose-case-study ${className}`}>
      {children}
    </div>
  )
}
