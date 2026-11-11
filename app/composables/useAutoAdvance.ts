/**
 * A timer that steps something forward on its own, and stops while anyone is
 * holding it.
 *
 * The first version of this drove the slideshow off the `animationend` of its
 * own progress bar, which was appealing — one clock, and pausing was a single
 * CSS property. It is also wrong: `animationend` only arrives on a rendered
 * frame, and a browser stops producing those for a tab in the background.
 * Measured here, the bar reached `finished` with no event ever dispatched, and
 * the slideshow stayed on that slide for good. A `setTimeout` is throttled in
 * the background too, but it always fires once the tab comes back.
 *
 * So the timer below is the clock, and the bar is only a picture of it. The
 * two are held together by one duration, passed in here and handed to the CSS
 * as a custom property, so there is still only one number to change.
 */
export function useAutoAdvance(step: () => void, durationMs: number) {
  /*
   * Reasons, not a boolean. Focus leaving should not start the timer again
   * while the tab is still hidden, and a counter would have to be balanced
   * perfectly to avoid drifting out of zero.
   */
  const holds = ref(new Set<string>())
  const paused = computed(() => holds.value.size > 0)

  let timer: ReturnType<typeof setTimeout> | undefined
  let remaining = durationMs
  let startedAt = 0
  let enabled = false

  function stop(): void {
    if (timer === undefined) return
    clearTimeout(timer)
    timer = undefined
  }

  function start(ms: number): void {
    stop()
    if (!enabled || paused.value) return
    startedAt = Date.now()
    timer = setTimeout(() => {
      timer = undefined
      remaining = durationMs
      step()
    }, ms)
  }

  /** Begins the full interval again. Call this whenever the step changes. */
  function restart(): void {
    remaining = durationMs
    start(remaining)
  }

  function hold(reason: string): void {
    const next = new Set(holds.value)
    next.add(reason)
    holds.value = next
  }

  function release(reason: string): void {
    const next = new Set(holds.value)
    next.delete(reason)
    holds.value = next
  }

  // Resuming picks up what was left rather than starting over, so the bar does
  // not jump backwards when the pointer passes across it.
  watch(paused, (isPaused) => {
    if (isPaused) {
      if (timer !== undefined) remaining = Math.max(0, remaining - (Date.now() - startedAt))
      stop()
      return
    }
    start(remaining)
  })

  function onVisibilityChange(): void {
    if (document.visibilityState === 'hidden') hold('hidden')
    else release('hidden')
  }

  onMounted(() => {
    // Checked once, in JS, because the CSS rule that removes the bar's
    // animation cannot stop a timer.
    enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.addEventListener('visibilitychange', onVisibilityChange)
    restart()
  })

  onBeforeUnmount(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  return { paused, hold, release, restart }
}
