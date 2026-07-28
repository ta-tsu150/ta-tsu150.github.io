import type { ComputedRef } from 'vue'

/** Distance above a section's top at which it becomes the active one (px). */
const DEFAULT_OFFSET = 120

/**
 * Tracks which in-page section is currently under the navbar, so the matching
 * nav link can be highlighted.
 *
 * Returns an empty string until mounted, which keeps the prerendered HTML and
 * the first client render in agreement.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  offset: number = DEFAULT_OFFSET,
): ComputedRef<string> {
  const activeId = ref('')

  let handleScroll: (() => void) | null = null

  onMounted(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    handleScroll = () => {
      const threshold = window.scrollY + offset
      let current = sections[0]?.id ?? ''
      for (const section of sections) {
        if (section.offsetTop <= threshold) current = section.id
      }
      activeId.value = current
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (handleScroll) window.removeEventListener('scroll', handleScroll)
    handleScroll = null
  })

  return computed(() => activeId.value)
}
