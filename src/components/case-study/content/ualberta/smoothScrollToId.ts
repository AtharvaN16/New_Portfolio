function findScrollableParent(node: HTMLElement): HTMLElement | null {
  let el: HTMLElement | null = node.parentElement

  while (el) {
    const { overflowY } = getComputedStyle(el)
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      el.scrollHeight > el.clientHeight
    ) {
      return el
    }
    el = el.parentElement
  }

  return null
}

export function smoothScrollToId(id: string, offset = 12) {
  const target = document.getElementById(id)
  if (!target) return

  const scrollParent = findScrollableParent(target)

  if (!scrollParent) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  const parentTop = scrollParent.getBoundingClientRect().top
  const targetTop = target.getBoundingClientRect().top

  scrollParent.scrollTo({
    top: scrollParent.scrollTop + targetTop - parentTop - offset,
    behavior: 'smooth',
  })
}
