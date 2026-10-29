/**
 * Attribute the stylesheet keys the scroll-reveal "revealed" state off.
 *
 * Deliberately an attribute rather than a class: Vue's `:class` patching
 * rewrites the whole class list, which silently wipes any class added
 * imperatively. `WorkCard` binds `:class` for the skill-filter states, so a
 * class-based reveal flag would be erased the moment a chip is pressed —
 * un-revealing cards that had already faded in.
 */
export const REVEAL_ATTR = 'data-revealed'

/**
 * Marks an element as revealed, either because it scrolled into view or because
 * an explicit user action surfaced it.
 */
export function revealNow(element: Element | null | undefined): void {
  element?.setAttribute(REVEAL_ATTR, '')
}

/**
 * Puts an element back to its hidden state, so that scrolling past it again
 * replays the entrance. Only ever called for elements that have left below the
 * viewport — see `useScrollReveal`.
 */
export function hideAgain(element: Element | null | undefined): void {
  element?.removeAttribute(REVEAL_ATTR)
}
