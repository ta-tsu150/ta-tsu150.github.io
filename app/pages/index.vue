<script setup lang="ts">
// Reveals `.glass-card` / `.timeline-item` / `.section-title` on scroll.
useScrollReveal()
</script>

<template>
  <div>
    <!--
      Wrapped in one element, with this note inside it: a page with several
      roots leaves Nuxt nothing to attach a transition or fall-through
      attributes to, and a comment beside the root counts as another root. The
      wrapper is a plain block and changes no layout — nothing selects these
      sections by depth.

      Personal first, then technical: About (who) → Timeline (how I got here)
      → Skills (what I can do) → Works (the evidence). Keep `SECTION_IDS` and
      `navGroups` in `data/profile.ts` in the same order.
    -->
    <HeroSection />
    <AboutSection />
    <TimelineSection />
    <SkillsSection />
    <WorksSection />
  </div>
</template>
