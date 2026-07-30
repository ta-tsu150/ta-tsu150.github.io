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
          <span class="meta-item">{{ profile.birthplace }}</span>
          <span class="meta-item">{{ profile.birthday }}</span>
        </div>
      </div>
    </GlassCard>

    <div class="detail-cards">
      <GlassCard v-for="(group, i) in profile.details" :key="i" class="detail-card">
        <div v-for="row in group" :key="row.key" class="detail-row">
          <span class="detail-key">{{ row.key }}</span>
          <span class="detail-val">{{ row.value }}</span>
        </div>
      </GlassCard>
    </div>
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

.detail-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.detail-card {
  padding: 20px 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px 0;
}

.detail-row + .detail-row {
  border-top: 1px solid var(--glass-border);
}

.detail-key {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  flex-shrink: 0;
  margin-right: 16px;
}

.detail-val {
  font-size: 0.9rem;
  text-align: right;
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    text-align: center;
  }

  .about-meta {
    justify-content: center;
  }

  .detail-cards {
    grid-template-columns: 1fr;
  }

  .detail-row {
    flex-direction: column;
    gap: 2px;
  }

  .detail-val {
    text-align: left;
  }
}
</style>
