<template>
  <div class="bg-paper font-body">

    <!-- HERO / WHAT IS IPORT -->
    <section ref="introRef" class="relative overflow-hidden bg-ink pb-16 pt-20">
      <img
        src="/images/iPort.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('iport.eyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">iPort</h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('iport.intro') }}
        </p>
      </div>
    </section>
    
    <!-- Section nav -->
    <div class="sticky top-[68px] z-40 flex flex-wrap gap-2 border-b border-ink/10 bg-paper/95 px-6 py-3 backdrop-blur">
      <button v-for="s in sections" :key="s.id" @click="scrollTo(s.id)" class="rounded-full border border-ink/15 px-3.5 py-1.5 font-body text-xs font-semibold text-ink/70 hover:border-ink/40">
        {{ s.label }}
      </button>
    </div>

    <!-- HOW TO USE -->
    <section ref="howToRef" class="mx-auto max-w-4xl px-6 py-16">
      <h2 class="font-display text-3xl font-bold text-ink">{{ $t('iport.howToUseTitle') }}</h2>
      <div class="mt-8 grid gap-8 sm:grid-cols-[minmax(200px,320px)_1fr] sm:items-start">
        <div class="flex flex-col gap-3 rounded-2xl bg-gold p-6">
          <p class="font-display text-sm font-bold text-ink">{{ $t('iport.stepsExampleLabel') }}</p>
          <p v-for="(step, i) in steps" :key="i" class="font-body text-sm leading-relaxed text-ink/80">
            {{ i + 1 }}. {{ step }}
          </p>
        </div>
        <div class="overflow-hidden rounded-2xl">
          <iframe
            src="https://customer-9nuyiwcobdv6cl6j.cloudflarestream.com/4055a7eff49f4bde229300208c92ad20/iframe"
            class="aspect-video w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowfullscreen
          />
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
        {{ $t('iport.experimentLabel') }} {{ String(i + 1).padStart(2, '0') }}
      </span>
      <h2 class="mt-2 font-display text-3xl font-bold text-ink">{{ exp.title }}</h2>

      <div v-if="exp.video1Url || exp.video2Url" class="mt-6 grid gap-4" :class="exp.video1Url && exp.video2Url ? 'sm:grid-cols-2' : ''">
        <div v-if="exp.video1Url">
          <video :src="exp.video1Url" autoplay loop muted playsinline class="w-full rounded-2xl bg-ink" />
          <p v-if="exp.video1Label" class="mt-2 font-body text-xs font-semibold text-ink/60">{{ exp.video1Label }}</p>
        </div>
        <div v-if="exp.video2Url">
          <video :src="exp.video2Url" autoplay loop muted playsinline class="w-full rounded-2xl bg-ink" />
          <p v-if="exp.video2Label" class="mt-2 font-body text-xs font-semibold text-ink/60">{{ exp.video2Label }}</p>
        </div>
      </div>

      <p class="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink/70">{{ exp.description }}</p>

      <div v-if="exp.questions && exp.questions.length" class="mt-6 max-w-6xl rounded-2xl bg-plum-soft/40 p-6">
        <p class="font-display text-sm font-semibold text-plum">{{ $t('iport.discussionTitle') }}</p>
        <ul class="mt-3 list-disc space-y-2 pl-5">
          <li v-for="q in exp.questions" :key="q" class="font-body text-sm leading-relaxed text-ink/70">{{ q }}</li>
        </ul>
      </div>
    </section>

    <!-- OTHER EXPERIMENTS -->
    <section ref="otherRef" class="mx-auto max-w-4xl border-t border-ink/10 px-6 py-16">
      <h2 class="font-display text-3xl font-bold text-ink">{{ $t('iport.otherTitle') }}</h2>
      <div class="mt-8 grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))">
        <div v-for="ex in otherExperiments" :key="ex.title">
          <video :src="ex.videoUrl" autoplay loop muted playsinline class="w-full rounded-2xl bg-ink" />
          <p class="mt-2 font-body text-xs font-semibold text-ink">{{ ex.title }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { tm, rt, locale } = useI18n()

const sections = [
  { id: 'intro', label: 'What is iPort?' },
  { id: 'howTo', label: 'How to use iPort?' },
  { id: 'alert-system', label: 'Stranger Alert System' },
  { id: 'gesture-car', label: 'Gesture-controlled Car' },
  { id: 'voice-switch', label: 'Audio-controlled Light Switch' },
  { id: 'other', label: 'Other Experiments' },
]

const introRef = ref(null)
const howToRef = ref(null)
const otherRef = ref(null)
const expRefs = {}
function setExpRef(id, el) {
  if (el) expRefs[id] = el
}

function scrollTo(id) {
  const map = { intro: introRef.value, howTo: howToRef.value, other: otherRef.value }
  const el = map[id] || expRefs[id]
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const steps = computed(() => {
  void locale.value
  return tm('iport.steps').map((s) => rt(s))
})

const experiments = computed(() => {
  void locale.value
  return tm('iport.experiments').map((e) => ({
    id: rt(e.id),
    title: rt(e.title),
    description: rt(e.description),
    questions: (e.questions || []).map((q) => rt(q)),
    video1Label: e.video1Label ? rt(e.video1Label) : null,
    video1Url: e.video1Url ? rt(e.video1Url) : null,
    video2Label: e.video2Label ? rt(e.video2Label) : null,
    video2Url: e.video2Url ? rt(e.video2Url) : null,
  }))
})

const otherExperiments = computed(() => {
  void locale.value
  return tm('iport.otherExperiments').map((ex) => ({
    title: rt(ex.title),
    videoUrl: rt(ex.videoUrl),
  }))
})
</script>