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

      <PrivateGallery />
    </section>

    <section id="intro" class="section" aria-labelledby="intro-title">
      <SectionHeading id="intro-title" title="Introduction" />
      <PrivateIntro />
    </section>
  </div>
</template>

<style scoped>
/*
 * On the index every section starts below the fold, where the hero has
 * already cleared the navbar. Here the first one is the top of the page and
 * has to clear it itself.
 *
 * The `min-height: 100svh` that used to be here is gone with it: it was
 * holding the window open while this page was a heading and one short card,
 * and the slideshow and the introduction now fill it on their own.
 */
#private {
  padding-top: calc(var(--navbar-height) + 60px);
}

/*
 * The introduction is the same subject as the slideshow above it, so it keeps
 * the heading's own spacing instead of a second full section gap, which would
 * read as a change of subject.
 */
#intro {
  padding-top: 0;
}
</style>
