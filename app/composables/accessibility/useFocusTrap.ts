import type { Ref } from 'vue'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

interface FocusTrapOptions {
  /** Called when Escape is pressed while the trap is active. */
  onEscape?: () => void
  /**
   * A focusable that belongs to the dialog's tab loop despite living outside
   * `container` — typically a trigger that doubles as the close control. It is
   * placed first in the loop, matching where such a control normally sits.
   */
  alsoFocusable?: Ref<HTMLElement | null>
}

/**
 * Keeps keyboard focus inside `container` (plus `alsoFocusable`) while
 * `isActive` is true.
 *
 * On activation focus moves to the first focusable *inside* the container — the
 * trigger has just been pressed, so putting focus back on it would feel like
 * nothing happened. On deactivation focus returns to whatever was focused
 * before, unless closing has already sent it somewhere else deliberately.
 */
export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  isActive: Ref<boolean>,
  options: FocusTrapOptions = {},
): void {
  let previouslyFocused: HTMLElement | null = null

  const isRendered = (el: HTMLElement): boolean =>
    // `offsetParent` is null for position: fixed elements, so measure
    // visibility with client rects instead.
    el.getClientRects().length > 0

  function focusableChildren(): HTMLElement[] {
    const root = container.value
    if (!root) return []
    return Array.from(
      root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter(isRendered)
  }

  /** The full tab loop: the external control, then the container's own items. */
  function focusLoop(): HTMLElement[] {
    const external = options.alsoFocusable?.value
    const outside = external && isRendered(external) ? [external] : []
    return [...outside, ...focusableChildren()]
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!isActive.value) return

    if (event.key === 'Escape') {
      event.preventDefault()
      options.onEscape?.()
      return
    }

    if (event.key !== 'Tab') return

    const items = focusLoop()
    if (items.length === 0) return

    /*
     * Every Tab is driven explicitly rather than only wrapping at the ends.
     * `alsoFocusable` lives in a different part of the DOM from the container
     * (the panel is teleported to <body>), so the loop order and the document's
     * own tab order do not agree — deciding by index is the only way to keep
     * focus inside.
     */
    event.preventDefault()

    const current = items.indexOf(document.activeElement as HTMLElement)
    if (current === -1) {
      items[0]?.focus()
      return
    }

    const step = event.shiftKey ? -1 : 1
    const next = (current + step + items.length) % items.length
    items[next]?.focus()
  }

  watch(isActive, async (active) => {
    if (active) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      focusableChildren()[0]?.focus()
      return
    }
    // Closing may itself have moved focus on purpose — a nav link jumping to
    // its section, for instance. Only pull focus back to the opener when it is
    // still inside the dialog, or has fallen back to <body> because the dialog
    // is going away.
    const focused = document.activeElement
    const stillInsideDialog = focused instanceof HTMLElement
      && ((container.value?.contains(focused) ?? false)
        || focused === options.alsoFocusable?.value)
    const droppedToBody = focused === null || focused === document.body

    if (stillInsideDialog || droppedToBody) previouslyFocused?.focus()
    previouslyFocused = null
  })

  onMounted(() => document.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
}
