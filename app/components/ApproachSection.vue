<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="approach" class="section" aria-labelledby="approach-title">
    <SectionHeading id="approach-title" title="Approach" />

    <!--
      Closed by default. Each point runs to several hundred words, and three of
      them open at once ran the section past two phone screens before Timeline
      began. Collapsed, the three subjects read as a list of what he works on,
      and the argument behind each is one press away.
    -->
    <GlassCard
      v-for="point in profile.approach.points"
      :key="point.title"
      as="article"
      class="approach-card"
    >
      <details class="approach-item disclosure">
        <summary>
          <Icon class="disclosure-chevron" name="lucide:chevron-down" aria-hidden="true" />
          <h3>{{ point.title }}</h3>
        </summary>
        <p>{{ point.body }}</p>
      </details>
    </GlassCard>

    <p class="approach-closing">{{ profile.approach.closing }}</p>
  </section>
</template>

<style scoped>
.approach-card {
  padding: 8px 28px;
}

.approach-card + .approach-card {
  margin-top: 16px;
}

/*
 * The whole row is the control, not just the words in it. A heading sized
 * summary with a 20px target beside it invites a press anywhere along the
 * line, and a press that lands between the chevron and the text doing nothing
 * reads as broken.
 */
.approach-item > summary {
  gap: 14px;
  padding: 18px 0;
}

.approach-item h3 {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.approach-item > summary:hover h3 {
  color: var(--accent);
}

.approach-item .disclosure-chevron {
  font-size: 1.25rem;
  color: var(--accent);
}

.approach-item p {
  padding: 4px 0 22px 34px;
  color: var(--text-muted);
  /*
   * Looser than the 1.75 the cards elsewhere use. This is the one block of
   * sustained reading on the page, and mixed kana and kanji need the room.
   *
   * Line breaks come from `
` in the profile data, not markup.
   */
  line-height: 2;
  white-space: pre-line;
}

.approach-closing {
  margin-top: 28px;
  color: var(--text-muted);
  line-height: 1.9;
}

@media (max-width: 768px) {
  .approach-card {
    padding: 4px 20px;
  }

  .approach-item p {
    padding-left: 0;
  }
}
</style>
