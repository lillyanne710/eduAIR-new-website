<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/iShare.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('ishare.eyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">iShare</h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('ishare.intro') }}
        </p>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <h2 class="font-display text-3xl font-bold text-ink">{{ $t('ishare.categoriesTitle') }}</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="cat in categories" :key="cat.title" class="rounded-2xl border border-ink/10 p-6">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-plum-soft">
            <span class="text-plum">✦</span>
          </div>
          <h3 class="mt-4 font-display text-base font-semibold text-ink">{{ cat.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ cat.body }}</p>
        </div>
      </div>
    </section>

    <!-- EDB CURRICULUM MATERIALS -->
    <section class="border-t border-ink/10 bg-plum-soft/40">
      <div class="mx-auto max-w-6xl px-6 py-16">
        <p class="font-mono text-sm font-semibold uppercase tracking-wide text-plum">
          {{ $t('ishare.curriculumEyebrow') }}
        </p>
        <h2 class="mt-3 font-display text-3xl font-bold text-ink">{{ $t('ishare.curriculumTitle') }}</h2>
        <p class="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink/70">
          {{ $t('ishare.curriculumIntro') }}
        </p>

        <div class="mt-8 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-paper">
          <div v-for="(book, i) in books" :key="book.title" class="flex gap-4 p-6">
            <span class="font-display text-sm font-bold text-gold">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="font-display text-base font-semibold text-ink">{{ book.title }}</h3>
              <p class="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{{ book.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-plum">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <h2 class="max-w-md font-display text-3xl font-bold text-paper">{{ $t('ishare.ctaTitle') }}</h2>
        <NuxtLink
          :to="localePath('/contact')"
          class="whitespace-nowrap rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold text-ink"
        >
          {{ $t('ishare.ctaButton') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { tm, rt, locale } = useI18n()
const localePath = useLocalePath()

const categories = computed(() => {
  void locale.value
  return tm('ishare.categories').map((c) => ({ title: rt(c.title), body: rt(c.body) }))
})

const books = computed(() => {
  void locale.value
  return tm('ishare.books').map((b) => ({ title: rt(b.title), body: rt(b.body) }))
})
</script>