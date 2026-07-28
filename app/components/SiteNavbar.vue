<script setup lang="ts">
import { profile, SECTION_IDS } from '~/data/profile'

const activeId = useActiveSection(SECTION_IDS)
const isDrawerOpen = ref(false)
</script>

<template>
  <nav class="navbar glass">
    <button
      type="button"
      class="nav-toggle"
      :aria-expanded="isDrawerOpen"
      aria-controls="nav-drawer"
      :aria-label="isDrawerOpen ? 'メニューを閉じる' : 'メニューを開く'"
      @click="isDrawerOpen = !isDrawerOpen"
    >
      <Icon name="lucide:menu" />
    </button>

    <a href="#hero" class="nav-brand">{{ profile.handle }}</a>
  </nav>

  <NavDrawer v-model="isDrawerOpen" :active-id="activeId" />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--glass-border);
}

.nav-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.nav-toggle:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.nav-brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
  text-decoration: none;
}
</style>
