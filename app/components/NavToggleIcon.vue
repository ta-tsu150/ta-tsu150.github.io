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
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
}

.bar {
  position: absolute;
  left: 0;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  /*
   * Pivoting about the left end keeps the arrow tip pinned while the bars
   * rotate, so the head closes onto the shaft instead of drifting.
   */
  transform-origin: 0 50%;
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
 */
.is-open .bar-top {
  width: 10px;
  transform: translateY(6px) rotate(-45deg);
}

.is-open .bar-bottom {
  width: 10px;
  transform: translateY(-6px) rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .bar {
    transition: none;
  }
}
</style>
