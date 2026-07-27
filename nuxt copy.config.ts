// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
  locales: [
    { code: 'zh-Hant', name: '繁', file: 'zh-Hant.json' },
    { code: 'zh-Hans', name: '简', file: 'zh-Hans.json' },
    { code: 'en', name: 'EN', file: 'en.json' },
  ],
  defaultLocale: 'zh-Hant',
  langDir: 'locales/',
},
})