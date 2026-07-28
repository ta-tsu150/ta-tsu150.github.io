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
}

/**
 * Keeps keyboard focus inside `container` while `isActive` is true.
 *
 * On activation focus moves to the first focusable child; on deactivation it
 * returns to whatever was focused before, so closing a dialog with the keyboard
 * puts the user back on the control that opened it.
 */
export function useFocusTrap(
  container: Ref<HTMLElement | null>,
  isActive: Ref<boolean>,
  options: FocusTrapOptions = {},
): void {
  let previouslyFocused: HTMLElement | null = null

  function focusableChildren(): HTMLElement[] {
    const root = container.value
    if (!root) return []
    return Array.from(
      root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      // `offsetParent` is null for position: fixed elements, so measure
      // visibility with client rects instead.
    ).filter((el) => el.getClientRects().length > 0)
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (!isActive.value) return

    if (event.key === 'Escape') {
      event.preventDefault()
      options.onEscape?.()
      return
    }

    if (event.key !== 'Tab') return

    const items = focusableChildren()
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(isActive, async (active) => {
    if (active) {
      previouslyFocused = document.activeElement as HTMLElement | null
      await nextTick()
      focusableChildren()[0]?.focus()
      return
    }
    previouslyFocused?.focus()
    previouslyFocused = null
  })

  onMounted(() => document.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
}
