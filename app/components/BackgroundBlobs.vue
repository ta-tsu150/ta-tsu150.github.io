<script setup lang="ts">
/** Purely decorative animated gradient blobs behind the page content. */
const blobs = ref<HTMLElement | null>(null)

usePointerParallax(blobs)
</script>

<template>
  <div ref="blobs" class="blobs" aria-hidden="true">
    <div class="bg-blob blob-1" />
    <div class="bg-blob blob-2" />
    <div class="bg-blob blob-3" />
  </div>
</template>

<style scoped>
/*
 * `--pointer-x` / `--pointer-y` are written by `usePointerParallax`, and are
 * zero until it runs — on a touch screen, with reduced motion asked for, or
 * with no JavaScript at all, nothing below changes anything.
 *
 * The offset goes on `translate` rather than into `transform`, because the
 * keyframes below own `transform` outright. The two are separate properties
 * and compose: `translate` is applied first, then `transform`, so the drift
 * keeps running underneath while this leans the whole thing towards the
 * pointer. Folding both into one property would mean rewriting every keyframe
 * to carry a variable, and the pointer offset would then be scaled by whatever
 * the keyframe's `scale()` happened to be at that moment.
 *
 * `--depth` makes the three move by different amounts, which is what reads as
 * depth rather than as the background sliding in one piece. The largest blob
 * moves most.
 *
 * The easing back is a CSS transition, so there is no frame loop here: the
 * composable writes a target and the compositor interpolates. 600ms is long
 * enough that the blobs lag well behind the cursor, which is the difference
 * between a background that leans and one that follows.
 */
.bg-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: var(--blob-opacity);
  z-index: 0;
  pointer-events: none;

  --depth: 1;
  translate:
    calc(var(--pointer-x, 0px) * var(--depth))
    calc(var(--pointer-y, 0px) * var(--depth));
  transition: translate 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .bg-blob {
    transition: none;
  }
}

/*
 * These were already drifting before — 80px over 10 seconds, about 8px/s — and
 * still read as a still image. Under a 120px blur there is no edge to judge
 * movement against, so slow motion has to be *steady* to register at all, and
 * the old version was the opposite of steady: `ease-in-out` across a
 * there-and-back path spends most of its time near the two endpoints, so the
 * blobs sat almost motionless for the bulk of every cycle.
 *
 * Three changes, none of which make it faster in a way that would distract:
 *
 *   - a closed loop rather than a there-and-back, so nothing ever comes to rest
 *   - `linear`, so the speed is the same at every moment instead of stalling
 *   - a longer path: 15-19px/s, roughly double, still slower than a slow scroll
 *
 * The four-point paths are polygons, so the direction changes at each corner.
 * At this blur radius that is not visible — there is no edge to see a kink in.
 *
 * 26s / 31s / 37s share no factor beyond the 2 in 26, so the three cycles only
 * realign after about 8 hours. Nothing on screen repeats on a noticeable period.
 *
 * Cost: measured at 3x device pixels against a no-animation baseline, and also
 * with translate and scale separated to see which one pays for the blur. No
 * variant was distinguishable from the baseline or from each other — the blurred
 * texture is rasterised once and the compositor moves it. That was on software
 * rasterisation though, so it is evidence the work is compositor-side, not a
 * promise about any particular GPU.
 */
.blob-1 {
  --depth: 1;
  width: 500px;
  height: 500px;
  background: var(--accent);
  top: -100px;
  right: -100px;
  animation: float-1 26s linear infinite;
}

.blob-2 {
  --depth: 0.66;
  width: 400px;
  height: 400px;
  background: var(--accent-3);
  bottom: 10%;
  left: -80px;
  animation: float-2 31s linear infinite;
}

.blob-3 {
  --depth: 0.42;
  width: 350px;
  height: 350px;
  background: var(--accent-2);
  top: 50%;
  right: 20%;
  animation: float-3 37s linear infinite;
}

/*
 * Every path swings the blob further into the viewport than its resting place,
 * never further out — so no corner is ever left unlit at any point in the cycle.
 *
 * The scale factors are deliberately out of step with each other: two grow, one
 * shrinks, so the three never swell together and the overall brightness stays
 * roughly level.
 */
@keyframes float-1 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-110px, 70px) scale(1.08);
  }
  50% {
    transform: translate(-160px, 160px) scale(1.12);
  }
  75% {
    transform: translate(-50px, 120px) scale(1.04);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(110px, -80px) scale(1.06);
  }
  50% {
    transform: translate(180px, -150px) scale(1.14);
  }
  75% {
    transform: translate(70px, -170px) scale(1.08);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

@keyframes float-3 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-120px, 90px) scale(0.94);
  }
  50% {
    transform: translate(-190px, -30px) scale(0.9);
  }
  75% {
    transform: translate(-60px, -110px) scale(0.96);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style>
