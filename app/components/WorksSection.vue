<script setup lang="ts">
import { profile } from '~/data/profile'

const { selected, matchedWorkIds, clear, isMatched } = useSkillFilter()
</script>

<template>
  <section id="works" class="section" aria-labelledby="works-title">
    <SectionHeading id="works-title" title="Works" />

    <!--
      `aria-live` so the filter result is announced: the visual cue is a
      highlight further down the page, which a screen reader user would miss.
    -->
    <div class="works-filter" aria-live="polite">
      <p v-if="selected !== null" class="works-filter-bar">
        <span>
          <strong>{{ selected }}</strong>
          を使った Works {{ matchedWorkIds.length }} 件を強調しています
        </span>
        <button type="button" class="works-filter-clear" @click="clear">
          <Icon name="lucide:x" aria-hidden="true" />
          解除
        </button>
      </p>
    </div>

    <div class="works-list">
      <WorkCard
        v-for="entry in profile.works"
        :key="entry.id"
        :entry="entry"
        :match="selected === null ? null : isMatched(entry.id)"
      />
    </div>
  </section>
</template>

<style scoped>
/*
 * Sticky because a chip press jumps straight to the matching entry, which can
 * be well past this bar — the clear control has to stay reachable. Sits below
 * the fixed navbar; `.work` carries a matching `scroll-margin-top`.
 */
.works-filter {
  position: sticky;
  top: 74px;
  z-index: 50;
}

.works-filter:not(:empty) {
  margin-bottom: 20px;
}

.works-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  /* Opaque enough that cards scrolling underneath do not show through. */
  background: rgba(24, 24, 48, 0.92);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid var(--accent-glow);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.works-filter-bar strong {
  color: var(--accent);
}

.works-filter-clear {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.works-filter-clear:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--text-muted);
}

.works-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
