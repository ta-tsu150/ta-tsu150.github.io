<script setup lang="ts">
// Keeps `#section` links out of the URL so reloads restore the real scroll
// position instead of jumping to the last section clicked.
useInPageAnchors()
</script>

<template>
  <div>
    <a href="#main" class="skip-link">本文へスキップ</a>
    <BackgroundBlobs />
    <SiteNavbar />
    <main id="main">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
