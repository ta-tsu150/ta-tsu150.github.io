<script setup lang="ts">
const { theme, isDark, toggle } = useTheme()

/*
 * Round dots and four-pointed stars, mixed the way the reference does.
 *
 * Spread across the whole strip left of the thumb (which occupies 55%–93% of
 * the track when dark) rather than bunched at one end, and kept clear of it so
 * none is ever half-covered by the moon.
 */
const STARS = [
  { top: '12%', left: '15%', size: 8, star: true, delay: 260 },
  { top: '14%', left: '38%', size: 3, star: false, delay: 300 },
  { top: '36%', left: '47%', size: 3, star: false, delay: 320 },
  { top: '56%', left: '27%', size: 6, star: true, delay: 340 },
  { top: '76%', left: '13%', size: 3, star: false, delay: 380 },
] as const
</script>

<template>
  <button
    type="button"
    role="switch"
    class="theme-toggle"
    :aria-checked="isDark"
    :aria-label="theme === 'dark' ? 'ライトテーマに切り替える' : 'ダークテーマに切り替える'"
    @click="toggle"
  >
    <span class="track">
      <span class="cloud cloud-a" />
      <span class="cloud cloud-b" />

      <span
        v-for="(s, i) in STARS"
        :key="i"
        class="star"
        :class="{ 'is-pointed': s.star }"
        :style="{
          top: s.top,
          left: s.left,
          width: `${s.size}px`,
          height: `${s.size}px`,
          '--star-delay': `${s.delay}ms`,
        }"
      />

      <span class="thumb">
        <span class="moon" />
      </span>
    </span>
  </button>
</template>

<style scoped>
/*
 * Timings and the overshoot come from measuring the reference animation frame by
 * frame: the thumb travels for ~280ms, overshoots its target by ~9% around
 * 400ms, and settles by ~560ms. `cubic-bezier(0.34, 1.56, 0.64, 1)` reproduces
 * that overshoot.
 *
 * State is read from `data-theme` on <html> rather than a Vue class, so the
 * prerendered markup is theme-agnostic and the inline resolver puts the toggle
 * in the right position before first paint — no flip on hydration, and no
 * transition on load because the attribute is already set when these elements
 * first exist.
 */
.theme-toggle {
  --track-w: 58px;
  --track-h: 30px;
  --thumb: 22px;
  --inset: 4px;
  --slide: cubic-bezier(0.34, 1.56, 0.64, 1);

  display: inline-flex;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

/*
 * The track reads as a groove pressed into the page: a shadow cast inwards from
 * the top edge, a hairline catching light along the bottom, and a small drop
 * shadow so the whole control still sits above the surface.
 */
.track {
  position: relative;
  display: block;
  width: var(--track-w);
  height: var(--track-h);
  border-radius: 999px;
  /* Dark is the base state, matching the CSS theme fallback. */
  background: var(--toggle-night);
  box-shadow:
    inset 0 2px 5px rgba(0, 0, 0, 0.55),
    inset 0 -1px 0 rgba(255, 255, 255, 0.07),
    0 1px 2px rgba(0, 0, 0, 0.3);
  transition: background var(--theme-fade) ease, box-shadow var(--theme-fade) ease;
}

:root[data-theme='light'] .track {
  background: var(--toggle-day);
  box-shadow:
    inset 0 2px 5px rgba(30, 60, 120, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.45),
    0 1px 2px rgba(30, 60, 120, 0.18);
}

.theme-toggle:hover .track {
  filter: brightness(1.06);
}

.theme-toggle:active .track {
  transform: scale(0.97);
}

/* ===== Thumb ===== */

/*
 * A white disc with a circular bite subtracted by a two-layer mask, so the bite
 * is a real cut-out: nothing is painted there. Covering it with an opaque circle
 * instead makes the element's painted area the *whole* disc, and `drop-shadow`
 * then traces that whole circle — drawing a visible rim around the part of the
 * moon that is supposed to be absent.
 *
 * The bite leaves by sliding further left, not by shrinking. Shrinking pulls it
 * towards its own centre, which sits inside the disc, so partway through it
 * detaches from the rim and reads as a dark spot on the sun. Sliding keeps it
 * anchored outside the left edge, so the shape stays a clean crescent-to-gibbous
 * and the outer edge is a complete circle at every frame — which is what the
 * reference animation does.
 */
/*
 * Two nested elements so each can own one effect:
 *
 *   .thumb  positions, slides, and casts the shadow
 *   .moon   is the white disc with the bite masked out of it
 *
 * The shadow has to live on the parent. `filter` is applied before `mask`, so a
 * shadow on the masked element itself would be cut away along with the bite;
 * from the parent it is computed over the already-masked child and so traces the
 * crescent's real silhouette.
 */
.thumb {
  position: absolute;
  top: var(--inset);
  left: var(--inset);
  width: var(--thumb);
  height: var(--thumb);
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));
  transform: translateX(calc(var(--track-w) - var(--thumb) - var(--inset) * 2));
  transition:
    transform 480ms var(--slide),
    filter var(--theme-fade) ease;
}

