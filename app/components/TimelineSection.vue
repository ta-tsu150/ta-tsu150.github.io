<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="timeline" class="section" aria-labelledby="timeline-title">
    <SectionHeading id="timeline-title" title="Timeline" />

    <ol class="timeline">
      <li v-for="entry in profile.timeline" :key="entry.date" class="timeline-item">
        <span class="timeline-dot" aria-hidden="true" />
        <GlassCard class="timeline-card">
          <span class="timeline-date">{{ entry.date }}</span>
          <p
            v-for="(paragraph, i) in entry.paragraphs"
            :key="i"
            :class="{ 'timeline-text-gap': i > 0 }"
          >
            {{ paragraph }}
          </p>
        </GlassCard>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  padding-left: 32px;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2));
  border-radius: 1px;
}

.timeline-item {
  position: relative;
  margin-bottom: 28px;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* scroll reveal — see composables/useScrollReveal.ts */
.reveal-enabled .timeline-item:not(.visible) {
  opacity: 0;
  transform: translateX(-20px);
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 32px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  border: 3px solid var(--bg);
  box-shadow: 0 0 12px var(--accent-glow);
  z-index: 2;
}

.timeline-card {
  padding: 24px;
}

.timeline-date {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.timeline-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
  /* Line breaks come from `\n` in the profile data, not markup. */
  white-space: pre-line;
}

.timeline-text-gap {
  margin-top: 12px;
}
</style>
