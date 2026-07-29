import type { ComputedRef, Ref } from 'vue'
import type { WorkId } from '~/types/profile'
import { profile } from '~/data/profile'

const STATE_KEY = 'selected-skill'

/** Where the Works list lives, for the jump that follows a chip press. */
const WORKS_SELECTOR = '#works'

interface SkillFilter {
  /** Label of the pressed skill chip, or null when nothing is selected. */
  readonly selected: Ref<string | null>
  /** Work ids demonstrating the selected skill; empty when nothing is selected. */
  readonly matchedWorkIds: ComputedRef<readonly WorkId[]>
  /** Presses a chip, or releases it when it is already the selected one. */
  toggle: (label: string) => void
  clear: () => void
  isMatched: (id: WorkId) => boolean
}

/**
 * Links the Skills tag cloud to the Works list: pressing a chip highlights the
 * entries that demonstrate that skill and scrolls down to them.
 *
 * Shared across sibling sections via `useState`, so Skills and Works stay in
 * step without prop plumbing through the page.
 */
export function useSkillFilter(): SkillFilter {
  const selected = useState<string | null>(STATE_KEY, () => null)

  const matchedWorkIds = computed<readonly WorkId[]>(() => {
    if (selected.value === null) return []
    return profile.skillTags.find((tag) => tag.label === selected.value)?.works ?? []
  })

  function clear(): void {
    selected.value = null
  }

  function toggle(label: string): void {
    if (selected.value === label) {
      clear()
      return
    }
    selected.value = label

    // Jump to the first matching entry rather than the top of the section —
    // a match can sit well over a viewport below it, and scroll reveal keeps
    // anything off-screen at `opacity: 0`, so landing on the section heading
    // shows the reader nothing they asked for.
    const matched = matchedWorkIds.value

    // Every highlighted entry is revealed up front. Announcing "3 matches" while
    // two of them sit off-screen at `opacity: 0` would be a lie waiting to be
    // scrolled into.
    matched.forEach((id) => revealNow(document.getElementById(`work-${id}`)))

    const target = matched[0]
      ? document.getElementById(`work-${matched[0]}`)
      : document.querySelector(WORKS_SELECTOR)

    if (target) smoothScrollTo(target)
  }

  function isMatched(id: WorkId): boolean {
    return matchedWorkIds.value.includes(id)
  }

  return { selected, matchedWorkIds, toggle, clear, isMatched }
}
