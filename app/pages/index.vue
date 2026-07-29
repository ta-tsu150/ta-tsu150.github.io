<script setup lang="ts">
// Reveals `.glass-card` / `.timeline-item` / `.section-title` on scroll.
useScrollReveal()
</script>

<template>
  <!--
    Personal first, then technical: About (who) → Timeline (how I got here)
    → Skills (what I can do) → Works (the evidence). Keep `SECTION_IDS` and
    `navGroups` in `data/profile.ts` in the same order.
  -->
  <HeroSection />
  <AboutSection />
  <TimelineSection />
  <SkillsSection />
  <WorksSection />
</template>
