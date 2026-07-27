<!--
  FaqAccordion.vue
  Ported from React FaqAccordion. Single-open accordion, first item
  optionally expanded by default.
-->
<template>
  <div class="mx-auto max-w-3xl">
    <span
      v-if="eyebrow"
      class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-plum"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      {{ eyebrow }}
    </span>

    <div class="mt-8 divide-y divide-ink/10 border-y border-ink/10">
      <div v-for="(item, i) in items" :key="item.question">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          :aria-expanded="openIndex === i"
          @click="toggle(i)"
        >
          <span class="font-display text-base font-semibold text-ink sm:text-lg">
            {{ item.question }}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            class="shrink-0 text-plum transition-transform"
            :class="{ 'rotate-180': openIndex === i }"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <p v-if="openIndex === i" class="pb-5 font-body text-sm leading-relaxed text-ink/65 sm:text-base">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FaqItem {
  question: string;
  answer: string;
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    items: FaqItem[];
    openFirst?: boolean;
  }>(),
  { eyebrow: "", openFirst: true }
);

const openIndex = ref<number | null>(props.openFirst ? 0 : null);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>
