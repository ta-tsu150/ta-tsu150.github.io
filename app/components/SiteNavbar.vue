<script setup lang="ts">
import { profile, SECTION_IDS } from '~/data/profile'

const activeId = useActiveSection(SECTION_IDS)
const isDrawerOpen = ref(false)

/**
 * Handed to the drawer so its focus trap can treat this button as part of the
 * dialog loop — it doubles as the close control and lives outside the panel.
 */
const toggle = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <nav class="navbar glass">
    <button
      ref="toggle"
      type="button"
      class="nav-toggle"
      :aria-expanded="isDrawerOpen"
      aria-controls="nav-drawer"
      :aria-label="isDrawerOpen ? 'メニューを閉じる' : 'メニューを開く'"
      @click="isDrawerOpen = !isDrawerOpen"
    >
      <NavToggleIcon :open="isDrawerOpen" />
    </button>

    <a href="#hero" class="nav-brand">{{ profile.handle }}</a>
  </nav>

  <NavDrawer v-model="isDrawerOpen" :active-id="activeId" :toggle-el="toggle" />
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /*
   * Above the drawer (150) on purpose: the toggle morphs into the drawer's back
   * control, so it has to stay visible and clickable while the panel is open.
   * The panel slides out from underneath — see NavDrawer's `top`.
   */
  z-index: 200;
  height: var(--navbar-height);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--glass-border);
  box-sizing: border-box;
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
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.nav-toggle[aria-expanded='true'] {
  color: var(--text);
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
