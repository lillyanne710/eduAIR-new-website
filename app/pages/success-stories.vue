<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/success-stories-hero.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('success.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('success.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('success.heroBody') }}
        </p>
      </div>
    </section>

    <!-- STORIES -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-8 md:grid-cols-2">
        <figure
          v-for="story in stories"
          :key="story.school"
          class="rounded-2xl border border-ink/10 p-8"
        >
          <p class="font-mono text-xs font-medium uppercase tracking-wide text-plum">{{ story.level }}</p>
          <blockquote class="mt-4 font-display text-xl font-medium leading-snug text-ink">
            {{ story.quote }}
          </blockquote>
          <figcaption class="mt-5 font-body text-sm text-ink/55">— {{ story.school }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- COMPETITIONS -->
    <section class="border-t border-ink/10 bg-ink">
      <div class="mx-auto max-w-6xl px-6 py-14">
        <p class="font-mono text-sm font-semibold uppercase tracking-wide text-gold">
          {{ $t('success.competitionsLabel') }}
        </p>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-paper/70">
          {{ $t('success.competitionsBody') }}
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-plum">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <h2 class="max-w-md font-display text-3xl font-bold text-paper">{{ $t('success.ctaTitle') }}</h2>
        <NuxtLink
          :to="localePath('/contact')"
          class="whitespace-nowrap rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-ink"
        >
          {{ $t('success.ctaButton') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { tm, rt, locale } = useI18n()
const localePath = useLocalePath()

const stories = computed(() => {
  void locale.value
  return tm('success.stories').map((s) => ({
    level: rt(s.level),
    school: rt(s.school),
    quote: rt(s.quote),
  }))
})
</script>