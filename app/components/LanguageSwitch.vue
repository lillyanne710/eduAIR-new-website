<template>
  <div class="flex items-center gap-0.5 rounded-full border border-ink/10 bg-plum-soft/40 p-0.5">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="rounded-full px-2.5 py-1.5 font-mono text-xs font-medium transition-colors"
      :class="locale === loc.code ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink'"
      @click="setLocale(loc.code)"
    >
      {{ loc.name }}
    </button>
  </div>
</template>

<script setup>
// useI18n() is auto-imported by the @nuxtjs/i18n module — no import line needed.
const { locales, locale, setLocale } = useI18n()
</script>