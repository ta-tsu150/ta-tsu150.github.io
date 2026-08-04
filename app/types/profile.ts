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

/**
 * Ids of the Works entries.
 *
 * Declared as a union rather than a bare string so that the `works` references
 * on each skill tag are checked at compile time. Adding an entry means adding
 * its id here too.
 */
export type WorkId = 'internal-hr' | 'medical-ops' | 'btoc-mobile' | 'dotnet-training'

/**
 * One chip in the Skills tag cloud.
 *
 * `works` lists the entries that actually demonstrate the skill — including
 * ones where the evidence is in the topic text rather than the stack list. An
 * empty array means nothing on the page backs it up yet, and the chip renders
 * as plain text instead of a control.
 */
export interface SkillTag {
  readonly label: string
  readonly works: readonly WorkId[]
}

/** One technical topic inside a work entry. */
export interface WorkTopic {
  readonly title: string
  readonly body: string
}

/**
 * One entry in the Works section — the evidence behind the Skills tags.
 *
 * Client and product names never appear here. Describe engagements by industry
 * and system type only, and keep internal system names, ticket ids and figures
 * out entirely. Anything committed here ships in the client bundle, so an entry
 * that is not cleared for publication must not be in this file at all.
 */
export interface WorkEntry {
  /** Stable key for list rendering, and the target of `SkillTag.works`. */
  readonly id: WorkId
  /** Industry plus system type, e.g. `医療・調剤領域の業務システム`. */
  readonly title: string
  readonly period: string
  /** Iconify name, e.g. `lucide:smartphone`. */
  readonly icon: string
  readonly challenge: string
  readonly role: string
  readonly stack: readonly string[]
  readonly topics: readonly WorkTopic[]
}

/** Everything the page renders, in one place. */
export interface Profile {
  readonly handle: string
  readonly name: string
  readonly nameJa: string
  readonly summary: string
  /** Path under `public/`, e.g. `/images/tatsu.jpg`. Case-sensitive once deployed. */
  readonly avatar: string
  readonly birthplace: string
  readonly birthday: string
  readonly details: readonly (readonly LabelledRow[])[]
  readonly skills: readonly SkillCategory[]
  readonly skillTags: readonly SkillTag[]
  readonly works: readonly WorkEntry[]
  readonly timeline: readonly TimelineEntry[]
}
