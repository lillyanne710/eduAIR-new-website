<template>
  <footer class="bg-ink text-paper/70">
    <div class="mx-auto max-w-6xl px-6 py-14">
      <div class="grid gap-10 md:grid-cols-4">
        <!-- Logo + tagline -->
        <div>
          <img
            src="https://framerusercontent.com/images/twxwU4IHqArB3RzO6dTkCMwqrU.png"
            alt="EduAIR"
            class="h-14 w-14 rounded-xl object-cover"
          />
          <p class="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/60">
            {{ $t('footer.tagline') }}
          </p>
        </div>

        <!-- Explore links -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            {{ $t('footer.exploreTitle') }}
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in exploreLinks" :key="item.path">
              <NuxtLink :to="localePath(item.path)" class="font-body text-sm text-paper/70 hover:text-paper">
                {{ $t(item.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            {{ $t('footer.servicesTitle') }}
          </h3>
          <ul class="mt-4 space-y-2.5 font-body text-sm text-paper/70">
            <li v-for="(service, i) in $tm('footer.services')" :key="i">
              {{ $rt(service) }}
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            {{ $t('footer.contactTitle') }}
          </h3>
          <ul class="mt-4 space-y-2.5 font-body text-sm text-paper/70">
            <li>
              <a href="tel:+85264373924" class="hover:text-paper">+852 6437 3924</a>
            </li>
            <li>Room 237, 2/F, Building 16W</li>
            <li>Hong Kong Science Park</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-paper/10 pt-6 font-body text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
        <p>{{ $t('footer.copyright', { year: currentYear }) }}</p>
        <div class="flex gap-5">
          <button class="hover:text-paper/70">{{ $t('footer.privacy') }}</button>
          <button class="hover:text-paper/70">{{ $t('footer.terms') }}</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()

const exploreLinks = [
  { path: '/about-us', labelKey: 'nav.about' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/news-and-events', labelKey: 'nav.news' },
  { path: '/success-stories', labelKey: 'nav.success' },
  { path: '/resources', labelKey: 'nav.resources' },
  { path: '/contact', labelKey: 'nav.contact' },
]
</script>