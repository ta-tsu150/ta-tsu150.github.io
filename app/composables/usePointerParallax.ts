/**
 * How far the furthest blob travels, in CSS pixels, from the centre of the
 * viewport to an edge. Each blob scales this by its own `--depth`.
 *
 * Small on purpose. The blobs sit under a 120px blur with no edge to judge
 * movement against, so this reads as the background leaning towards the
 * pointer rather than as anything following it.
 */
const REACH = 36

/**
 * Only on a device with a pointer that can hover. A touch screen has no
 * resting cursor position, so `pointermove` arrives only mid-drag and the
 * background would lurch with the scroll.
 */
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Leans the background blobs towards the pointer.
 *
 * Writes two custom properties on the host element and leaves the rest to CSS:
 * the blobs already run a keyframe animation on `transform`, so the offset
 * goes on the separate `translate` property, which composes with it instead of
 * fighting it, and the easing back into place is a CSS transition rather than
 * a frame loop of our own.
 *
 * Nothing is registered at all without a fine pointer or with reduced motion
 * asked for, so the cost on a phone is one media query at mount.
 */
export function usePointerParallax(host: Ref<HTMLElement | null>): void {
  let detach: (() => void) | null = null

  onMounted(() => {
    const el = host.value
    if (!el) return

    if (
      !window.matchMedia(FINE_POINTER).matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    let frame = 0

    /*
     * Coalesced to one write per frame. `pointermove` fires far more often
     * than that on a high-polling-rate mouse, and every write past the first
     * in a frame is thrown away by the compositor anyway.
     */
    function write(clientX: number, clientY: number): void {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = (clientX / window.innerWidth) * 2 - 1
        const y = (clientY / window.innerHeight) * 2 - 1
        el!.style.setProperty('--pointer-x', `${(x * REACH).toFixed(1)}px`)
        el!.style.setProperty('--pointer-y', `${(y * REACH).toFixed(1)}px`)
      })
    }

    const onMove = (event: PointerEvent): void => write(event.clientX, event.clientY)

    /* Back to centre when the pointer leaves the window, rather than frozen
       wherever it happened to exit. */
    const onLeave = (): void => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      el.style.setProperty('--pointer-x', '0px')
      el.style.setProperty('--pointer-y', '0px')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    detach = () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  })

  onBeforeUnmount(() => {
    detach?.()
    detach = null
  })
}
