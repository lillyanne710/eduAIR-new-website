<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="https://framerusercontent.com/images/AuPbz8cG1EXYZBXaYZZkbG96gw4.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('news.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('news.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('news.heroBody') }}
        </p>
      </div>
    </section>

    <!-- EVENT GRID -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="localePath(`/news-and-events/${event.id}`)"
          class="group overflow-hidden rounded-2xl border border-ink/10 transition-colors hover:border-plum/30"
        >
          <div class="aspect-[4/3] overflow-hidden bg-ink/10">
            <video
              v-if="event.media.type === 'video'"
              :src="event.media.thumbnail"
              muted
              playsinline
              class="h-full w-full object-cover"
            />
            <img v-else :src="event.media.thumbnail" :alt="event.title" class="h-full w-full object-cover" />
          </div>
          <div class="p-5">
            <p class="font-mono text-xs uppercase tracking-wide text-gold">{{ formatDate(event.date) }}</p>
            <h3 class="mt-2 font-display text-base font-semibold leading-snug text-ink group-hover:text-plum">
              {{ event.title }}
            </h3>
            <p v-if="event.subtitle" class="mt-1 font-body text-sm text-ink/60">{{ event.subtitle }}</p>
          </div>
        </NuxtLink>
      </div>

      <p v-if="events.length === 0" class="mt-10 font-body text-ink/60">{{ $t('news.empty') }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { newsEvents } from '~/data/newsEvents.js'

const { locale } = useI18n()
const localePath = useLocalePath()

// Each event carries its own per-locale content directly (title/subtitle),
// picked out here based on whichever language is active — no $t()/$tm()
// needed since this data doesn't live in the i18n locale files at all.
const events = computed(() => {
  return newsEvents
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((e) => {
      const t = e[locale.value] || e.en
      return { id: e.id, date: e.date, media: e.media, title: t.title, subtitle: t.subtitle }
    })
})

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'zh-Hant', { year: 'numeric', month: 'long' })
}
</script>