<script setup lang="ts">
import type { WorkEntry } from '~/types/profile'

withDefaults(
  defineProps<{
    entry: WorkEntry
    /**
     * Whether this entry demonstrates the currently selected skill.
     * `null` means no skill is selected, so nothing is emphasised.
     */
    match?: boolean | null
  }>(),
  { match: null },
)
</script>

<template>
  <GlassCard
    :id="`work-${entry.id}`"
    as="article"
    class="work"
    :class="{ 'is-match': match === true, 'is-muted': match === false }"
  >
    <header class="work-head">
      <span class="work-icon" aria-hidden="true">
        <Icon :name="entry.icon" />
      </span>
      <div class="work-heading">
        <h3>{{ entry.title }}</h3>
        <p class="work-period">{{ entry.period }}</p>
      </div>
    </header>

    <dl class="work-meta">
      <dt>課題</dt>
      <dd>{{ entry.challenge }}</dd>
      <dt>担当</dt>
      <dd>{{ entry.role }}</dd>
    </dl>

    <ul class="work-stack">
      <li v-for="item in entry.stack" :key="item">{{ item }}</li>
    </ul>

    <section class="work-topics">
      <h4>技術的に取り組んだこと</h4>
      <dl>
        <template v-for="topic in entry.topics" :key="topic.title">
          <dt>{{ topic.title }}</dt>
          <dd>{{ topic.body }}</dd>
        </template>
      </dl>
    </section>
  </GlassCard>
</template>

<style scoped>
.work {
  display: flex;
  flex-direction: column;
  gap: 20px;
  /*
   * Clears the fixed navbar plus the sticky filter bar when a skill chip jumps
   * straight to this card.
   */
  scroll-margin-top: 130px;
  /*
   * Restates the `.glass-card` transitions from main.css because this scoped
   * rule wins on specificity and a shorthand cannot be extended — dropping them
   * would kill the scroll-reveal animation. `filter` is the addition.
   */
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease,
    border-color 0.3s ease, filter 0.25s ease;
}

/* ===== Skill filter emphasis ===== */

/*
 * `.glass-card` already owns opacity for the scroll reveal, so the muted state
 * dims via a colour overlay and desaturation instead of fighting over it.
 */
.work.is-muted {
  filter: saturate(0.4) brightness(0.82);
}

.work.is-match {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-glow), 0 12px 40px rgba(0, 0, 0, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .work.is-muted {
    /* Keep the cue, drop the animated feel. */
    filter: saturate(0.35);
  }
}

/* ===== Header ===== */
.work-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.work-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--bg);
  font-size: 1.3rem;
}

.work-heading h3 {
  font-size: 1.1rem;
  line-height: 1.4;
}

.work-period {
  margin-top: 2px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--accent);
}

/* ===== 課題 / 担当 ===== */
.work-meta {
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: 6px 16px;
  font-size: 0.9rem;
}

.work-meta dt {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  padding-top: 0.35em;
}

.work-meta dd {
  color: var(--text);
  line-height: 1.75;
}

/* ===== Stack chips ===== */
.work-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.work-stack li {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
  color: var(--text-muted);
}

/* ===== Topics ===== */
.work-topics {
  padding-top: 4px;
  border-top: 1px solid var(--glass-border);
}

.work-topics h4 {
  margin: 16px 0 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.work-topics dt {
  position: relative;
  padding-left: 14px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
}

.work-topics dt::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.work-topics dd {
  padding: 4px 0 16px 14px;
  font-size: 0.88rem;
  line-height: 1.8;
  color: var(--text-muted);
}

.work-topics dd:last-child {
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .work-meta {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .work-meta dt {
    padding-top: 8px;
  }
}
</style>
