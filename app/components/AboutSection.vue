<script setup lang="ts">
import { profile } from '~/data/profile'

const initial = profile.name.charAt(0)
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <SectionHeading id="about-title" title="About" />

    <GlassCard class="about-card">
      <div class="avatar-placeholder" aria-hidden="true">{{ initial }}</div>
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

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--bg);
  flex-shrink: 0;
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
  background: rgba(255, 255, 255, 0.04);
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
