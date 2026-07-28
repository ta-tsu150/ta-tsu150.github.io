/** Elements that fade/slide in once they enter the viewport. */
const DEFAULT_SELECTORS = ['.glass-card', '.timeline-item', '.section-title'] as const

/** Class the stylesheet keys the "revealed" state off. */
const VISIBLE_CLASS = 'visible'

/**
 * Set on <html> by an inline script in `nuxt.config.ts` before first paint.
 * Its presence is what makes the reveal styles apply at all — without it the
 * page renders fully visible, which is the correct no-JavaScript fallback.
 */
const REVEAL_ENABLED_CLASS = 'reveal-enabled'

interface ScrollRevealOptions {
  readonly selectors?: readonly string[]
  readonly threshold?: number
}

/**
 * Adds `.visible` to matching elements as they scroll into view.
 *
 * Drops the whole effect — leaving every element visible — when the user
 * prefers reduced motion or `IntersectionObserver` is unavailable, so content
 * can never get stuck at `opacity: 0`.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}): void {
  const { selectors = DEFAULT_SELECTORS, threshold = 0.1 } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const root = document.documentElement
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(selectors.join(',')),
    )

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (
      targets.length === 0
      || prefersReducedMotion
      || !('IntersectionObserver' in window)
    ) {
      root.classList.remove(REVEAL_ENABLED_CLASS)
      return
    }

    observer = new IntersectionObserver(
      (entries, self) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(VISIBLE_CLASS)
          // Reveal is one-way: stop watching once it has fired.
          self.unobserve(entry.target)
        })
      },
      { threshold },
    )

    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    document.documentElement.classList.remove(REVEAL_ENABLED_CLASS)
  })
}
