<script setup lang="ts">
/**
 * Three bars that morph into a left arrow.
 *
 * Built from spans rather than an icon font or two swapped SVGs so the shape
 * genuinely tweens — the middle bar becomes the arrow shaft while the outer two
 * shorten and pivot into the head. Swapping icons would cut instead of morph.
 */
defineProps<{ open: boolean }>()
</script>

<template>
  <span class="morph" :class="{ 'is-open': open }" aria-hidden="true">
    <span class="bar bar-top" />
    <span class="bar bar-middle" />
    <span class="bar bar-bottom" />
  </span>
</template>

<style scoped>
.morph {
  --bar-h: 2px;
  /* The cap is a semicircle, so its centre sits this far in from the bar's end. */
  --cap: calc(var(--bar-h) / 2);

  position: relative;
  display: block;
  width: 22px;
  height: 22px;
}

.bar {
  position: absolute;
  left: 0;
  width: 22px;
  height: var(--bar-h);
  border-radius: var(--cap);
  background: currentColor;
  /*
   * The pivot is the cap's centre, not the bar's left edge.
   *
   * Pivoting about the edge does converge the three centre lines on one point —
   * that part was never wrong. But the ends are round, so each stroke's
   * semicircular cap is centred somewhere different, and their union comes out
   * as a small two-lobed blob: measured at 8x, the outline reached 0.34px past
   * the shaft at two points either side of centre and pulled back to 0.10px
   * between them. A 0.24px dent exactly where the tip should be a point, which
   * is what read as the strokes not lining up.
   *
   * Pivoting about the cap centre instead maps all three caps onto the same
   * disc, so the tip is precisely one stroke's cap and nothing protrudes.
   */
  transform-origin: var(--cap) 50%;
  transition: width 0.28s ease, transform 0.28s ease;
}

.bar-top {
  top: 4px;
}

.bar-middle {
  top: 10px;
}

.bar-bottom {
  top: 16px;
}

/*
 * Open state: the outer bars drop/rise onto the shaft's left end (y = 11) and
 * splay ±45° to form the head. 6px is the gap from each bar's centre to 11.
 *
 * 11px, not 10: the pivot moved one cap-radius in from the end, so the arm now
 * spends that 1px reaching back to the tip. The stroke from the junction outwards
 * stays the length it was.
 */
.is-open .bar-top {
  width: calc(10px + var(--cap));
  transform: translateY(6px) rotate(-45deg);
}

.is-open .bar-bottom {
  width: calc(10px + var(--cap));
  transform: translateY(-6px) rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .bar {
    transition: none;
  }
}
</style>
