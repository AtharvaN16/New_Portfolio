/**
 * SplitText Utility
 *
 * Lightweight alternative to GSAP's SplitText plugin.
 * Splits text into lines based on natural wrapping.
 */

interface SplitTextResult {
  lines: HTMLElement[]
  revert: () => void
}

export function SplitText(
  element: HTMLElement,
  options: { type: 'lines'; tagName?: string } = {
    type: 'lines',
    tagName: 'span',
  }
): SplitTextResult {
  const tagName = options.tagName || 'span'
  const originalHTML = element.innerHTML
  const originalText = element.textContent || ''

  // Split by words
  const words = originalText.split(' ')

  // Create temporary spans for each word to measure line breaks
  element.innerHTML = ''
  const wordElements: HTMLElement[] = []

  words.forEach((word, index) => {
    const span = document.createElement('span')
    span.style.display = 'inline-block'
    span.textContent = word
    element.appendChild(span)

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '))
    }

    wordElements.push(span)
  })

  // Detect line breaks by measuring vertical positions
  const lineGroups: HTMLElement[][] = []
  let currentLine: HTMLElement[] = []
  let lastTop = -1

  wordElements.forEach((wordEl) => {
    const rect = wordEl.getBoundingClientRect()

    if (lastTop === -1) {
      lastTop = rect.top
    }

    // New line detected (with 1px tolerance)
    if (rect.top > lastTop + 1) {
      if (currentLine.length > 0) {
        lineGroups.push([...currentLine])
      }
      currentLine = [wordEl]
      lastTop = rect.top
    } else {
      currentLine.push(wordEl)
    }
  })

  // Add the last line
  if (currentLine.length > 0) {
    lineGroups.push(currentLine)
  }

  // Clear and rebuild with line wrappers
  element.innerHTML = ''
  const lineElements: HTMLElement[] = []

  lineGroups.forEach((lineWords) => {
    const lineElement = document.createElement(tagName)
    lineElement.style.display = 'block'

    lineWords.forEach((wordEl, index) => {
      lineElement.appendChild(document.createTextNode(wordEl.textContent || ''))
      if (index < lineWords.length - 1) {
        lineElement.appendChild(document.createTextNode(' '))
      }
    })

    element.appendChild(lineElement)
    lineElements.push(lineElement)
  })

  return {
    lines: lineElements,
    revert: () => {
      element.innerHTML = originalHTML
    },
  }
}
