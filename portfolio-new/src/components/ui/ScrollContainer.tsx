'use client'

/**
 * ScrollContainer - Basic Layout
 *
 * Just renders children in order. No effects.
 */

import type { ReactNode, ReactElement } from 'react'
import React, { Children, isValidElement } from 'react'

interface ScrollContainerProps {
  children: ReactNode
}

function isComponentType(element: ReactElement, displayName: string): boolean {
  const type = element.type as { displayName?: string; name?: string }
  return type.displayName === displayName || type.name === displayName
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const childArray = Children.toArray(children)

  let heroElement: ReactElement | null = null
  let cardElement: ReactElement | null = null
  let workElement: ReactElement | null = null
  let footerElement: ReactElement | null = null

  childArray.forEach((child) => {
    if (!isValidElement(child)) return
    if (isComponentType(child, 'Hero')) heroElement = child
    else if (isComponentType(child, 'FullpageCard')) cardElement = child
    else if (isComponentType(child, 'SelectedWork')) workElement = child
    else if (isComponentType(child, 'Footer')) footerElement = child
  })

  return (
    <div>
      {/* Hero */}
      {heroElement && (
        <section className="min-h-screen bg-background">
          <div className="px-6 pt-[92px]">{heroElement}</div>
        </section>
      )}

      {/* FullpageCard */}
      {cardElement && (
        <section className="min-h-screen bg-background">{cardElement}</section>
      )}

      {/* Selected Work */}
      {workElement && (
        <section className="bg-background">
          <div className="px-6 pt-12 pb-20">{workElement}</div>
        </section>
      )}

      {/* Footer */}
      {footerElement && (
        <footer className="bg-background">{footerElement}</footer>
      )}
    </div>
  )
}
