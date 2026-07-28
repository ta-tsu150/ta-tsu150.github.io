<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="hero" class="hero" aria-labelledby="hero-name">
    <div class="hero-content">
      <p class="hero-label">{{ profile.role }}</p>
      <h1 id="hero-name" class="hero-name">{{ profile.name }}</h1>
      <p class="hero-sub">{{ profile.tagline }}</p>

      <GlassCard class="hero-info">
        <div v-for="row in profile.heroInfo" :key="row.key" class="hero-info-row">
          <span class="hero-info-key">{{ row.key }}</span>
          <span class="hero-info-val">{{ row.value }}</span>
        </div>
      </GlassCard>

      <div class="hero-actions">
        <a href="#about" class="btn btn-primary">About Me</a>
        <a
          :href="profile.githubUrl"
          class="btn btn-outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="lucide:github" />
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
}

.hero-label {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
  padding: 6px 16px;
  border: 1px solid var(--accent-glow);
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.08);
}

.hero-name {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 16px;
  background: linear-gradient(
    135deg,
    var(--text) 0%,
    var(--accent) 50%,
    var(--accent-2) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-sub {
  font-size: 1.15rem;
  color: var(--text-muted);
  margin: 0 auto 40px;
  max-width: 500px;
}

.hero-info {
  text-align: left;
  max-width: 560px;
  margin: 0 auto 32px;
  padding: 20px 24px;
}

.hero-info-row {
  display: flex;
  gap: 12px;
  padding: 6px 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.hero-info-key {
  color: var(--accent);
  font-weight: 600;
  flex-shrink: 0;
  min-width: 72px;
}

.hero-info-key::after {
  content: ':';
}

.hero-info-val {
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

@media (max-width: 768px) {
  .hero-info-row {
    flex-direction: column;
    gap: 2px;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
