<script setup lang="ts">
/** Purely decorative animated gradient blobs behind the page content. */
</script>

<template>
  <div class="blobs" aria-hidden="true">
    <div class="bg-blob blob-1" />
    <div class="bg-blob blob-2" />
    <div class="bg-blob blob-3" />
  </div>
</template>

<style scoped>
.bg-blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
}

.blob-1 {
  width: 500px;
  height: 500px;
  background: var(--accent);
  top: -100px;
  right: -100px;
  animation: float-1 20s ease-in-out infinite;
}

.blob-2 {
  width: 400px;
  height: 400px;
  background: var(--accent-3);
  bottom: 10%;
  left: -80px;
  animation: float-2 25s ease-in-out infinite;
}

.blob-3 {
  width: 350px;
  height: 350px;
  background: var(--accent-2);
  top: 50%;
  right: 20%;
  animation: float-3 22s ease-in-out infinite;
}

@keyframes float-1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-80px, 60px) scale(1.1);
  }
}

@keyframes float-2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(60px, -40px) scale(1.15);
  }
}

@keyframes float-3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}
</style>
