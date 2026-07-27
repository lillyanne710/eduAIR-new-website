<!--
  PartnerLogos.vue
  Ported from React PartnerLogos (src/components/PartnerLogos.tsx).
  Centered eyebrow/title/subtitle above a grid of monogram badges,
  with optional per-badge tilt for a staggered, organic layout.
-->
<template>
  <div class="mx-auto max-w-3xl text-center">
    <span class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-plum">
      <span class="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      {{ eyebrow }}
    </span>
    <h2 class="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
      {{ title }}
    </h2>
    <p class="mx-auto mt-3 max-w-md font-body text-[0.95rem] leading-relaxed text-ink/65">
      {{ subtitle }}
    </p>

    <div class="mt-12 grid grid-cols-2 items-start gap-x-5 gap-y-8 sm:grid-cols-5">
      <div v-for="(p, i) in partners" :key="p.name" class="group flex flex-col items-center gap-3">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full font-display text-lg font-bold text-paper shadow-[0_2px_10px_-4px_rgba(28,20,32,0.35)] transition-transform duration-200 group-hover:rotate-0 group-hover:-translate-y-1"
          :class="tilt?.[i]"
          :style="{ backgroundColor: p.color }"
        >
          {{ p.monogram }}
        </div>
        <p class="max-w-[9rem] font-body text-[0.8rem] font-medium leading-snug text-ink/70">
          {{ p.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Partner {
  monogram: string;
  name: string;
  color: string;
}

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Tailwind rotate-* classes, one per partner, for a staggered layout. */
    tilt?: string[];
    partners?: Partner[];
  }>(),
  {
    tilt: () => [],
    partners: () => [
      { monogram: "諸聖", name: "聖公會諸聖中學", color: "#7B2A6D" },
      { monogram: "新民", name: "天主教新民書院", color: "#1C1420" },
      { monogram: "禮仁", name: "孔聖堂禮仁書院", color: "#C08A2E" },
      { monogram: "三育", name: "九龍三育中學", color: "#551D4B" },
      { monogram: "瑪加利", name: "聖瑪加利男女英文中小學", color: "#2F5D4C" },
    ],
  }
);
</script>
