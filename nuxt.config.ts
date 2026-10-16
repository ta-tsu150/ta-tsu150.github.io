// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-28',
  devtools: { enabled: true },

  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/eslint'],

  // Nuxt only auto-imports the top level of `composables/` by default; this
  // opts in the subdirectories, currently just `accessibility/`.
  imports: {
    dirs: ['composables/**'],
  },

  // GitHub Pages is a static host: prerender everything at build time.
  // The `github_pages` preset also emits `.nojekyll` (so `_nuxt/` is served)
  // and a SPA-style `404.html`.
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  hooks: {
    /*
     * Drop the `modulepreload` and `prefetch` hints Nuxt emits for the client
     * chunks.
     *
     * They are a win on a fast connection and a loss on a slow one. The page is
     * prerendered and its styles are inlined, so the first paint needs the
     * document and nothing else — but `modulepreload` is a high-priority
     * fetch, so nine JS chunks were pulled down in parallel with it and, on a
     * link with roughly 50 KB/s of real throughput, took the bandwidth the
     * document needed. Without the hints the same chunks still load, just
     * behind the thing that unblocks rendering.
     */
    'build:manifest': (manifest) => {
      for (const entry of Object.values(manifest)) {
        entry.preload = false
        entry.prefetch = false
        entry.dynamicImports = []
      }
    },
  },

  // Bundle only the icons actually referenced in source, so the built site
  // never calls the Iconify API at runtime.
  icon: {
    mode: 'svg',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },

  // On a static build this resolves to the `ipxStatic` provider: every variant
  // referenced by a prerendered page is generated at build time and written
  // into .output/public, so no image service is needed at runtime.
  image: {
    /*
     * 90, not 100. The avatar is the only image here, served at 100 and 200 CSS
     * pixels, and dropping from 100 halves the 200px variant — 18.6KB to 9.9KB
     * — for a difference measured at 1.67/255 on average and 41dB PSNR, past
     * the point anything shows at that size.
     */
    quality: 90,
    format: ['webp', 'jpg'],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  app: {
    // User Pages (`ta-tsu150.github.io`) is served from the domain root,
    // so no baseURL is needed.
    head: {
      htmlAttrs: { lang: 'ja' },
      title: 'ta-tsu150 | Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '市野 達也 / Tatsuya Ichino のポートフォリオ。Cloud Infrastructure / DevOps / Platform Engineering。',
        },
        /*
         * The default. `useTheme` re-declares this through `useHead` and the
         * head system dedupes on the name, so on the site itself the reactive
         * one wins and follows the theme. This static entry is what the error
         * page gets: it replaces `app.vue` rather than rendering inside it, so
         * no component that calls `useTheme` runs there, and without this the
         * page shipped no `theme-color` at all.
         */
        { name: 'theme-color', content: '#0a0a1a' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'ta-tsu150 | Portfolio' },
        { property: 'og:url', content: 'https://ta-tsu150.github.io/' },
        {
          property: 'og:description',
          content: 'Full-Stack Engineer (Frontend / Backend / Infra)',
        },
      ],
      /*
       * Generated from `app/assets/favicon-source.png` — see that file's note.
       * The mark is near-white over transparency, so it ships on the dark tile
       * rather than bare: measured against a white tab bar, two thirds of its
       * pixels sat below 1.5:1. On the tile it is 10.7:1 whatever the browser
       * chrome is doing.
       *
       * `.ico` first for browsers that only look for one, a 32px PNG for the
       * tab, 192px for Android's fallback when there is no manifest, and a
       * full-bleed square for iOS, which applies its own rounded mask.
       */
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      script: [
        {
          // Runs before first paint so scroll-reveal targets start hidden with
          // no flash of content. Deliberately NOT in the CSS: if JavaScript is
          // unavailable this never runs, and the prerendered page renders in
          // full instead of a blank `opacity: 0` screen.
          //
          // The timer covers the failure that fallback misses: JavaScript runs,
          // so the class goes on, but the app bundle never arrives or never
          // mounts — an extension or proxy blocking it, or simply a bad
          // connection. `useScrollReveal` sets `data-reveal-ready` once it has
          // taken over; without that by 4s the hidden state is dropped and the
          // page shows in full. Four seconds because the bundle lands in two to
          // three even on the ~50 KB/s link the other comments here measure
          // against, and overshooting only costs the animation, never content.
          innerHTML:
            "document.documentElement.classList.add('reveal-enabled');"
            + 'setTimeout(function(){var d=document.documentElement;'
            + "if(!d.hasAttribute('data-reveal-ready'))"
            + "d.classList.remove('reveal-enabled')},4000)",
          tagPosition: 'head',
        },
        {
          /*
           * Resolves the theme before the first paint. The prerendered HTML has
           * no theme baked in, so without this the page would render dark and
           * then snap to light — and the toggle would visibly flip.
           *
           * Keep the storage key in step with `THEME_STORAGE_KEY` in
           * composables/useTheme.ts.
           */
          innerHTML:
            '(function(){try{var k="ta-tsu150:theme",s=localStorage.getItem(k),'
            + 't=s==="light"||s==="dark"?s:'
            + '(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");'
            + 'document.documentElement.dataset.theme=t;}'
            + 'catch(e){document.documentElement.dataset.theme="dark";}})()',
          tagPosition: 'head',
        },
      ],
    },
  },
})