:root[data-theme='light'] .thumb {
  filter: drop-shadow(0 2px 3px rgba(30, 60, 120, 0.35));
  transform: translateX(0);
}

/*
 * The bite is cut out, not covered over.
 *
 * Painting an opaque circle of the track colour on top looks identical when
 * still, but `border-radius` clipping and the cover's own antialiasing multiply
 * at the rim, letting a hairline of the white disc underneath show through — a
 * faint ring completing the circle where the moon should simply be absent.
 *
 * The hole is described inside the gradient and moved by animating
 * `--moon-bite-x`, rather than by shifting the mask layer. Moving the layer more
 * than one diameter makes the bite reappear from the opposite edge, as though it
 * were tiling, even with `mask-repeat: no-repeat` in force.
 */
.moon {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--toggle-thumb);
  --moon-bite-x: calc(var(--thumb) * 0.14);
  mask-image: radial-gradient(
    circle calc(var(--thumb) / 2) at var(--moon-bite-x) calc(var(--thumb) * 0.38),
    transparent 99%,
    #000 100%
  );
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  transition: --moon-bite-x 260ms ease 40ms;
}

/* Far enough left that the hole has cleared the disc entirely. */
:root[data-theme='light'] .moon {
  --moon-bite-x: calc(var(--thumb) * -0.6);
}

/* ===== Stars: dark only, scattering outwards from the moon ===== */
.star {
  position: absolute;
  border-radius: 50%;
  background: var(--toggle-thumb);
  opacity: 1;
  transform: none;
  transition:
    opacity 200ms ease var(--star-delay),
    transform 260ms var(--slide) var(--star-delay);
}

.star.is-pointed {
  border-radius: 0;
  /*
   * Four-pointed star. The inner vertices sit at ~21% of the radius rather than
   * the ~14% a naive polygon gives — below about 0.4 of the outer radius the
   * spikes thin out and the shape reads as a plus sign, not a star.
   */
  clip-path: polygon(
    50% 0%, 65% 35%, 100% 50%, 65% 65%,
    50% 100%, 35% 65%, 0% 50%, 35% 35%
  );
}

/*
 * In light mode they collapse towards the thumb's resting place on the left, so
 * that switching to dark reads as the stars scattering outwards.
 */
:root[data-theme='light'] .star {
  opacity: 0;
  transform: translate(-5px, 2px) scale(0.2);
  transition:
    opacity 120ms ease,
    transform 160ms ease;
}

/* ===== Clouds: light only ===== */
.cloud {
  position: absolute;
  border-radius: 50%;
  background: var(--toggle-cloud);
  opacity: 0;
  transform: scale(0.3);
  transition: opacity 140ms ease, transform 200ms ease;
}

.cloud-a {
  top: 20%;
  right: 13%;
  width: 7px;
  height: 7px;
}

.cloud-b {
  top: 52%;
  right: 34%;
  width: 3px;
  height: 3px;
}

:root[data-theme='light'] .cloud {
  opacity: 1;
  transform: none;
  transition: opacity 200ms ease 200ms, transform 260ms var(--slide) 200ms;
}

@media (prefers-reduced-motion: reduce) {
  .thumb,
  .moon,
  .star,
  .cloud,
  .track {
    transition: none;
  }
}
</style>
