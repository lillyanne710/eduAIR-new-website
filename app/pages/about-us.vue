<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/about-us-hero.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('about.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('about.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('about.heroBody') }}
        </p>
      </div>
    </section>

    <!-- ABOUT US -->
    <section class="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
      <div>
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('about.aboutEyebrow') }}</p>
        <h2 class="mt-3 font-display text-4xl font-bold text-ink">{{ $t('about.aboutTitle') }}</h2>
        <img
          src="/images/home-about-us.png"
          alt="EduAIR"
          class="mt-6 w-full rounded-2xl object-cover"
        />
      </div>
      <div>
        <p class="max-w-md font-body text-base leading-relaxed text-ink/70">
          {{ $t('about.aboutBody') }}
        </p>
        <NuxtLink
          :to="localePath('/contact')"
          class="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold text-ink"
          > {{ $t('about.aboutCta') }} 
        </NuxtLink>
      </div>
    </section>

    <!-- OUR STORY -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <p class="font-mono text-lg font-semibold text-plum">{{ $t('about.storyEyebrow') }}</p>

      <div class="mt-10 grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-3">
        <div v-for="(chapter, i) in storyChapters" :key="i" class="border-l-2 border-gold pl-5">
          <p class="font-mono text-xs font-medium uppercase tracking-wide text-plum">{{ chapter.label }}</p>
          <h3 class="mt-2 font-display text-lg font-semibold leading-snug text-ink">{{ chapter.heading }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ chapter.body }}</p>
        </div>
      </div>
    </section>

    <!-- TEAM & BOARD -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <p class="font-mono text-lg font-semibold text-plum">{{ $t('about.teamEyebrow') }}</p>
      <h2 class="mt-3 max-w-2xl font-display text-4xl font-bold text-ink">{{ $t('about.teamTitle') }}</h2>
      <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/70">
        {{ $t('about.teamBody') }}
      </p>

      <!-- Board of Directors -->
      <h3 class="mt-12 font-display text-sm font-semibold uppercase tracking-wide text-ink/70">
        {{ $t('about.boardTitle') }}
      </h3>
      <div class="mt-6 grid gap-8 sm:grid-cols-2">
        <div v-for="member in board" :key="member.name" class="text-center">
          <img :src="member.photo" :alt="member.name" class="mx-auto h-24 w-24 rounded-full object-cover" />
          <h4 class="mt-4 font-display text-base font-semibold text-ink">{{ member.name }}</h4>
          <p class="mt-1 font-body text-sm text-ink/65">{{ member.role }}</p>
        </div>
      </div>

      <!-- Technical Team -->
      <h3 class="mt-12 font-display text-sm font-semibold uppercase tracking-wide text-ink/70">
        {{ $t('about.techTitle') }}
      </h3>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="member in techTeam" :key="member.name" class="rounded-2xl border border-ink/10 p-6 text-center">
          <h4 class="font-display text-base font-semibold text-ink">{{ member.name }}</h4>
          <p class="mt-1 font-body text-sm text-ink/65">{{ member.role }}</p>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const localePath = useLocalePath()

const { tm, rt, locale } = useI18n()

// storyChapters comes from the JSON (array of {label, heading, body}),
// rendered through rt() the same way the homepage kits are.
const storyChapters = computed(() => {
  void locale.value
  return tm('about.storyChapters').map((c) => ({
    label: rt(c.label),
    heading: rt(c.heading),
    body: rt(c.body),
  }))
})

// Board and technical team names/roles are the same across every language,
// so they're just plain JS here rather than going through i18n — only the
// section labels/titles above them need translating.
const board = [
  {
    name: 'Professor Yeung YAM',
    role: 'Research Professor, Department of Mechanical and Automation Engineering, CUHK',
    photo: '/images/yam.jpg',
  },
  {
    name: 'Professor Helen MENG',
    role: 'Patrick Huen Wing Ming Professor of Systems Engineering and Engineering Management, CUHK',
    photo: '/images/meng.jpg',
  },
]

const techTeam = [
  { name: 'Derek Cheung', role: 'Technical Director' },
  { name: 'Michael Chui', role: 'Deputy Technical Manager' },
  { name: 'Helen So', role: 'Product Engineer' },
  { name: 'Ben Chan', role: 'Software Engineer' },
]
</script>