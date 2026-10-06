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

<!--
  The global stylesheet is pulled in here rather than through `css:` in
  nuxt.config so that Nuxt's style inlining picks it up like any other component
  style and writes it into the prerendered HTML.

  As a `css:` entry it was built to a separate file, and that file blocks the
  first paint: on a high-latency link the page stayed blank for an extra round
  trip carrying a few KB. Measured on a throttled mobile profile, inlining it
  moved the first paint from 1612ms to 936ms.
-->
<style>
@import '~/assets/css/main.css';
</style>
