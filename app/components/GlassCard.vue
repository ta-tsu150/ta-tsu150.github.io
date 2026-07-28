<script setup lang="ts">
/**
 * Frosted panel used throughout the page.
 *
 * Styling lives in `assets/css/main.css` because `useScrollReveal` toggles
 * `.visible` on `.glass-card` globally.
 */
withDefaults(
  defineProps<{
    /** Element or component to render as. */
    as?: string
  }>(),
  { as: 'div' },
)
</script>

<template>
  <component :is="as" class="glass-card">
    <slot />
  </component>
</template>
