<!--
  AwardsTicker.vue
  Ported from the Framer AwardsTicker code component. Seamless infinite
  scroll: the image list is duplicated and translated exactly -50%.
-->
<template>
  <div
    class="relative w-full overflow-hidden"
    :style="{ height: `${height}px`, background: backgroundColor }"
  >
    <div
      class="pointer-events-none absolute inset-0 z-10"
      :style="{
        background: `linear-gradient(to right, ${backgroundColor} 0%, transparent 8%, transparent 92%, ${backgroundColor} 100%)`,
      }"
    />
    <div
      v-if="loopImages.length"
      class="flex h-full w-max items-center motion-safe:animate-[eduair-ticker-scroll_var(--ticker-speed)_linear_infinite]"
      :style="{ gap: `${gap}px`, '--ticker-speed': `${speed}s` }"
    >
      <img
        v-for="(src, i) in loopImages"
        :key="i"
        :src="src"
        alt=""
        class="h-[70%] w-auto shrink-0 object-contain"
      />
    </div>
    <div
      v-else
      class="flex h-full items-center justify-center font-body text-sm text-ink/40"
    >
      Add award images
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    images: string[];
    speed?: number; // seconds per full loop
    gap?: number; // px between logos
    height?: number; // px
    backgroundColor?: string;
  }>(),
  {
    speed: 24,
    gap: 64,
    height: 90,
    backgroundColor: "#FAF6EC",
  }
);

const loopImages = computed(() => [...props.images, ...props.images]);
</script>

<style scoped>
@keyframes eduair-ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
