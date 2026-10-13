<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)
const heading = computed(() =>
  isNotFound.value ? 'ページが見つかりません' : 'エラーが発生しました',
)

useHead({ title: () => `${heading.value} | ta-tsu150` })
</script>

<template>
  <!--
    `error.vue` replaces `app.vue` rather than rendering inside it, so there is
    no navbar, no drawer and no theme toggle here — and nothing on this page
    may use `.section-title` or `.glass-card`. Those are scroll-reveal targets
    that start at `opacity: 0`, and the composable that reveals them lives in
    the page component, which does not run here.
  -->
  <div>
    <BackgroundBlobs />
    <main class="error-page">
      <p class="error-code">{{ error.statusCode }}</p>
      <h1 class="error-heading">{{ heading }}</h1>
      <p v-if="isNotFound" class="error-text">
        URL が変わったか、ページが削除された可能性があります。
      </p>
      <a href="/" class="btn btn-primary">トップへ戻る</a>
    </main>
  </div>
</template>

<style scoped>
.error-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
}

.error-code {
  font-size: clamp(3rem, 12vw, 6rem);
  font-weight: 800;
  line-height: 1;
  color: var(--accent);
}

.error-heading {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  font-weight: 700;
}

.error-text {
  color: var(--text-muted);
  margin-bottom: 8px;
}
</style>
