/**
 * Takes over same-page `#anchor` clicks instead of letting the browser navigate
 * to them.
 *
 * The browser default writes the hash into the URL and leaves it there. Nuxt's
 * router then hits this branch of its default `scrollBehavior` on every later
 * load of the same path:
 *
 *   if (to.hash) return { el: to.hash, behavior: scrollBehaviorType ?? 'auto' }
 *
 * That runs *before* any `savedPosition` is considered, so a reload drops you at
 * the last section you clicked rather than where you actually left off. Never
 * writing the hash keeps the router on its `return false` path, which leaves
 * scroll restoration to the browser.
 *
 * The `href` is untouched, so copy-link, middle-click and no-JS all still get a
 * working deep link.
 */
export function useInPageAnchors(): void {
  function scrollBehavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth'
  }

  /**
   * Mirrors what the browser's own anchor navigation does for keyboard users,
   * so the skip link and section jumps still move the focus point.
   */
  function focusWithoutScrolling(target: Element): void {
    if (!(target instanceof HTMLElement)) return

    if (target.hasAttribute('tabindex')) {
      target.focus({ preventScroll: true })
      return
    }

    // Sections are not focusable on their own. Taking `tabindex` away again
    // while the element still holds focus drops it straight back to <body>, so
    // hold onto the attribute until focus has actually moved on.
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    target.addEventListener(
      'blur',
      () => target.removeAttribute('tabindex'),
      { once: true },
    )
  }

  function onClick(event: MouseEvent): void {
    // Leave anything that opens elsewhere, or that someone else already
    // handled, to the default behaviour.
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const eventTarget = event.target
    if (!(eventTarget instanceof Element)) return

    const anchor = eventTarget.closest('a[href^="#"]')
    if (!(anchor instanceof HTMLAnchorElement)) return
    if (anchor.target && anchor.target !== '_self') return

    const { hash } = anchor
    if (!hash || hash === '#') return

    let target: Element | null = null
    try {
      target = document.querySelector(hash)
    }
    catch {
      // `#` followed by something that is not a valid selector — let the
      // browser decide what to do with it.
      return
    }
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    focusWithoutScrolling(target)
  }

  onMounted(() => document.addEventListener('click', onClick))
  onBeforeUnmount(() => document.removeEventListener('click', onClick))
}
