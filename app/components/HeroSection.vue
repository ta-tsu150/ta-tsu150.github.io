<script setup lang="ts">
import { profile } from '~/data/profile'

/**
 * The name split for the per-character entrance.
 *
 * `Array.from` rather than `split('')` so the split stays correct if the name
 * ever contains characters outside the basic plane.
 */
const nameChars = Array.from(profile.name)
</script>

<template>
  <section id="hero" class="hero" aria-labelledby="hero-name">
    <div class="hero-content">
      <p class="hero-greeting">Welcome</p>

      <!--
        Both lines sit inside the heading so assistive technology reads one
        title — "Tatsuya Ichino Portfolio" — while each line is styled apart.
        The greeting stays outside it: it is a salutation, not part of the title.

        The explicit `{{ ' ' }}` is load-bearing. Vue's compiler drops
        whitespace-only text nodes that span a newline, which ran the two spans
        together into "Tatsuya IchinoPortfolio" for screen readers. Flex layout
        does not render a whitespace-only item, so it costs nothing visually.
      -->
      <h1 id="hero-name" class="hero-heading">
        <span class="hero-name">
          <!--
            The per-character spans are decoration. Each needs `inline-block` to
            be transformable, and that can make some screen readers announce the
            name letter by letter — so they are hidden and the real string is
            exposed once, out of sight.
          -->
          <span class="sr-only">{{ profile.name }}</span>
          <span aria-hidden="true" :style="{ '--char-span': nameChars.length - 1 }">
            <span
              v-for="(char, i) in nameChars"
              :key="i"
              class="hero-char"
              :style="{ '--char-index': i }"
            >{{ char }}</span>
          </span>
        </span>{{ ' ' }}
        <span class="hero-kind">Portfolio</span>
      </h1>

      <!--
        One action only. GitHub lives in the nav drawer, which is reachable from
        here anyway, so repeating it in the first view spent attention on a link
        that is not what a first-time reader needs next.
      -->
      <div class="hero-actions">
        <a href="#about" class="btn btn-primary">About Me</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Deliberately three things: a greeting, the name, and what this site is.
 *
 * The role badge, the tagline and the role/stack/interests card that used to sit
 * here all restated content from further down the page — the badge and the card's
 * first row were the same string — so removing them cost no information and took
 * the first view from 277 characters to about 35.
 *
 * The volume that went with them is replaced by motion. The name arrives one
 * character at a time, then the two labels open outwards around it, then the
 * buttons. Everything is CSS keyframes with `both` fill, so it plays without
 * JavaScript and needs no scroll trigger — this block is above the fold by
 * definition.
 */
.hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
}

/* ===== Greeting and kind labels ===== */

/*
 * Both open from tight to their final tracking. Animating `letter-spacing` costs
 * layout, but it is two short words for well under a second, and each sits alone
 * on a centred line — the width change expands from the centre and moves nothing
 * else.
 */
.hero-greeting {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  /* Optical centring: letter-spacing adds a trailing gap after the last glyph. */
  text-indent: 0.42em;
  color: var(--text-muted);
  margin-bottom: 22px;
  animation: label-open 900ms cubic-bezier(0.22, 1, 0.36, 1) 640ms both;
}

.hero-kind {
  font-size: clamp(0.8rem, 1.6vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.58em;
  text-indent: 0.58em;
  text-transform: uppercase;
  color: var(--accent);
  animation: label-open 900ms cubic-bezier(0.22, 1, 0.36, 1) 760ms both;
}

@keyframes label-open {
  from {
    opacity: 0;
    letter-spacing: 0.02em;
    text-indent: 0.02em;
  }
  to {
    opacity: 1;
  }
}

/* ===== Name ===== */
.hero-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 48px;
}

.hero-name {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

/*
 * Each character carries a solid colour sampled from the old gradient's ramp
 * instead of the line sharing one `background-clip: text` fill.
 *
 * That swap is forced, not stylistic. `background-clip: text` with a transparent
 * text fill stops rendering entirely as soon as anything promotes the element to
 * its own paint context — `transform`, `opacity` below 1, `mask`, `will-change`
 * or simply having an `animation`, on the clipped element *or* on any descendant.
 * Measured every combination: the only ones that survived were a completely
 * static line, or a split line where the untransformed characters rendered and
 * the transformed ones vanished. So an animated name and a clipped gradient
 * cannot coexist.
 *
 * At this size the per-glyph steps are not perceptible; what reads is the same
 * left-to-right sweep. The vertical component of the old 135deg gradient is the
 * only thing genuinely lost.
 */
.hero-char {
  display: inline-block;
  /* Keeps the space between the two names from collapsing to zero width. */
  white-space: pre;

  /* Position along the ramp: 0 at the first character, 1 at the last. */
  --t: calc(var(--char-index) / var(--char-span));
  /* Piecewise, matching the old three stops: text -> accent, then accent -> accent-2. */
  --ramp-a: clamp(0, calc(var(--t) * 2), 1);
  --ramp-b: clamp(0, calc(var(--t) * 2 - 1), 1);
  color: color-mix(
    in srgb,
    color-mix(in srgb, var(--accent) calc(var(--ramp-a) * 100%), var(--text))
      calc((1 - var(--ramp-b)) * 100%),
    var(--accent-2)
  );

  animation: char-rise 620ms cubic-bezier(0.34, 1.4, 0.64, 1)
    calc(var(--char-index) * 42ms) both;
}

@keyframes char-rise {
  from {
    opacity: 0;
    transform: translateY(0.42em) rotate(4deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0);
  }
}

/* ===== Actions ===== */
.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  animation: actions-in 700ms cubic-bezier(0.22, 1, 0.36, 1) 880ms both;
}

@keyframes actions-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/*
 * The global reduced-motion rule only clamps durations, which would leave these
 * stuck on their opening frame. Drop the animations outright so the final state
 * is what renders.
 */
@media (prefers-reduced-motion: reduce) {
  .hero-greeting,
  .hero-kind,
  .hero-char,
  .hero-actions {
    animation: none;
  }
}
</style>
