interface SwipeHandlers {
  readonly left?: () => void
  readonly right?: () => void
}

/**
 * Horizontal swipe, as plain pointer listeners to spread onto an element.
 *
 * Pointer events rather than touch events, so a mouse drag works the same way
 * and there is one code path instead of two.
 *
 * The gesture is only claimed when the horizontal movement beats the vertical
 * one. Without that test a slightly diagonal flick down the page would count
 * as a swipe, and the carousel would jump while the visitor was only trying to
 * scroll past it.
 */
export function useSwipe(handlers: SwipeHandlers, threshold = 48) {
  let startX = 0
  let startY = 0
  let tracking = false

  return {
    pointerdown(event: PointerEvent): void {
      // Secondary buttons open menus; they are not the start of a drag.
      if (event.pointerType === 'mouse' && event.button !== 0) return
      startX = event.clientX
      startY = event.clientY
      tracking = true
    },

    pointerup(event: PointerEvent): void {
      if (!tracking) return
      tracking = false

      const dx = event.clientX - startX
      const dy = event.clientY - startY
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return

      // Dragging the image leftwards asks for the next slide, the way a
      // physical stack would move.
      if (dx < 0) handlers.left?.()
      else handlers.right?.()
    },

    pointercancel(): void {
      tracking = false
    },
  }
}
