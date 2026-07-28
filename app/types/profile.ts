/** A `key: value` pair rendered as a labelled row (hero info, detail cards). */
export interface LabelledRow {
  readonly key: string
  readonly value: string
}

/** A single entry in the navigation drawer. */
export interface NavItem {
  readonly label: string
  /**
   * In-page anchor (`#about`), a route (`/blog`), or an absolute URL when
   * `external` is true.
   */
  readonly href: string
  /** Opens in a new tab and is never highlighted as the active section. */
  readonly external?: boolean
}

/**
 * A labelled block of nav entries, rendered with a divider between groups.
 *
 * Keeping route links and in-page anchors in separate groups matters once the
 * site has more than one page: an anchor like `#skills` only means something
 * on the page that actually has that section.
 */
export interface NavGroup {
  /** Omitted while a single group would make the heading redundant. */
  readonly label?: string
  readonly items: readonly NavItem[]
}

/** One card in the Skills grid. */
export interface SkillCategory {
  /** Iconify name, e.g. `lucide:server`. */
  readonly icon: string
  readonly title: string
  readonly detail: string
}

/** One entry on the vertical timeline. */
export interface TimelineEntry {
  readonly date: string
  /** Rendered as separate `<p>` elements, in order. */
  readonly paragraphs: readonly string[]
}

/** Everything the page renders, in one place. */
export interface Profile {
  readonly handle: string
  readonly name: string
  readonly nameJa: string
  readonly role: string
  readonly tagline: string
  readonly summary: string
  readonly birthplace: string
  readonly birthday: string
  readonly githubUrl: string
  readonly heroInfo: readonly LabelledRow[]
  readonly details: readonly (readonly LabelledRow[])[]
  readonly skills: readonly SkillCategory[]
  readonly skillTags: readonly string[]
  readonly timeline: readonly TimelineEntry[]
}
