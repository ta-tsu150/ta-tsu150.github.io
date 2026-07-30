// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-28',
  devtools: { enabled: true },

  modules: ['@nuxt/icon', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  // Nuxt only auto-imports the top level of `composables/` by default; this
  // opts in the feature subdirectories (accessibility/, forms/, table/, ...).
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
    quality: 100,
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
        { name: 'theme-color', content: '#0a0a1a' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'ta-tsu150 | Portfolio' },
        { property: 'og:url', content: 'https://ta-tsu150.github.io/' },
        {
          property: 'og:description',
          content: 'Full-Stack Engineer (Frontend / Backend / Infra)',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [
        {
          // Runs before first paint so scroll-reveal targets start hidden with
          // no flash of content. Deliberately NOT in the CSS: if JavaScript is
          // unavailable this never runs, and the prerendered page renders in
          // full instead of a blank `opacity: 0` screen.
          innerHTML: "document.documentElement.classList.add('reveal-enabled')",
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
