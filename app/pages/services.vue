<template>
  <div class="bg-paper font-body">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-ink pb-20 pt-32">
      <img
        src="/images/services-hero.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div class="relative mx-auto max-w-4xl px-6">
        <p class="font-mono text-lg font-semibold text-plum">{{ $t('services.heroEyebrow') }}</p>
        <h1 class="mt-4 font-display text-5xl font-bold leading-tight text-plum-soft">
          {{ $t('services.heroTitle') }}
        </h1>
        <p class="mt-4 max-w-2xl font-body text-base leading-relaxed text-plum-soft/70">
          {{ $t('services.heroBody') }}
        </p>
      </div>
    </section>

    <!-- TABS + CARDS -->
    <section class="mx-auto max-w-4xl px-6 py-16">
      <div class="inline-flex gap-1 rounded-sm border border-ink/10 bg-plum-soft/40 p-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          :class="[
            'rounded-sm px-4 py-2.5 font-body text-sm font-semibold transition-colors',
            activeTab === tab.id ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink',
          ]"
          @click="activeTab = tab.id"
        >
          {{ $t(tab.labelKey) }}
        </button>
      </div>

      <!-- AI Teaching Kits -->
      <div v-if="activeTab === 'kits'" class="mt-10 grid gap-6" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))">
        <div v-for="kit in kits" :key="kit.name">
          <div class="overflow-hidden rounded-2xl border border-ink/10">
            <div class="flex aspect-[16/10] items-center justify-center overflow-hidden bg-ink/[0.08]">
              <img :src="kit.photo" :alt="kit.name" class="h-full w-full object-cover" />
            </div>
            <button
              class="flex w-full items-center justify-between gap-3 bg-plum px-5 py-4 text-left"
            >
              <span class="font-display text-base font-bold text-paper">{{ kit.name }}</span>
              <span class="flex items-center gap-1.5 font-body text-sm text-paper/85">
                {{ $t('services.learnMore') }} ↗
              </span>
            </button>
          </div>
          <div class="mt-3 px-1">
            <span class="font-mono text-xs uppercase tracking-wide text-gold">{{ kit.level }}</span>
            <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ kit.body }}</p>
          </div>
        </div>
      </div>

      <!-- School Services -->
      <div v-else-if="activeTab === 'school'" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in schoolServices" :key="item.title" class="rounded-2xl border border-ink/10 p-6">
          <h3 class="font-display text-base font-semibold text-ink">{{ item.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ item.body }}</p>
        </div>
      </div>

      <!-- Courses & Workshops -->
      <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in courses" :key="item.title" class="rounded-2xl border border-ink/10 p-6">
          <h3 class="font-display text-base font-semibold text-ink">{{ item.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ item.body }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const localePath = useLocalePath()

const { tm, rt, locale } = useI18n()
const activeTab = ref('kits')

const tabs = [
  { id: 'kits', labelKey: 'services.tabKits' },
  { id: 'school', labelKey: 'services.tabSchool' },
  { id: 'courses', labelKey: 'services.tabCourses' },
]

// Real photos from the Framer export — same across every language, so kept
// as plain data here rather than round-tripped through i18n.
const kitPhotos = {
  iCar: '/images/iCar.jpg',
  iPort: '/images/iPort.jpg',
  iShare: '/images/iShare.jpg',
  iTrain: '/images/iTrain.png',
}

const kits = computed(() => {
  void locale.value
  return tm('services.kits').map((kit) => ({
    name: rt(kit.name),
    level: rt(kit.level),
    body: rt(kit.body),
    photo: kitPhotos[rt(kit.name)],
  }))
})

const schoolServices = computed(() => {
  void locale.value
  return tm('services.schoolServices').map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  }))
})

const courses = computed(() => {
  void locale.value
  return tm('services.courses').map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  }))
})
</script>