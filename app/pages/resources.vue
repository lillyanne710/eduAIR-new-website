<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/iTrain.png"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('resources.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('resources.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('resources.heroBody') }}
        </p>
      </div>
    </section>

    <!-- DOWNLOADABLE TEACHING RESOURCES -->
    <section class="mx-auto max-w-4xl px-6 py-16 text-center">
      <p class="font-mono text-lg font-semibold text-plum">{{ $t('resources.downloadsTitle') }}</p>
      <p class="mx-auto mt-3 max-w-4xl font-body text-base text-ink/70">{{ $t('resources.downloadsIntro') }}</p>
      <h3 class="mt-8 font-display text-sm font-semibold uppercase tracking-wide text-ink/70">
        {{ $t('resources.worksheetsLabel') }}
      </h3>

      <div class="mt-10 grid gap-6 sm:grid-cols-2">
        <div v-for="group in kitGroups" :key="group.kit">
          <img :src="group.thumbnail" :alt="group.kit" class="mx-auto h-24 w-24 rounded-2xl object-cover" />
          <h4 class="mt-4 font-display text-2xl font-bold text-ink">{{ group.kit }}</h4>

          <div class="mt-6 flex flex-col gap-5 text-left">
            <div v-for="item in group.items" :key="item.title" class="flex items-start justify-between gap-4">
              <span class="font-body text-sm font-medium text-ink/80">{{ item.title }}</span>
              <span class="flex shrink-0 gap-3 pt-0.5">
                <a v-if="item.zh" :href="item.zh" target="_blank" rel="noopener noreferrer" class="font-body text-xs font-semibold text-plum">↓ 中</a>
                <a v-if="item.en" :href="item.en" target="_blank" rel="noopener noreferrer" class="font-body text-xs font-semibold text-plum">↓ EN</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ARTICLES ON AI EDUCATION -->
    <section class="border-t border-ink/10 bg-plum-soft/40">
      <div class="mx-auto max-w-4xl px-6 py-16">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('resources.articlesTitle') }}</p>
        <p class="mt-3 max-w-xl font-body text-base text-ink/70">{{ $t('resources.articlesIntro') }}</p>

        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <a
            v-for="a in articles"
            :key="a.title"
            :href="a.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col rounded-2xl border border-ink/10 bg-paper p-6 transition-colors hover:border-plum/30"
          >
            <span class="font-mono text-xs uppercase tracking-wide text-gold">{{ a.date }}</span>
            <h3 class="mt-2 font-display text-lg font-semibold leading-snug text-ink">{{ a.title }}</h3>
            <p class="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/65">{{ a.summary }}</p>
            <span class="mt-4 font-body text-sm font-semibold text-plum">{{ $t('resources.readMore') }} ↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <FaqAccordion :eyebrow="$t('resources.faqEyebrow')" :items="faqItems" :open-first="true" />
    </section>

    <!-- CTA -->
    <section class="bg-plum">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <h2 class="max-w-md font-display text-3xl font-bold text-paper">{{ $t('resources.ctaTitle') }}</h2>
        <NuxtLink
          :to="localePath('/contact')"
          class="whitespace-nowrap rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-ink"
        >
          {{ $t('resources.ctaButton') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { tm, rt, locale } = useI18n()
const localePath = useLocalePath()

const kitThumbnails = {
  iCar: '/images/cartoon-iCar.jpg',
  iPort: '/images/cartoon-iPort.png',
}

const kitGroups = computed(() => {
  void locale.value
  return tm('resources.kitGroups').map((g) => ({
    kit: rt(g.kit),
    thumbnail: kitThumbnails[rt(g.kit)],
    items: g.items.map((item) => ({
      title: rt(item.title),
      zh: item.zh ? rt(item.zh) : null,
      en: item.en ? rt(item.en) : null,
    })),
  }))
})

const articles = computed(() => {
  void locale.value
  return tm('resources.articles').map((a) => ({
    title: rt(a.title),
    date: rt(a.date),
    summary: rt(a.summary),
    url: rt(a.url),
  }))
})

const faqItems = computed(() => {
  void locale.value
  return tm('resources.faq').map((item) => ({
    question: rt(item.question),
    answer: rt(item.answer),
  }))
})
</script>