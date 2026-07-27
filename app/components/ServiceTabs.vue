<!--
  ServiceTabs.vue
  Ported from React Services.tsx tab logic. Switches between
  AI Teaching Kits (KitCard grid), School Services, and Courses & Workshops.
-->
<template>
  <div>
    <div
      class="flex w-fit gap-1 rounded-sm border border-ink/10 bg-plum-soft/40 p-1"
      role="tablist"
      aria-label="Service categories"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="active === tab.id"
        class="rounded-sm px-4 py-2.5 font-body text-sm font-semibold transition-colors"
        :class="active === tab.id ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink'"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- AI Teaching Kits -->
    <div v-if="active === 'kits'" class="mt-10 grid gap-6 sm:grid-cols-2">
      <div v-for="kit in kits" :key="kit.name">
        <KitCard
          :name="kit.name"
          :photo-src="kit.photoSrc"
          :cta-label="`${enquireLabel} ${kit.name}`"
          @cta-click="emit('kit-cta', kit.name)"
        />
        <div class="mt-4 px-1">
          <span class="font-mono text-xs uppercase tracking-wide text-gold">{{ kit.level }}</span>
          <p class="mt-2 font-body text-[0.95rem] leading-relaxed text-ink/65">{{ kit.body }}</p>
        </div>
      </div>
    </div>

    <!-- School Services -->
    <div
      v-else-if="active === 'school'"
      class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="item in schoolServices"
        :key="item.title"
        class="overflow-hidden rounded-2xl border border-ink/10"
      >
        <div class="flex aspect-[16/10] items-center justify-center bg-ink/5">
          <slot name="icon" :item="item">
            <PlaceholderIcon />
          </slot>
        </div>
        <div class="p-6">
          <h3 class="font-display text-base font-semibold leading-snug text-ink">{{ item.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ item.body }}</p>
        </div>
      </div>
    </div>

    <!-- Courses & Workshops -->
    <div v-else class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="course in courses"
        :key="course.title"
        class="overflow-hidden rounded-2xl border border-ink/10"
      >
        <div class="flex aspect-[16/10] items-center justify-center bg-plum-soft/50">
          <slot name="icon" :item="course">
            <PlaceholderIcon tint="rgba(123,42,109,0.4)" />
          </slot>
        </div>
        <div class="p-5">
          <h3 class="font-display text-base font-semibold text-ink">{{ course.title }}</h3>
          <p class="mt-2 font-body text-sm leading-relaxed text-ink/65">{{ course.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KitCard from "./KitCard.vue";

interface Kit {
  name: string;
  level: string;
  body: string;
  photoSrc?: string;
}
interface SimpleItem {
  title: string;
  body: string;
}

withDefaults(
  defineProps<{
    tabs?: { id: "kits" | "school" | "courses"; label: string }[];
    kits: Kit[];
    schoolServices: SimpleItem[];
    courses: SimpleItem[];
    enquireLabel?: string;
  }>(),
  {
    tabs: () => [
      { id: "kits", label: "AI Teaching Kits" },
      { id: "school", label: "School Services" },
      { id: "courses", label: "Courses & Workshops" },
    ],
    enquireLabel: "Enquire about",
  }
);

const emit = defineEmits<{ (e: "kit-cta", name: string): void }>();

const active = ref<"kits" | "school" | "courses">("kits");
</script>

<script lang="ts">
// Small local placeholder-icon component (image slot not yet filled).
import { defineComponent, h } from "vue";

export const PlaceholderIcon = defineComponent({
  props: { tint: { type: String, default: "rgba(28,20,32,0.2)" } },
  setup(props) {
    return () =>
      h(
        "svg",
        { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none" },
        [
          h("rect", { x: 3, y: 3, width: 18, height: 18, rx: 2, stroke: props.tint, "stroke-width": 1.5 }),
          h("circle", { cx: 8.5, cy: 8.5, r: 1.5, fill: props.tint }),
          h("path", {
            d: "M21 15l-5-5-9 9",
            stroke: props.tint,
            "stroke-width": 1.5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          }),
        ]
      );
  },
});
</script>
