<script setup lang="ts">
/*
 * The hidden room. Nothing links here — not the drawer, not the footer, not
 * the index — so it is reached by typing the address and nothing else.
 *
 * Two consequences worth knowing before editing this file:
 *
 *   - `crawlLinks` cannot find a page nothing links to, so `/private` is
 *     listed by hand in `nitro.prerender.routes`. Remove it there and this
 *     page stops being generated at all.
 *   - unlinked is not unlisted. A search engine indexes whatever it is handed,
 *     and a URL travels the moment it is shared, so `noindex` below is what
 *     actually keeps it out of results.
 */
useScrollReveal()

useHead({
  title: 'Private | 市野 達也',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div>
    <section id="private" class="section" aria-labelledby="private-title">
      <SectionHeading id="private-title" title="Private" />

      <GlassCard class="private-card">
        <p>
          仕事とは関係のないものを置く部屋です。まだ何も置いていません。
        </p>
      </GlassCard>
    </section>
  </div>
</template>

<style scoped>
/*
 * The section starts below the fold on the index, where the hero has already
 * cleared the navbar. Here it is the first thing on the page, so it has to
 * clear the navbar itself.
 */
.section {
  padding-top: calc(var(--navbar-height) + 60px);
  min-height: 100vh;
  min-height: 100svh;
}

.private-card p {
  color: var(--text-muted);
  line-height: 2;
}
</style>
