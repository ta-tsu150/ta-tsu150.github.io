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

      Personal first, then technical, then the way out: About (who) → Approach
      (how he works) → Timeline (how he got here) → Skills (what he can do) →
      Works (the evidence) → Contact (what to do about it). Keep `SECTION_IDS`
      and `navGroups` in `data/profile.ts` in the same order.
    -->
    <HeroSection />
    <AboutSection />
    <ApproachSection />
    <TimelineSection />
    <SkillsSection />
    <WorksSection />
    <ContactSection />
  </div>
</template>
