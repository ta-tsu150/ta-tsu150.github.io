<script setup lang="ts">
import { privateIntro } from '~/data/profile'
</script>

<template>
  <GlassCard class="intro">
    <!--
      Two columns on a wide screen, one on a narrow one, from the same markup
      and in the same order — so the opening is read before the body either
      way, and nothing has to be repeated or hidden to make that true.
    -->
    <div class="intro-opening">
      <p class="intro-eyebrow">{{ privateIntro.eyebrow }}</p>
      <p class="intro-lead">{{ privateIntro.lead }}</p>
    </div>

    <div class="intro-body">
      <p v-for="paragraph in privateIntro.paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>
  </GlassCard>
</template>

<style scoped>
.intro {
  display: grid;
  gap: 28px;
}

/*
 * The opening column is given the smaller share. It holds two short lines and
 * the body holds everything else, so an even split would leave one side white
 * for the length of the other.
 */
@media (min-width: 769px) {
  .intro {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
    gap: 48px;
    align-items: start;
  }
}

.intro-eyebrow {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}

.intro-lead {
  font-size: 1.12rem;
  line-height: 1.95;
  /* Sits between the body and a heading: not bold, but not the body weight. */
  font-weight: 500;
  color: var(--text);
}

.intro-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--text-muted);
  line-height: 2.05;
}

/*
 * A rule between the two columns rather than a border on the card: it fades
 * out at both ends, so it separates the columns without drawing a box around
 * either. Only where there are two columns to separate.
 *
 * Drawn in `--accent-soft-border`, not `--glass-border`. The latter is the
 * colour of the card's own edge, and a line of it sitting on the card was
 * measured invisible — the two are the same value over nearly the same
 * background.
 */
@media (min-width: 769px) {
  .intro-body {
    padding-left: 48px;
    margin-left: -48px;
    border-left: 1px solid transparent;
    border-image: linear-gradient(
      transparent,
      var(--accent-soft-border) 18%,
      var(--accent-soft-border) 82%,
      transparent
    ) 1;
  }
}

@media (max-width: 768px) {
  .intro-lead {
    font-size: 1.04rem;
  }

  /* The columns are stacked here, so the rule turns to lie between them. */
  .intro-body {
    padding-top: 24px;
    border-top: 1px solid var(--accent-soft-border);
  }
}
</style>
