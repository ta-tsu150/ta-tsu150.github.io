<script setup lang="ts">
import { profile } from '~/data/profile'

/** Rendered diameter in CSS pixels; `densities` covers HiDPI on top of this. */
const AVATAR_SIZE = 130
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <SectionHeading id="about-title" title="About" />

    <GlassCard class="about-card">
      <NuxtImg
        :src="profile.avatar"
        :width="AVATAR_SIZE"
        :height="AVATAR_SIZE"
        densities="x1 x2"
        fit="cover"
        format="webp"
        loading="lazy"
        alt="プロフィール写真"
        class="avatar"
      />
      <div class="about-body">
        <h3 class="about-name">{{ profile.nameJa }} / {{ profile.name }}</h3>
        <p class="about-role">{{ profile.role }} — {{ profile.tagline }}</p>
        <p class="about-greeting">{{ profile.about }}</p>
      </div>
    </GlassCard>
  </section>
</template>

<style scoped>
/*
 * Back to a portrait beside a short block, now that everything long has moved
 * to the Approach section. A column with a rule down it made sense against
 * several hundred pixels of prose; against a greeting it left the portrait
 * taller than the text it was introducing.
 */
.about-card {
  display: flex;
  gap: 28px;
  align-items: center;
}

.avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  /* Gradient ring picks up the accent colours the placeholder used to carry. */
  border: 2px solid transparent;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    linear-gradient(135deg, var(--accent), var(--accent-2)) border-box;
  box-shadow: var(--shadow-float);
}

.about-body {
  /* Without this a flex item refuses to shrink below its content's width. */
  min-width: 0;
}

.about-name {
  font-size: 1.3rem;
}

.about-role {
  margin-top: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--accent);
}

.about-greeting {
  margin-top: 16px;
  color: var(--text-muted);
  line-height: 1.9;
  /* Line breaks come from `
` in the profile data, not markup. */
  white-space: pre-line;
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    text-align: center;
  }

  /*
   * The name and the role stay centred under the portrait, the greeting does
   * not. Centred body text gives every line a different starting x, so the eye
   * has to hunt for the next one.
   */
  .about-greeting {
    text-align: left;
  }
}
</style>
