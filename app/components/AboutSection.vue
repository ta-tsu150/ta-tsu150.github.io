<script setup lang="ts">
import { profile } from '~/data/profile'

/** Rendered diameter in CSS pixels; `densities` covers HiDPI on top of this. */
const AVATAR_SIZE = 120
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
        <h3>{{ profile.nameJa }} / {{ profile.name }}</h3>
        <p v-for="(paragraph, i) in profile.about" :key="i">{{ paragraph }}</p>
      </div>
    </GlassCard>
  </section>
</template>

<style scoped>
/*
 * Two columns, and the narrow measure they leave is the point of them rather
 * than a side effect. The card is 856px of content at its widest, and prose
 * set that wide runs to about 53 Japanese characters a line — past where the
 * eye reliably finds the start of the next one. The portrait and its gap take
 * 152px of that, leaving roughly 44, which is where it should sit.
 *
 * `flex-start`, not the `center` this carried while the body was a single
 * sentence: against several paragraphs a vertically centred portrait floats in
 * the middle of the text with nothing to line up against.
 */
.about-card {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.avatar {
  width: 120px;
  height: 120px;
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

.about-body h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.about-body p {
  color: var(--text-muted);
  /*
   * Looser than the 1.75 the cards elsewhere use. This is the only block of
   * sustained reading on the page, and mixed kana and kanji need the room.
   */
  line-height: 2;
}

.about-body p + p {
  margin-top: 18px;
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /*
   * The name stays centred under the avatar, the paragraphs do not. Centred
   * body text gives every line a different starting x, so the eye has to hunt
   * for the next one.
   */
  .about-body p {
    text-align: left;
  }
}
</style>
