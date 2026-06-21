declare global {
  interface Window {
    /** @deprecated Legacy dead code only — use useLenis() or useContainerScroll() */
    lenis?: import('lenis').default
  }
}

export {}
