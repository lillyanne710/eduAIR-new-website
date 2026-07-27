<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/contact-hero.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('contact.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('contact.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('contact.heroBody') }}
        </p>
      </div>
    </section>

    <!-- CONTACT INFO + FORM -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <p class="font-mono text-lg font-semibold text-plum">{{ $t('contact.infoEyebrow') }}</p>

      <div class="mt-8 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <!-- Left: contact info -->
        <div>
          <ul class="space-y-6">
            <li class="flex items-start gap-3">
              <span class="mt-1 text-plum"></span>
              <div>
                <p class="font-display text-sm font-semibold text-ink">{{ $t('contact.phoneLabel') }}</p>
                <a href="tel:+85264373924" class="font-body text-sm text-ink/65 hover:text-plum">
                  +852 6437 3924
                </a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-plum"></span>
              <div>
                <p class="font-display text-sm font-semibold text-ink">{{ $t('contact.whatsappLabel') }}</p>
                <a
                  href="https://wa.me/message/6UXEU7SCWSVSE1"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-body text-sm text-ink/65 hover:text-plum"
                >
                  {{ $t('contact.whatsappCta') }}
                </a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-plum"></span>
              <div>
                <p class="font-display text-sm font-semibold text-ink">{{ $t('contact.officeLabel') }}</p>
                <p class="font-body text-sm text-ink/65">Room 237, 2/F, Building 16W,<br />Hong Kong Science Park</p>
              </div>
            </li>
          </ul>

          <div class="mt-8 rounded-2xl bg-plum-soft/40 p-6">
            <p class="font-display text-sm font-semibold text-ink">{{ $t('contact.noteTitle') }}</p>
            <p class="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{{ $t('contact.noteBody') }}</p>
          </div>
        </div>

        <!-- Right: real form, wired to EmailJS -->
        <div>
          <div v-if="isSuccess" class="mb-4 rounded-xl bg-green-50 p-4 font-body text-sm text-green-800">
            {{ $t('contact.sentMessage') }}
          </div>
          <div v-if="isError" class="mb-4 rounded-xl bg-red-50 p-4 font-body text-sm text-red-800">
            {{ $t('contact.errorMessage') }}
          </div>

          <form id="contactform" ref="contactform" @submit.prevent="sendForm">
            <label class="font-body text-sm font-semibold text-ink ">{{ $t('contact.formHelp') }}</label>
            <div class="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                v-for="r in reasons"
                :key="r"
                type="button"
                @click="reason = r"
                :class="[
                  'rounded-sm border px-3.5 py-2.5 text-left font-body text-sm transition-colors',
                  reason === r ? 'border-ink bg-ink text-paper' : 'border-ink/15 text-ink/70 hover:border-ink/40',
                ]"
              >
                {{ r }}
              </button>
            </div>
            <!-- Sent along to EmailJS as part of the message context -->
            <input type="hidden" name="reason" :value="reason" />

            <div class="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label for="name" class="font-body text-sm font-semibold text-ink">{{ $t('contact.nameLabel') }}</label>
                <input id="name" name="name" v-model="name" required type="text"
                  class="mt-2 w-full rounded-sm border border-ink/15 bg-paper px-3.5 py-2.5 font-body text-sm text-ink" />
              </div>
              <div>
                <label for="organization" class="font-body text-sm font-semibold text-ink">{{ $t('contact.schoolLabel') }}</label>
                <input id="organization" name="organization" v-model="organization" required type="text"
                  class="mt-2 w-full rounded-sm border border-ink/15 bg-paper px-3.5 py-2.5 font-body text-sm text-ink" />
              </div>
            </div>

            <div class="mt-5">
              <label for="email" class="font-body text-sm font-semibold text-ink">{{ $t('contact.emailLabel') }}</label>
              <input id="email" name="email" v-model="email" required type="email"
                class="mt-2 w-full rounded-sm border border-ink/15 bg-paper px-3.5 py-2.5 font-body text-sm text-ink" />
            </div>

            <div class="mt-5">
              <label for="message" class="font-body text-sm font-semibold text-ink">{{ $t('contact.messageLabel') }}</label>
              <textarea id="message" name="message" v-model="message" required rows="4"
                class="mt-2 w-full rounded-sm border border-ink/15 bg-paper px-3.5 py-2.5 font-body text-sm text-ink"></textarea>
            </div>

            <button type="submit" :disabled="sending"
              class="mt-6 rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-paper transition-colors hover:bg-plum disabled:opacity-50">
              {{ sending ? $t('contact.sending') : $t('contact.send') }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <FaqAccordion :eyebrow="$t('contact.faqEyebrow')" :items="faqItems" :open-first="true" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
const localePath = useLocalePath()

const { t, tm, rt, locale } = useI18n()

const reasons = computed(() => {
  void locale.value
  return tm('contact.reasons').map((r) => rt(r))
})
const reason = ref('')
const name = ref('')
const organization = ref('')
const email = ref('')
const message = ref('')
const contactform = ref(null)
const sending = ref(false)
const isSuccess = ref(false)
const isError = ref(false)

// Real EmailJS credentials already used on the live site — same service,
// template and public key as the current production contact form.
async function sendForm() {
  sending.value = true
  isError.value = false
  try {
    await emailjs.sendForm(
      'service_dw5j7af',
      'template_glfviys',
      contactform.value,
      'fmOc4joeStfAyUTP1'
    )
    isSuccess.value = true
    name.value = ''
    organization.value = ''
    email.value = ''
    message.value = ''
    reason.value = ''
    setTimeout(() => (isSuccess.value = false), 4000)
  } catch (err) {
    console.error('EmailJS send failed:', err)
    isError.value = true
    setTimeout(() => (isError.value = false), 4000)
  } finally {
    sending.value = false
  }
}

const faqItems = computed(() => {
  void locale.value
  return tm('contact.faq').map((item) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  }))
})
</script>