<template>
  <div class="bg-paper font-body">
    <div v-if="event" class="mx-auto max-w-3xl px-6 pb-20 pt-32 text-center">
      <h1 class="font-display text-4xl font-bold leading-tight text-ink">{{ content.title }}</h1>
      <p class="mt-3 font-body text-sm text-ink/45">{{ formatDate(event.date) }}</p>

      <!-- Gallery: main image/video + thumbnail strip -->
      <div class="mt-10">
        <div class="overflow-hidden rounded-2xl bg-ink/10">
          <video v-if="isVideo(mainMedia)" :src="mainMedia" autoplay loop muted playsinline class="aspect-[4/3] w-full object-cover" />
          <img v-else :src="mainMedia" alt="" class="aspect-[4/3] w-full object-cover" />
        </div>
        <div v-if="event.media.gallery.length > 1" class="mt-3 flex justify-center gap-2 overflow-x-auto">
          <button
            v-for="m in event.media.gallery"
            :key="m"
            @click="mainMedia = m"
            class="h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2"
            :class="mainMedia === m ? 'border-plum' : 'border-transparent'"
          >
            <img :src="isVideo(m) ? m.replace(/\.mp4$/, '.jpg') : m" alt="" class="h-full w-full object-cover" />
          </button>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-5 text-left">
        <p v-for="(paragraph, i) in content.content" :key="i" class="font-body text-base leading-relaxed text-ink/75">
          {{ paragraph }}
        </p>
      </div>

      <div class="mt-14 border-t border-ink/10 pt-6 text-right">
        <NuxtLink v-if="nextEvent" :to="localePath(`/news-and-events/${nextEvent.id}`)" class="font-body text-sm font-semibold text-plum">
          {{ nextContent.title }} ›
        </NuxtLink>
      </div>
    </div>

    <div v-else class="mx-auto max-w-4xl px-6 py-32 text-center">
      <p class="font-body text-ink/60">{{ $t('news.notFound') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { newsEvents } from '~/data/newsEvents.js'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()

const sorted = newsEvents.slice().sort((a, b) => new Date(b.date) - new Date(a.date))

const eventIndex = computed(() => sorted.findIndex((e) => String(e.id) === String(route.params.id)))
const event = computed(() => (eventIndex.value > -1 ? sorted[eventIndex.value] : null))
const content = computed(() => (event.value ? event.value[locale.value] || event.value.en : {}))

const nextEvent = computed(() => sorted[eventIndex.value + 1] || null)
const nextContent = computed(() => (nextEvent.value ? nextEvent.value[locale.value] || nextEvent.value.en : {}))

const mainMedia = ref(null)
watchEffect(() => {
  if (event.value) mainMedia.value = event.value.media.gallery[0]
})

function isVideo(path) {
  return path?.toLowerCase().endsWith('.mp4')
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(locale.value === 'en' ? 'en-US' : 'zh-Hant', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>