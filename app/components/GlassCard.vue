<script setup lang="ts">
/**
 * Frosted panel used throughout the page.
 *
 * Styling lives in `assets/css/main.css` because `useScrollReveal` marks
 * `.glass-card` elements revealed globally, via `data-revealed`.
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
