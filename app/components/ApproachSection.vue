<script setup lang="ts">
import { profile } from '~/data/profile'

/** Matches the `max-width: 768px` breakpoint the rest of the styles use. */
const WIDE = '(min-width: 769px)'

/*
 * Closed in the prerendered HTML, opened on a wide screen once the page is
 * running.
 *
 * It cannot be decided at build time — a static page has no viewport — and it
 * cannot be done in CSS either, because `open` is a DOM attribute and forcing
 * the content visible without it leaves a control whose chevron and state
 * disagree with what is on screen.
 *
 * Closed is the right thing to ship in the HTML rather than the other way
 * round. If the bundle never arrives, every reader gets three headings that
 * still open on a press, and the phone — the case the rest of this page is
 * tuned for — does no work at all on load. Opening instead would have the
 * narrow screen collapse two thousand pixels just after first paint.
 *
 * Only the initial state. A later resize leaves the disclosures as the reader
 * left them, because re-running this would throw away their own presses.
 */
const openByDefault = ref(false)

onMounted(() => {
  openByDefault.value = window.matchMedia(WIDE).matches
})
</script>

<template>
  <section id="approach" class="section" aria-labelledby="approach-title">
    <SectionHeading id="approach-title" title="Approach" />

    <!--
      Collapsed on a phone, open on a wide screen. Each point runs to several
      hundred words, and three of them open at once ran the section past two
      phone screens before Timeline began — while on a desktop the same three
      cost a scroll nobody notices, and leaving the strongest material behind a
      press there would be hiding it for no gain.
    -->
    <GlassCard
      v-for="point in profile.approach.points"
      :key="point.title"
      as="article"
      class="approach-card"
    >
      <details class="approach-item disclosure" :open="openByDefault">
        <summary>
          <Icon class="disclosure-chevron" name="lucide:chevron-down" aria-hidden="true" />
          <h3>{{ point.title }}</h3>
        </summary>
        <p>{{ point.body }}</p>
      </details>
    </GlassCard>
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
  padding: 20px 0;
}

/*
 * Closer to `.about-name`'s 1.3rem than to the 1.1rem a Works card's title
 * carries. Three of these are the whole section while it is collapsed, so
 * they are the section's content and not a label on top of it.
 */
.approach-item h3 {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.approach-item > summary:hover h3 {
  color: var(--accent);
}

.approach-item .disclosure-chevron {
  font-size: 1.4rem;
  color: var(--accent);
}

.approach-item p {
  padding: 4px 0 22px 38px;
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

@media (max-width: 768px) {
  .approach-card {
    padding: 4px 20px;
  }

  .approach-item p {
    padding-left: 0;
  }
}
</style>
