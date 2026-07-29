<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="works" class="section" aria-labelledby="works-title">
    <SectionHeading id="works-title" title="Works" />

    <div class="works-list">
      <WorkCard v-for="entry in profile.works" :key="entry.id" :entry="entry" />
    </div>
  </section>
</template>

<style scoped>
.works-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
