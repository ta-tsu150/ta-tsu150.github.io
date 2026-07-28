<script setup lang="ts">
import { navGroups, profile } from '~/data/profile'

const props = defineProps<{
  /** Id of the section currently in view, for the active highlight. */
  activeId: string
}>()

const isOpen = defineModel<boolean>({ required: true })

const panel = ref<HTMLElement | null>(null)

useFocusTrap(panel, isOpen, { onEscape: close })

function setScrollLock(locked: boolean): void {
  document.body.style.overflow = locked ? 'hidden' : ''
}

function close(): void {
  // Unlock synchronously rather than waiting on the watcher below: a nav link
  // closes the drawer and then relies on the browser's default anchor jump,
  // which a still-locked <body> swallows. `defineModel` round-trips through the
  // parent, so `isOpen` does not change during this call — not even a
  // `flush: 'sync'` watcher would run in time.
  setScrollLock(false)
  isOpen.value = false
}

function isActive(item: { href: string, external?: boolean }): boolean {
  return !item.external && item.href === `#${props.activeId}`
}

watch(isOpen, setScrollLock)

onBeforeUnmount(() => setScrollLock(false))
</script>

<template>
  <Teleport to="body">
    <!--
      The transitioned root (.drawer-root) carries no transition of its own —
      the panel and backdrop animate independently — so Vue cannot sniff a
      duration off it. State it explicitly, matching the 0.28s in the styles.
    -->
    <Transition name="drawer" :duration="280">
      <div v-if="isOpen" class="drawer-root">
        <div class="drawer-backdrop" @click="close" />

        <div
          id="nav-drawer"
          ref="panel"
          class="drawer-panel glass"
          role="dialog"
          aria-modal="true"
          aria-label="ナビゲーション"
        >
          <div class="drawer-head">
            <span class="drawer-brand">{{ profile.handle }}</span>
            <button
              type="button"
              class="drawer-close"
              aria-label="メニューを閉じる"
              @click="close"
            >
              <Icon name="lucide:x" />
            </button>
          </div>

          <nav class="drawer-nav">
            <template v-for="(group, index) in navGroups" :key="index">
              <p v-if="group.label" class="drawer-group-label">{{ group.label }}</p>
              <ul class="drawer-list">
                <li v-for="item in group.items" :key="item.href">
                  <a
                    :href="item.href"
                    class="drawer-link"
                    :class="{ active: isActive(item) }"
                    :target="item.external ? '_blank' : undefined"
                    :rel="item.external ? 'noopener noreferrer' : undefined"
                    :aria-current="isActive(item) ? 'true' : undefined"
                    @click="close"
                  >
                    <span>{{ item.label }}</span>
                    <Icon
                      v-if="item.external"
                      name="lucide:external-link"
                      class="drawer-link-icon"
                      aria-label="(新しいタブで開く)"
                    />
                  </a>
                </li>
              </ul>
              <hr v-if="index < navGroups.length - 1" class="drawer-divider">
            </template>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-root {
  position: fixed;
  inset: 0;
  z-index: 150;
}

.drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 15, 0.6);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

.drawer-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(320px, 85vw);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-right: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  overflow-y: auto;
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 12px;
  border-bottom: 1px solid var(--glass-border);
}

.drawer-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.drawer-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  font-size: 1.15rem;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.drawer-close:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drawer-group-label {
  padding: 12px 12px 4px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.drawer-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  list-style: none;
}

.drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 11px 12px;
  border-radius: 10px;
  color: var(--text-muted);
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}

.drawer-link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.drawer-link.active {
  color: var(--text);
  background: rgba(129, 140, 248, 0.14);
  box-shadow: inset 2px 0 0 var(--accent);
}

.drawer-link-icon {
  width: 0.9em;
  height: 0.9em;
  opacity: 0.7;
}

.drawer-divider {
  margin: 8px 12px;
  border: 0;
  border-top: 1px solid var(--glass-border);
}

/* ===== Transition ===== */
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.28s ease;
}

.drawer-enter-active .drawer-backdrop,
.drawer-leave-active .drawer-backdrop {
  transition: opacity 0.28s ease;
}

.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(-100%);
}

.drawer-enter-from .drawer-backdrop,
.drawer-leave-to .drawer-backdrop {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active .drawer-panel,
  .drawer-leave-active .drawer-panel,
  .drawer-enter-active .drawer-backdrop,
  .drawer-leave-active .drawer-backdrop {
    transition: none;
  }
}
</style>
