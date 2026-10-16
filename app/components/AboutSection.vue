<script setup lang="ts">
import { profile } from '~/data/profile'

/** Rendered diameter in CSS pixels; `densities` covers HiDPI on top of this. */
const AVATAR_SIZE = 100
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
        <p>{{ profile.summary }}</p>
        <div class="about-meta">
          <span class="meta-item">{{ profile.birthday }}</span>
        </div>
      </div>
    </GlassCard>
  </section>
</template>

<style scoped>
.about-card {
  display: flex;
  gap: 32px;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
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
  margin-bottom: 8px;
}

.about-body p {
  color: var(--text-muted);
  margin-bottom: 12px;
}

.about-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 4px 12px;
  border-radius: 6px;
  background: var(--surface-subtle);
  border: 1px solid var(--glass-border);
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    text-align: center;
  }

  .about-meta {
    justify-content: center;
  }
}
</style>
