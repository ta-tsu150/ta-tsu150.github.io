<script setup lang="ts">
import { profile } from '~/data/profile'

/** Static so the prerendered HTML stays byte-stable between builds. */
const COPYRIGHT_YEAR = 2025
</script>

<template>
  <footer class="footer glass">
    <p>&copy; {{ COPYRIGHT_YEAR }} {{ profile.handle }}. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 24px;
  margin-top: 40px;
  border-top: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
