<template>
  <div class="bg-paper font-body">
    <!-- HERO / WHAT IS ICAR -->
    <section ref="introRef" class="relative overflow-hidden bg-ink pb-16 pt-20">
      <img
        src="/images/iCar.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('icar.eyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">iCar</h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('icar.intro') }}
        </p>
        <div class="mt-6 flex gap-3">
          <a href="https://play.google.com/store/apps/details?id=com.eduairhk.cuhkicarapp" target="_blank" rel="noopener noreferrer"
            class="rounded-full bg-paper px-5 py-2.5 font-body text-sm font-semibold text-ink">Google Play</a>
          <a href="https://apps.apple.com/us/app/cuhk-icar-app/id6462405334" target="_blank" rel="noopener noreferrer"
            class="rounded-full bg-paper px-5 py-2.5 font-body text-sm font-semibold text-ink">App Store</a>
        </div>
      </div>
    </section>
    <!-- Section nav — sticky pill bar -->
    <div class="sticky top-[68px] mx-auto max-w-5xl z-40 flex flex-wrap gap-2 border-b border-ink/10 bg-paper/95 px-6 py-3 backdrop-blur">
      <button v-for="s in sections" :key="s.id" @click="scrollTo(s.id)" class="rounded-full border border-ink/15 px-3.5 py-1.5 font-body text-xs font-semibold text-ink/70 hover:border-ink/40">
        {{ s.label }}
      </button>
    </div>


    <!-- HOW TO USE -->
    <section ref="howToRef" class="mx-auto max-w-4xl px-6 py-16">
      <h2 class="font-display text-3xl font-bold text-ink">{{ $t('icar.howToUseTitle') }}</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-3">
        <div v-for="method in howToUse" :key="method.title" class="rounded-2xl border border-ink/10 p-6">
          <h3 class="font-display text-base font-semibold text-ink">{{ method.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ method.body }}</p>
        </div>
      </div>
    </section>

    <!-- EXPERIMENTS -->
    <section
      v-for="(exp, i) in experiments"
      :key="exp.id"
      :ref="(el) => setExpRef(exp.id, el)"
      class="mx-auto max-w-4xl border-t border-ink/10 px-6 py-16"
    >
      <span class="font-mono text-xs font-medium uppercase tracking-wide text-gold">
        {{ $t('icar.experimentLabel') }} {{ String(i + 1).padStart(2, '0') }}
      </span>
      <h2 class="mt-2 font-display text-3xl font-bold text-ink">{{ exp.title }}</h2>

      <div v-if="exp.video1Url || exp.video2Url" class="mt-6 grid gap-4" :class="exp.video1Url && exp.video2Url ? 'sm:grid-cols-2' : ''">
        <div v-if="exp.video1Url" class="overflow-hidden rounded-2xl bg-ink">
          <iframe :src="youTubeEmbed(exp.video1Url)" class="aspect-video w-full" allowfullscreen />
          <p class="p-2 font-body text-xs font-semibold text-ink/60">{{ exp.video1Label }}</p>
        </div>
        <div v-if="exp.video2Url" class="overflow-hidden rounded-2xl bg-ink">
          <iframe :src="youTubeEmbed(exp.video2Url)" class="aspect-video w-full" allowfullscreen />
          <p class="p-2 font-body text-xs font-semibold text-ink/60">{{ exp.video2Label }}</p>
        </div>
      </div>

      <p class="mt-6 max-w-4xl font-body text-base leading-relaxed text-ink/70">{{ exp.description }}</p>

      <div v-if="exp.reasoningVideos && exp.reasoningVideos.length" class="mt-6 grid gap-4 sm:grid-cols-3">
        <div v-for="rv in exp.reasoningVideos" :key="rv.label">
          <video :src="rv.url" autoplay loop muted playsinline class="w-full rounded-xl bg-ink" />
          <p class="mt-2 font-body text-xs font-semibold text-ink">{{ rv.label }}</p>
          <p class="font-body text-xs text-ink/55">{{ rv.caption }}</p>
        </div>
      </div>

      <div v-if="exp.questions && exp.questions.length" class="mt-6 max-w-4xl rounded-2xl bg-plum-soft/40 p-6">
        <p class="font-display text-sm font-semibold text-plum">{{ $t('icar.discussionTitle') }}</p>
        <ul class="mt-3 list-disc space-y-2 pl-5">
          <li v-for="q in exp.questions" :key="q" class="font-body text-sm leading-relaxed text-ink/70">{{ q }}</li>
        </ul>
      </div>

      <div v-if="exp.zhUrl || exp.enUrl" class="mt-6 flex flex-wrap gap-3">
        <a v-if="exp.zhUrl" :href="exp.zhUrl" target="_blank" rel="noopener noreferrer"
          class="rounded-full border border-plum px-4 py-2 font-body text-sm font-semibold text-plum">↓ 中文教材</a>
        <a v-if="exp.enUrl" :href="exp.enUrl" target="_blank" rel="noopener noreferrer"
          class="rounded-full border border-plum px-4 py-2 font-body text-sm font-semibold text-plum">↓ English</a>
      </div>
    </section>

    <!-- RESOURCE SUMMARY -->
    <section ref="resourceRef" class="mx-auto max-w-4xl border-t border-ink/10 px-6 py-16">
      <h2 class="font-display text-3xl font-bold text-ink">{{ $t('icar.resourceSummaryTitle') }}</h2>
      <div class="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10">
        <div v-for="r in resources" :key="r.label" class="flex items-center justify-between gap-4 p-5">
          <p class="font-body text-sm font-medium text-ink">{{ r.label }}</p>
          <a :href="r.url" target="_blank" rel="noopener noreferrer" class="font-body text-sm font-semibold text-plum">↓ Download</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { tm, rt, locale } = useI18n()

