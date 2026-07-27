<template>
  <div class="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
    <header
      class="grid w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full border border-ink/10 bg-[#EEEBE2] px-3 py-2 shadow-sm"
    >
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2">
        <img
          src="https://framerusercontent.com/images/twxwU4IHqArB3RzO6dTkCMwqrU.png"
          alt="EduAIR"
          class="h-7 w-14 rounded-xl object-cover gap-x-6 gap-y-2"
        />
      </NuxtLink>

      <!-- Desktop nav links -->
      <nav class="hidden items-center justify-center gap-1 lg:flex">
        <template v-for="item in navItems" :key="item.path">
          <!-- Plain link -->
          <NuxtLink
            v-if="!item.children"
            :to="localePath(item.path)"
            class="rounded-full px-3 py-2 font-display text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            active-class="text-plum font-semibold"
          >
            {{ $t(item.labelKey) }}
          </NuxtLink>

          <!-- Dropdown trigger -->
          <div
            v-else
            class="relative"
            @mouseenter="openDropdown = item.path"
            @mouseleave="openDropdown = null"
          >
            <button
              class="flex items-center gap-1 rounded-full px-3 py-2 font-display text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              :class="{ 'text-plum font-semibold': openDropdown === item.path }"
            >
              {{ $t(item.labelKey) }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" :class="{ 'rotate-180': openDropdown === item.path }" class="transition-transform">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div
              v-if="openDropdown === item.path"
              class="absolute left-0 top-full pt-2"
            >
              <div class="w-44 rounded-2xl border border-ink/10 bg-paper p-2 shadow-lg">
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.path"
                  :to="localePath(child.path)"
                  class="block rounded-xl px-3 py-2.5 font-display text-sm font-medium text-ink/80 hover:bg-plum-soft/40 hover:text-plum"
                >
                  {{ child.labelKey ? $t(child.labelKey) : child.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <LanguageSwitch />
        <NuxtLink
          :to="localePath('/contact')"
          class="whitespace-nowrap rounded-full bg-gold px-5 py-2 font-display text-sm font-semibold text-ink"
        >
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>

      <!-- Mobile: language switch + menu toggle -->
      <div class="flex items-center gap-2 lg:hidden">
        <LanguageSwitch />
        <button
          class="grid h-10 w-10 place-items-center rounded-full"
          @click="open = !open"
        >
          <span v-if="!open">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </header>

    <!-- Mobile menu -->
    <nav v-if="open" class="mx-auto mt-2 max-w-4xl rounded-2xl border border-ink/10 bg-paper px-4 py-3 lg:hidden">
      <ul class="flex flex-col gap-1">
        <li v-for="item in navItems" :key="item.path">
          <!-- Plain link -->
          <NuxtLink
            v-if="!item.children"
            :to="localePath(item.path)"
            class="block rounded-xl px-3 py-3 font-display text-base font-medium text-ink/80"
            active-class="bg-plum-soft text-plum"
            @click="open = false"
          >
            {{ $t(item.labelKey) }}
          </NuxtLink>

          <!-- Expandable group -->
          <div v-else>
            <button
              class="flex w-full items-center justify-between rounded-xl px-3 py-3 font-display text-base font-medium text-ink/80"
              @click="mobileServicesOpen = !mobileServicesOpen"
            >
              {{ $t(item.labelKey) }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" :class="{ 'rotate-180': mobileServicesOpen }" class="transition-transform">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div v-if="mobileServicesOpen" class="ml-3 flex flex-col gap-1 border-l border-ink/10 pl-3">
              <NuxtLink
                v-for="child in item.children"
                :key="child.path"
                :to="localePath(child.path)"
                class="block rounded-xl px-3 py-2.5 font-display text-sm text-ink/70"
                @click="open = false"
              >
                {{ child.labelKey ? $t(child.labelKey) : child.label }}
              </NuxtLink>
            </div>
          </div>
        </li>
        <li class="pt-2">
          <NuxtLink
            :to="localePath('/contact')"
            class="block rounded-full bg-gold px-4 py-3 text-center font-display text-sm font-semibold text-ink"
            @click="open = false"
          >
            {{ $t('nav.contact') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const openDropdown = ref(null) // desktop: which nav item's dropdown is open
const mobileServicesOpen = ref(false)
const localePath = useLocalePath() // auto-imported by @nuxtjs/i18n

// Matches the real nav order from the Framer site: About, Services,
// News & Events, Success Stories, Resource Hub. "Services" has a dropdown
// of View All Services + the individual kit pages instead of a single link.
const navItems = [
  { path: '/about-us', labelKey: 'nav.about' },
  {
    path: '/services',
    labelKey: 'nav.services',
    children: [
      { path: '/services', labelKey: 'nav.viewAll' },
      { path: '/icar', label: 'iCar' },
      { path: '/iport', label: 'iPort' },
      { path: '/ishare', label: 'iShare' }
    ],
  },
  { path: '/news-and-events', labelKey: 'nav.news' },
  { path: '/success-stories', labelKey: 'nav.success' },
  { path: '/resources', labelKey: 'nav.resources' },
]
</script>