<script setup lang="ts">
import { privateGallery } from '~/data/profile'

/**
 * How long each slide holds. One number: the timer counts it and the progress
 * bar draws it, through the `--sweep` custom property set on the root below.
 */
const DURATION_MS = 7000

const slides = privateGallery
const index = ref(0)

/** Wraps in both directions, so the ends join rather than stop. */
function go(to: number): void {
  index.value = (to + slides.length) % slides.length
}

const { paused, hold, release, restart } = useAutoAdvance(
  () => go(index.value + 1),
  DURATION_MS,
)

// Covers both ways a slide changes: the timer stepping, and a visitor using
// the arrows, the bars, the keyboard or a swipe.
watch(index, restart)

const swipe = useSwipe({
  left: () => go(index.value + 1),
  right: () => go(index.value - 1),
})

// Only a keyboard focus holds the slideshow; see `isKeyboardFocus`.
function onFocusIn(event: FocusEvent): void {
  if (isKeyboardFocus(event.target)) hold('focus')
}

function onPointerLeave(): void {
  release('pointer')
  // Tab to an arrow and then click it, and the hold taken for the keyboard is
  // still there with no `focusin` coming to correct it. Reaching for the mouse
  // is the moment it stopped meaning anything.
  if (!isKeyboardFocus(document.activeElement)) release('focus')
}
</script>

<template>
  <div
    class="gallery"
    :class="{ paused }"
    :style="{ '--sweep': `${DURATION_MS}ms` }"
    role="group"
    aria-roledescription="カルーセル"
    aria-label="趣味の写真"
    tabindex="0"
    @keydown.left.prevent="go(index - 1)"
    @keydown.right.prevent="go(index + 1)"
    @pointerenter="hold('pointer')"
    @pointerleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="release('focus')"
    v-on="swipe"
  >
    <div class="stage">
      <div
        v-for="(slide, i) in slides"
        :key="slide.src"
        class="slide"
        :class="{ active: i === index }"
        :inert="i !== index"
      >
        <NuxtImg
          :src="slide.src"
          :alt="slide.alt"
          width="912"
          height="513"
          densities="x1 x2"
          format="webp"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
          draggable="false"
        />
      </div>

      <button class="arrow prev" type="button" aria-label="前の写真" @click="go(index - 1)">
        <Icon name="lucide:chevron-left" />
      </button>
      <button class="arrow next" type="button" aria-label="次の写真" @click="go(index + 1)">
        <Icon name="lucide:chevron-right" />
      </button>
    </div>

    <div class="steps">
      <button
        v-for="(slide, i) in slides"
        :key="slide.src"
        class="step"
        type="button"
        :aria-label="`${slide.label}（${i + 1}枚目）`"
        :aria-current="i === index"
        @click="go(i)"
      >
        <!-- Keyed on `index` so the element is replaced and the fill restarts. -->
        <span v-if="i === index" :key="index" class="fill" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  position: relative;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/*
 * Scroll reveal — see composables/useScrollReveal.ts, which has `.gallery` in
 * its selector list. Without this the slideshow was the one thing on the page
 * already in place while the heading and the card below it were still arriving.
 *
 * Same 30px and the same 0.6s as `.glass-card`, because it sits between two of
 * them and anything else would read as a second, unrelated effect.
 */
.reveal-enabled .gallery:not([data-revealed]) {
  opacity: 0;
  transform: translateY(30px);
}

.gallery:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 6px;
  border-radius: var(--radius);
}

/*
 * The frame. A fixed ratio rather than a height taken from the image, so the
 * page does not resize under the reader when a slide changes — every file is
 * 16:9 already, and `cover` below absorbs anything that is not.
 */
.stage {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lifted);
  background: var(--glass-bg);
  isolation: isolate;
  /* Vertical scrolling stays with the page; horizontal is the swipe. */
  touch-action: pan-y;
}

/* Accent spill behind the frame, taken from the page's own palette. */
.gallery::before {
  content: '';
  position: absolute;
  inset: 8% 4% -6%;
  z-index: -1;
  border-radius: var(--radius);
  background: linear-gradient(120deg, var(--accent), var(--accent-3));
  filter: blur(48px);
  opacity: 0.32;
  pointer-events: none;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 900ms ease;
}

.slide.active {
  opacity: 1;
}

.slide :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}

/*
 * A slow drift across the active slide. The animation arrives with `.active`,
 * so every turn starts from the same place, and `--play` stops it along with
 * everything else.
 */
.slide.active :deep(img) {
  animation: drift 9s ease-out both;
  animation-play-state: var(--play, running);
}

@keyframes drift {
  from {
    scale: 1.06;
    translate: 0 -1%;
  }
  to {
    scale: 1;
    translate: 0 0;
  }
}

.arrow {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
  background: rgba(10, 10, 26, 0.42);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  /*
   * Out of the way until the pointer arrives. `:focus-visible` below brings
   * them back, so tabbing to them still shows what is focused.
   */
  opacity: 0;
  transition: opacity 0.3s, background 0.2s;
}

.prev {
  left: 14px;
}

.next {
  right: 14px;
}

.gallery:hover .arrow,
.arrow:focus-visible {
  opacity: 1;
}

.arrow:hover {
  background: rgba(10, 10, 26, 0.72);
}

/* Nothing to hover with, so they stay. */
@media (hover: none) {
  .arrow {
    opacity: 1;
  }
}

.steps {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.step {
  position: relative;
  flex: 1;
  height: 3px;
  padding: 0;
  border: 0;
  border-radius: 2px;
  background: var(--glass-border);
  cursor: pointer;
  overflow: hidden;
}

.fill {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left;
  background: linear-gradient(90deg, var(--accent), var(--accent-3));
  animation: sweep var(--sweep) linear forwards;
  animation-play-state: var(--play, running);
}

@keyframes sweep {
  from {
    scale: 0 1;
  }
  to {
    scale: 1 1;
  }
}

.gallery.paused {
  --play: paused;
}

@media (max-width: 768px) {
  .arrow {
    width: 38px;
    height: 38px;
  }
}

/*
 * The timer is switched off separately, in `useAutoAdvance`, which reads the
 * same preference. Removing the animation here only stops the bar from
 * sweeping — on its own it would leave the slideshow advancing under a bar
 * that never moved.
 */
@media (prefers-reduced-motion: reduce) {
  .gallery,
  .slide {
    transition: none;
  }

  .slide.active :deep(img),
  .fill {
    animation: none;
  }

  .fill {
    scale: 1 1;
  }
}

/* A stack of absolutely positioned slides would print as one blank frame. */
@media print {
  /* Paper has no scrolling, so nothing would ever reveal it. */
  .reveal-enabled .gallery:not([data-revealed]) {
    opacity: 1 !important;
    transform: none !important;
  }

  .gallery::before,
  .arrow,
  .steps {
    display: none;
  }

  .stage {
    aspect-ratio: auto;
  }

  .slide {
    position: static;
    opacity: 1;
    page-break-inside: avoid;
  }
}
</style>