function youTubeEmbed(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

const sections = [
  { id: 'intro', label: 'What is iCar?' },
  { id: 'howTo', label: 'How to use iCar?' },
  { id: 'moral-dilemma', label: 'Moral Dilemma' },
  { id: 'face-following', label: 'Face Following' },
  { id: 'line-tracking', label: 'Line Tracking' },
  { id: 'food-delivery', label: 'Food Delivery' },
  { id: 'resource', label: 'Resource Summary' },
]

const introRef = ref(null)
const howToRef = ref(null)
const resourceRef = ref(null)
const expRefs = {}
function setExpRef(id, el) {
  if (el) expRefs[id] = el
}

function scrollTo(id) {
  const map = { intro: introRef.value, howTo: howToRef.value, resource: resourceRef.value }
  const el = map[id] || expRefs[id]
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const howToUse = computed(() => {
  void locale.value
  return tm('icar.howToUse').map((m) => ({ title: rt(m.title), body: rt(m.body) }))
})

const experiments = computed(() => {
  void locale.value
  return tm('icar.experiments').map((e) => ({
    id: rt(e.id),
    title: rt(e.title),
    description: rt(e.description),
    questions: (e.questions || []).map((q) => rt(q)),
    zhUrl: e.zhUrl ? rt(e.zhUrl) : null,
    enUrl: e.enUrl ? rt(e.enUrl) : null,
    video1Label: e.video1Label ? rt(e.video1Label) : null,
    video1Url: e.video1Url ? rt(e.video1Url) : null,
    video2Label: e.video2Label ? rt(e.video2Label) : null,
    video2Url: e.video2Url ? rt(e.video2Url) : null,
    reasoningVideos: (e.reasoningVideos || []).map((rv) => ({
      label: rt(rv.label),
      url: rt(rv.url),
      caption: rt(rv.caption),
    })),
  }))
})

const resources = [
  { label: 'Micro:bit Program (.zip)', url: 'https://download.eduairhk.com/iCar_Microbit_Program.zip' },
  { label: 'MakeCode Extension', url: 'https://download.eduairhk.com/iCar_MakeCode_Extension.zip' },
]
</script>