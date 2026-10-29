<script setup lang="ts">
import { profile } from '~/data/profile'

/** Rendered diameter in CSS pixels; `densities` covers HiDPI on top of this. */
const AVATAR_SIZE = 150
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <SectionHeading id="about-title" title="About" />

    <GlassCard class="about-card">
      <!--
        A column of its own rather than a portrait floating beside the text.
        Against a block this tall the old 120px avatar sat alone above several
        hundred pixels of empty column; giving it the name and the role turns
        that space into the identification the section is supposed to carry.
      -->
      <div class="about-aside">
        <NuxtImg
          :src="profile.avatar"
          :width="AVATAR_SIZE"
          :height="AVATAR_SIZE"
          densities="x1 x2"
          fit="cover"
          format="webp"
          loading="lazy"
          alt="プロフィール写真"
          class="avatar"
        />
        <div class="about-id">
          <h3 class="about-name">{{ profile.nameJa }}</h3>
          <p class="about-name-en">{{ profile.name }}</p>
          <p class="about-role">{{ profile.role }}<br>{{ profile.tagline }}</p>
        </div>
      </div>

      <div class="about-body">
        <p class="about-lead">{{ profile.about.lead }}</p>

        <dl class="about-points">
          <template v-for="point in profile.about.points" :key="point.title">
            <dt>{{ point.title }}</dt>
            <dd>{{ point.body }}</dd>
          </template>
        </dl>

        <p class="about-close">{{ profile.about.closing }}</p>
      </div>
    </GlassCard>
  </section>
</template>

<style scoped>
/*
 * Two columns with a rule between them, and the narrow measure the left one
 * leaves is the point of it rather than a side effect. The card is 856px of
 * content at its widest, and prose set that wide runs to about 53 Japanese
 * characters a line — past where the eye reliably finds the start of the next
 * one. The aside takes 292px of that, which brings the text to roughly 35.
 */
.about-card {
  display: flex;
  align-items: flex-start;
}

/* ===== Identification ===== */
.about-aside {
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-right: 36px;
  margin-right: 36px;
  border-right: 1px solid var(--glass-border);
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: 18px;
  /* Gradient ring picks up the accent colours the placeholder used to carry. */
  border: 2px solid transparent;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    linear-gradient(135deg, var(--accent), var(--accent-2)) border-box;
  box-shadow: var(--shadow-float);
}

.about-name {
  font-size: 1.25rem;
  line-height: 1.4;
}

.about-name-en {
  margin-top: 2px;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

.about-role {
  margin-top: 14px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.9;
  color: var(--accent);
}

/* ===== Prose ===== */
.about-body {
  flex: 1;
  /* Without this a flex item refuses to shrink below its content's width. */
  min-width: 0;
}

.about-body p {
  color: var(--text-muted);
  /*
   * Looser than the 1.75 the cards elsewhere use. This is the only block of
   * sustained reading on the page, and mixed kana and kanji need the room.
   */
  line-height: 2;
}

.about-lead {
  margin-bottom: 26px;
}

/*
 * The accent dot and the weight step are the Works topics' vocabulary, reused
 * deliberately: the points here and the topics down there are the same kind of
 * thing — a claim with its evidence — and reading as the same kind of thing is
 * what connects the two sections.
 */
.about-points dt {
  position: relative;
  padding-left: 16px;
  margin-top: 24px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.about-points dt::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.about-points dd {
  margin: 8px 0 0 16px;
  color: var(--text-muted);
  line-height: 2;
}

.about-close {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--glass-border);
}

@media (max-width: 768px) {
  .about-card {
    flex-direction: column;
    align-items: stretch;
  }

  /*
   * The aside turns on its side rather than simply stacking. Kept as a centred
   * column it ran to about 380px before a word of the text appeared, which on
   * a phone is most of a screen spent on a photograph the reader has already
   * seen in the share card. As a row it takes a third of that.
   *
   * The rule turns through ninety degrees along with the layout.
   */
  .about-aside {
    flex: none;
    flex-direction: row;
    align-items: center;
    gap: 18px;
    text-align: left;
    padding: 0 0 22px;
    margin: 0 0 22px;
    border-right: 0;
    border-bottom: 1px solid var(--glass-border);
  }

  .avatar {
    width: 96px;
    height: 96px;
    margin-bottom: 0;
  }

  .about-role {
    margin-top: 10px;
  }
}
</style>
