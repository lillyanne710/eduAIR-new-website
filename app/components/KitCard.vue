<!--
  KitCard.vue
  Ported from React KitCard (src/components/KitCard.tsx).
  Photo panel on top, plum footer bar with name + CTA.
-->
<template>
  <div class="overflow-hidden rounded-2xl border border-ink/10">
    <div class="flex h-40 items-center justify-center bg-ink/10 sm:h-48">
      <img v-if="photoSrc" :src="photoSrc" :alt="name" class="h-full w-full object-cover" />
      <span v-else class="font-display text-3xl font-bold text-ink/15">{{ name }}</span>
    </div>
    <button
      type="button"
      class="flex w-full items-center justify-between gap-3 bg-plum px-5 py-4 text-left transition-colors hover:bg-plum-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      @click="emit('cta-click')"
    >
      <span class="font-display text-base font-semibold text-paper">{{ name }}</span>
      <span class="flex items-center gap-1 font-body text-sm font-medium text-paper/85">
        {{ ctaLabel }}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    photoSrc?: string;
    ctaLabel: string;
  }>(),
  { photoSrc: undefined }
);

const emit = defineEmits<{ (e: "cta-click"): void }>();
</script>
