<script setup lang="ts">
import { profile } from '~/data/profile'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ENDPOINT = `https://formspree.io/f/${profile.contact.formId}`

const status = ref<Status>('idle')

const MESSAGES: Record<Status, string> = {
  idle: '',
  sending: '送信しています…',
  sent: '送信しました。ありがとうございます。',
  error: '送信に失敗しました。時間をおいてもう一度お試しください。',
}

/**
 * Clears a finished message once the visitor starts a new one.
 *
 * Without this, "送信しました" stays on screen while they type the next
 * enquiry, so the form claims to have sent something it has not.
 */
function onInput(): void {
  if (status.value === 'sent' || status.value === 'error') status.value = 'idle'
}

/**
 * Progressive enhancement, not a replacement.
 *
 * Without this the form is an ordinary POST: it still reaches Formspree and
 * the visitor lands on its confirmation page. This runs only once Vue has
 * hydrated, and then keeps them here instead — hence `preventDefault` inside
 * the handler rather than a `.prevent` modifier that would also apply before
 * the listener has any behaviour to offer.
 */
async function send(event: Event): Promise<void> {
  event.preventDefault()
  if (status.value === 'sending') return

  const form = event.target as HTMLFormElement
  status.value = 'sending'

  try {
    // `Accept: application/json` is what makes Formspree answer with a body
    // instead of a redirect to its own page.
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
    status.value = response.ok ? 'sent' : 'error'
    if (response.ok) form.reset()
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <SectionHeading id="contact-title" title="Contact" />

    <GlassCard class="contact-card">
      <p class="contact-lead">{{ profile.contact.lead }}</p>

      <form
        class="contact-form"
        :action="ENDPOINT"
        method="post"
        @submit="send"
        @input="onInput"
      >
        <!--
          The bait. Only a bot fills a field it cannot see, and Formspree drops
          anything that arrives with `_gotcha` set. Hidden from assistive
          technology too, so nobody is ever asked to fill it in.
        -->
        <input
          class="contact-trap"
          type="text"
          name="_gotcha"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
        >

        <label class="contact-field">
          <span>お名前</span>
          <input type="text" name="name" autocomplete="name" required>
        </label>

        <label class="contact-field">
          <span>メールアドレス</span>
          <input type="email" name="email" autocomplete="email" required>
        </label>

        <label class="contact-field">
          <span>お問い合わせ内容</span>
          <textarea name="message" rows="6" required />
        </label>

        <div class="contact-actions">
          <button type="submit" class="btn btn-primary" :disabled="status === 'sending'">
            送信する
          </button>
          <!--
            `aria-live` on an element that is always present: announcing a
            region that is itself inserted by the same update is unreliable.
          -->
          <p class="contact-status" :class="status" role="status" aria-live="polite">
            {{ MESSAGES[status] }}
          </p>
        </div>
      </form>
    </GlassCard>
  </section>
</template>

<style scoped>
/*
 * No `content-visibility` here, unlike the three long sections above. This one
 * is a few hundred pixels tall, so skipping its layout would save nothing
 * measurable while adding another intrinsic size that has to be re-measured
 * every time the copy changes.
 */
.contact-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact-lead {
  color: var(--text-muted);
  line-height: 1.9;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Visually gone and out of the tab order, but still submitted when filled. */
.contact-trap {
  display: none;
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-field > span {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.contact-field input,
.contact-field textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--text);
  /* Below 16px, iOS Safari zooms the page when a field takes focus. */
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.7;
  transition: border-color 0.2s, background 0.2s;
}

.contact-field textarea {
  resize: vertical;
}

.contact-field input:hover,
.contact-field textarea:hover {
  border-color: var(--text-muted);
}

.contact-field input:focus,
.contact-field textarea:focus {
  border-color: var(--accent);
}

.contact-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.contact-actions button[disabled] {
  opacity: 0.6;
  cursor: progress;
}

.contact-status {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.contact-status.sent {
  color: var(--accent-2);
}

.contact-status.error {
  color: var(--text);
}

@media (prefers-reduced-motion: reduce) {
  .contact-field input,
  .contact-field textarea {
    transition: none;
  }
}
</style>
