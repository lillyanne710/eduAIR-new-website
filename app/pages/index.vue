<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-ink">
      <video
        class="absolute inset-0 h-full w-full object-cover"
        src="/videos/intro.mp4"
        autoplay
        loop
        muted
        playsinline
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />

      <div class="relative flex h-full flex-col justify-end px-6 pb-40 sm:px-10 sm:pb-16">
  
        <p class="font-mono text-lg font-semibold text-plum"> EduAIR</p>
        <h1 class="max-w-xl font-display text-5xl font-bold leading-tight text-paper sm:text-6xl">
          {{ $t('home.heroTitle1') }}<span class="text-gold">{{ $t('home.heroTitleAI') }}</span>{{ $t('home.heroTitle2') }}
        </h1>
        <p class="mt-4 max-w-md font-display text-lg text-gold">
          {{ $t('home.heroSubtitle') }}
        </p>
      </div>

      <!-- Info card: overlaps the video, pinned to the bottom-right -->
      <div class="absolute bottom-6 right-6 z-10 hidden max-w-sm rounded-2xl bg-paper p-8 shadow-lg sm:right-10 lg:block">
        <p class="font-body text-base leading-relaxed text-ink/80">
          {{ $t('home.cardDescription') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-4">
          <button
            @click="() => navigateTo(localePath('/services'))"
            class="rounded-full border border-ink/15 px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {{ $t('home.viewKits') }}
          </button>
          <button
          @click="() => navigateTo(localePath('/contact'))"
          class="rounded-full bg-gold px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          {{ $t('home.bookWorkshop') }}
        </button>
        </div>
      </div>

      <!-- Mobile/tablet version -->
      <div class="relative z-10 -mt-16 px-6 pb-10 sm:px-10 lg:hidden">
        <div class="max-w-sm rounded-2xl bg-paper p-8 shadow-lg">
          <p class="font-body text-base leading-relaxed text-ink/80">
            {{ $t('home.cardDescription') }}
          </p>
          <div class="mt-6 flex flex-wrap gap-4">
            <button
              @click="() => navigateTo(localePath('/services'))"
              class="rounded-full border border-ink/15 px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {{ $t('home.viewKits') }}
            </button>
            <button
              @click="() => navigateTo(localePath('/contact'))"
              class="rounded-full bg-gold px-4 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              {{ $t('home.bookWorkshop') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- AWARDS TICKER -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <p class="text-center font-mono text-lg font-semibold text-ink/60">{{ $t('home.awardsLabel') }}</p>
      <div class="mt-6">
        <AwardsTicker :images="awardImages" :speed="24" background-color="#FDF6EC" />
      </div>
    </section>

    <!-- ABOUT US -->
    <section class="mx-auto grid max-w-4xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
      <div>
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('home.aboutEyebrow') }}</p>
        <h2 class="mt-3 font-display text-4xl font-bold text-ink">{{ $t('home.aboutTitle') }}</h2>
        <img
          src="/images/home-about-us.png"
          alt="EduAIR AI education support"
          class="mt-6 w-full rounded-2xl object-cover"
        />
      </div>
      <div>
        <p class="max-w-md font-body text-base leading-relaxed text-ink/70">
          {{ $t('home.aboutBody') }}
        </p>
        <button class="mt-6 rounded-full bg-gold px-6 py-3 font-body text-sm font-semibold text-ink"
          @click="() => navigateTo(localePath('/about-us'))">
          {{ $t('home.aboutCta') }}
        </button>
      </div>
    </section>

    <!-- KITS -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <p class="font-mono text-lg font-semibold text-plum">{{ $t('home.kitsEyebrow') }}</p>
      <p class="mt-3 max-w-xl font-body text-base text-ink/70">
        {{ $t('home.kitsIntro') }}
      </p>
      <h2 class="mt-4 font-display text-4xl font-bold text-ink">{{ $t('home.kitsTitle') }}</h2>

      <div class="mt-12 flex flex-col gap-16">
        <div
          v-for="(kit, i) in kits"
          :key="kit.name"
          class="grid gap-8 md:grid-cols-2 md:items-center"
        >
          <div :class="i % 2 === 1 ? 'md:order-2' : ''">
            <p class="font-mono text-sm font-semibold text-gold">{{ kit.tag }}</p>
            <h3 class="mt-2 font-display text-4xl font-bold text-ink">{{ kit.name }}</h3>
            <p class="mt-1 font-mono text-sm text-plum">{{ kit.subtitle }}</p>
            <p class="mt-4 max-w-md font-body text-base leading-relaxed text-ink/70">
              {{ kit.body }}
            </p>
            <a href="#" class="mt-5 inline-block font-body text-sm font-semibold text-plum">
              {{ kit.cta }} →
            </a>
          </div>
          <div :class="i % 2 === 1 ? 'md:order-1' : ''">
            <img :src="kit.photo" :alt="kit.name" class="w-full rounded-2xl object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="relative overflow-hidden bg-ink py-16">
      <img
        src="/images/home-news.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-body text-sm text-paper/70">{{ $t('home.newsLabel') }}</p>
        <h3 class="mt-2 max-w-lg font-display text-3xl font-bold text-paper">
          {{ $t('home.newsTitle') }}
        </h3>
        <button 
        @click="() => navigateTo(localePath('/news-and-events/index'))"
           class="mt-4 inline-block font-body text-sm font-semibold text-gold">
          {{ $t('home.newsCta') }}
        </button>
      </div>
    </section>

    <!-- PARTNERS -->
    <section class="mx-auto max-w-4xl px-6 py-16 text-center">
      <p class="font-body text-sm font-semibold text-plum">{{ $t('home.partnersLabel') }}</p>
      <h2 class="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-ink">
        {{ $t('home.partnersTitle') }}
      </h2>
      <p class="mx-auto mt-4 max-w-xl font-body text-base text-ink/70">
        {{ $t('home.partnersBody') }}
      </p>
      <img
        src="https://framerusercontent.com/images/dRrkPXUVoeEef7uWDkQSW6Wnu4.png"
        alt="Partner school logos"
        class="mx-auto mt-10 w-full max-w-4xl"
      />
    </section>

    <!-- CTA -->
    <section class="bg-plum">
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="max-w-md font-display text-3xl font-bold text-paper">
            {{ $t('home.ctaTitle') }}
          </h2>
          <p class="mt-2 max-w-md font-body text-sm text-paper/80">
            {{ $t('home.ctaBody') }}
          </p>
        </div>
        <button 
          @click="() => navigateTo(localePath('/contact'))"
          class="whitespace-nowrap rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-ink">
          {{ $t('home.ctaButton') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const localePath = useLocalePath()

// $tm() alone isn't enough here — it returns pre-compiled message objects,
// not plain strings. $rt() ("render translation") turns each one into real
// text. locale.value is read inside the computed purely so it re-runs
// whenever the language changes.
const { tm, rt, locale } = useI18n()
const kits = computed(() => {
  void locale.value
  return tm('home.kits').map((kit) => ({
    tag: rt(kit.tag),
    name: rt(kit.name),
    subtitle: rt(kit.subtitle),
    body: rt(kit.body),
    cta: rt(kit.cta),
    photo: rt(kit.photo),
  }))
})

const awardImages = [
  "https://framerusercontent.com/images/3svlVwmRuerwDnUVT3DgRXgS1k.png",
  "https://framerusercontent.com/images/UEmSmLolZFxI7uwSJlz4NEXNA0.png",
  "https://framerusercontent.com/images/ngEa8PIurag2xS1JLMdlP2ch3A.png",
  "https://framerusercontent.com/images/fcShie1JmOp2A97BwQUJQ79LHFg.png",
  "https://framerusercontent.com/images/t5Tzt8kUrnZmqbdPtsmztMKDO8.png",
  "https://framerusercontent.com/images/D0InkFVWD1isz9Y3bFfLXNh0B4.png",
]
</script>