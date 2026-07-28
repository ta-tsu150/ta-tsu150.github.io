<script setup lang="ts">
defineProps<{
  /** Referenced by the parent section's `aria-labelledby`. */
  id: string
  title: string
}>()
</script>

<template>
  <h2 :id="id" class="section-title">{{ title }}</h2>
</template>
