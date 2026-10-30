/** Elements that fade/slide in once they enter the viewport. */
const DEFAULT_SELECTORS = ['.glass-card', '.timeline-item', '.section-title'] as const

/**
 * Set on <html> by an inline script in `nuxt.config.ts` before first paint.
 * Its presence is what makes the reveal styles apply at all — without it the
 * page renders fully visible, which is the correct no-JavaScript fallback.
 */
const REVEAL_ENABLED_CLASS = 'reveal-enabled'

/**
 * Set on <html> as soon as this composable runs.
 *
 * The inline script that adds `reveal-enabled` also starts a timer, and drops
 * the class again if this attribute has not appeared. That covers the case the
 * no-JavaScript fallback misses: JavaScript runs, so the class goes on, but the
 * app bundle never arrives or never mounts — leaving every reveal target stuck
 * at `opacity: 0` with nothing to turn it back on.
 */
const REVEAL_READY_ATTR = 'data-reveal-ready'

interface ScrollRevealOptions {
  readonly selectors?: readonly string[]
  /**
   * How far above the bottom of the window the turn happens, in CSS pixels.
   * An element reveals once more than this much of it is showing, and hides
   * again once less is.
   */
  readonly bottomMargin?: number
}

/**
 * Marks matching elements revealed as they scroll into view, and unmarks them
 * when they leave underneath it.
 *
 * The entrance used to fire once and never again, which left the page inert
 * after a single pass to the bottom. Leaving *downwards* is the only exit that
 * resets it: scrolling up pushes content off the bottom edge, and scrolling
 * back down then replays the entrance it would have played the first time.
 * Leaving upwards — the element scrolled past, above the viewport — does not,
 * because that content is behind the reader and ought to be waiting as they
 * left it, not sliding in from the top on the way back.
 *
 * Both edges sit on the same line, which is the point: an element fades out at
 * the position it would fade in at, so the two directions are mirror images,
 * far enough off the bottom edge for the change to be watchable. Resetting only once nothing was left showing put the whole fade-out
 * below the bottom of the window, where nobody could see it happen.
 *
 * Drops the whole effect — leaving every element visible — when the user
 * prefers reduced motion or `IntersectionObserver` is unavailable, so content
 * can never get stuck at `opacity: 0`.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}): void {
  /*
   * A distance from the bottom edge, not a fraction of the element.
   *
   * It began as a fraction, and that is a trap. The ratio an element can reach
   * is capped at the window's height over its own, so anything taller than
   * `1 / threshold` windows can never satisfy it and stays hidden for good. At
   * three tenths that was not hypothetical: on a 375x667 phone the longest
   * opened Works card is 2371px and peaks at 0.281, so it would never have
   * appeared at all.
   *
   * A margin has no such ceiling, and it also puts the turn in the same place
   * for every element rather than 51px into a timeline item and 160px into a
   * Works card.
   */
  const { selectors = DEFAULT_SELECTORS, bottomMargin = 120 } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const root = document.documentElement
    root.setAttribute(REVEAL_READY_ATTR, '')

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target)
            return
          }

          /*
           * `boundingClientRect.top > 0` is the whole of the direction test:
           * the element's own top is still below the top of the viewport, so
           * it went out of the bottom rather than off the top.
           *
           * Elements are no longer unobserved once revealed, which is what
           * makes any of this possible. The observer only reports threshold
           * crossings, so an untouched element costs nothing between them.
           */
          if (entry.boundingClientRect.top > 0) {
            hideAgain(entry.target)
          }
        })
      },
      /*
       * The root is the window with its bottom edge pulled up, so "entering"
       * means crossing that line rather than the edge itself. `threshold: 0`
       * because any overlap with that shortened box is the whole test.
       */
      { rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 },
    )

    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    document.documentElement.classList.remove(REVEAL_ENABLED_CLASS)
  })
}
