<script setup lang="ts">
import { profile } from '~/data/profile'

const { selected, toggle } = useSkillFilter()
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
      <p class="skill-tags-hint">
        クリックすると、そのスキルを使った Works を強調表示します。
      </p>
      <ul class="skill-tags">
        <li v-for="tag in profile.skillTags" :key="tag.label">
          <button
            v-if="tag.works.length > 0"
            type="button"
            class="skill-tag is-linked"
            :class="{ 'is-selected': selected === tag.label }"
            :aria-pressed="selected === tag.label"
            @click="toggle(tag.label)"
          >
            {{ tag.label }}
            <span class="skill-tag-count">{{ tag.works.length }}</span>
          </button>
          <span v-else class="skill-tag">{{ tag.label }}</span>
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
  color: var(--on-accent);
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

.skill-tags-hint {
  margin-bottom: 16px;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font: inherit;
  font-size: 0.8rem;
  padding: 6px 16px;
  border-radius: 999px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-soft-border);
  color: var(--text);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

/* Chips with no backing Works entry stay as plain, non-interactive text. */
.skill-tag.is-linked {
  cursor: pointer;
}

.skill-tag.is-linked:hover {
  background: var(--accent-soft-strong);
  border-color: var(--accent);
  transform: translateY(-2px);
}

.skill-tag.is-selected {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
}

.skill-tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.15em;
  height: 1.15em;
  padding: 0 0.25em;
  border-radius: 999px;
  background: var(--accent-soft-strong);
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
}

.skill-tag.is-selected .skill-tag-count {
  background: var(--on-accent-veil);
  color: var(--on-accent);
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
