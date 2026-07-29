/**
 * Scrolls an element into view, honouring `prefers-reduced-motion`.
 *
 * Shared by the in-page anchor handler and the Skills → Works jump so both feel
 * identical, and so neither has to depend on a global
 * `html { scroll-behavior: smooth }` — that would also animate scroll
 * *restoration* on reload. See composables/useInPageAnchors.ts.
 */
export function smoothScrollTo(target: Element): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'instant' : 'smooth',
    block: 'start',
  })
}
