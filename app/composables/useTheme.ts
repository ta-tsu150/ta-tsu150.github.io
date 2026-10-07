import type { ComputedRef, Ref } from 'vue'

export type Theme = 'light' | 'dark'

/** Shared with the inline resolver in `nuxt.config.ts`. Keep both in step. */
export const THEME_STORAGE_KEY = 'ta-tsu150:theme'

/** Marks the window during which colour changes are allowed to cross-fade. */
const CHANGING_ATTR = 'data-theme-changing'

/** Matches `--theme-fade` in `main.css`, plus a little slack. */
const FADE_MS = 360

const META_THEME_COLOR = { light: '#eef5ff', dark: '#0a0a1a' } as const

interface ThemeControl {
  readonly theme: Ref<Theme>
  readonly isDark: ComputedRef<boolean>
  set: (next: Theme) => void
  toggle: () => void
}

/**
 * Reads and writes the active theme.
 *
 * The *visual* state of the page comes from `data-theme` on <html>, which an
 * inline script sets before first paint — not from this ref. That split is what
 * stops the prerendered page and the toggle from flipping on hydration; the ref
 * exists so components can expose the state to assistive technology.
 */
export function useTheme(): ThemeControl {
  const theme = useState<Theme>('theme', () => 'dark')

  let fadeTimer: ReturnType<typeof setTimeout> | undefined

  /*
   * `theme-color` is declared here rather than statically in nuxt.config, and
   * set through the head system rather than by touching the DOM.
   *
   * It used to be a static tag holding the dark value, which left a reader
   * whose system prefers light looking at a light page under a navy address
   * bar. Writing the tag imperatively on mount did not fix it: the head system
   * owns that tag and patches it back to its own value during hydration, so the
   * write was reverted. (It appeared to work from `set()` only because by then
   * hydration had finished and nothing re-rendered it.)
   *
   * Prerendering emits the dark value, which is what the no-JavaScript
   * fallback renders anyway.
   */
  useHead({
    meta: [{ name: 'theme-color', content: () => META_THEME_COLOR[theme.value] }],
  })

  onMounted(() => {
    // Adopt whatever the inline script already decided.
    theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  onBeforeUnmount(() => clearTimeout(fadeTimer))

  function set(next: Theme): void {
    theme.value = next

    const root = document.documentElement
    root.setAttribute(CHANGING_ATTR, '')
    root.dataset.theme = next

    clearTimeout(fadeTimer)
    fadeTimer = setTimeout(() => root.removeAttribute(CHANGING_ATTR), FADE_MS)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    }
    catch {
      // Private browsing or a full quota: the choice just will not persist.
    }
  }

  function toggle(): void {
    set(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, isDark: computed(() => theme.value === 'dark'), set, toggle }
}
