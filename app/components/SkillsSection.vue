<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <SectionHeading id="skills-title" title="Skills" />

    <div class="skills-grid">
      <GlassCard v-for="skill in profile.skills" :key="skill.title" class="skill-card">
        <div class="skill-icon" aria-hidden="true">
          <Icon :name="skill.icon" />
        </div>
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.detail }}</p>
      </GlassCard>
    </div>

    <GlassCard class="skill-tags-card">
      <ul class="skill-tags">
        <li v-for="tag in profile.skillTags" :key="tag" class="skill-tag">
          {{ tag }}
        </li>
      </ul>
    </GlassCard>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.skill-card {
  text-align: center;
  padding: 32px 20px;
}

.skill-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: var(--bg);
}

.skill-card h3 {
  font-size: 1.05rem;
  margin-bottom: 8px;
}

.skill-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.skill-tags-card {
  margin-top: 20px;
  padding: 24px;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.skill-tag {
  font-size: 0.8rem;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
  color: var(--text);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.skill-tag:hover {
  background: rgba(129, 140, 248, 0.25);
  border-color: var(--accent);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
