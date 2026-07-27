# EduAIR Website — Vue/Nuxt Migration

A rebuild of the EduAIR marketing site (originally designed in Framer) using
Nuxt 4 and Vue 3. This replaces the previous Framer-based site with a
proper, maintainable codebase supporting trilingual content
(English / Traditional Chinese / Simplified Chinese).

## Stack

- **Nuxt 4** (Vue 3, file-based routing)
- **Tailwind CSS** (`@nuxtjs/tailwindcss`)
- **@nuxtjs/i18n** for EN / 繁 / 简 support
- **EmailJS** for the Contact page form (no custom backend)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
app/
  app.vue              Root layout — Nav + <NuxtPage /> + Footer
  components/
    Nav.vue            Floating pill nav, Services dropdown, language switch
    Footer.vue          Site-wide footer
    LanguageSwitch.vue   EN/繁/简 toggle, used in Nav
    FaqAccordion.vue     Reusable single-open accordion (Contact, Resources)
    KitCard.vue          Photo + CTA bar card (used for iCar/iPort/iShare)
    PartnerLogos.vue     Monogram badge grid
    AwardsTicker.vue     Infinite-scroll logo strip
  pages/
    index.vue                    Homepage
    about-us.vue
    services.vue                 AI Teaching Kits / School Services / Courses tabs
    contact.vue                  Real EmailJS-wired contact form
    resources.vue                Downloads, articles, FAQ
    success-stories.vue
    icar.vue / iport.vue / ishare.vue
    news-and-events/
      index.vue          Listing page, sourced from data/newsEvents.js
      [id].vue            Detail page — gallery, content, "next article" link

data/
  newsEvents.js         Single source of truth for all news events —
                        media + en/zh-Hant/zh-Hans content per event.
                        See "Adding a news event" below.

i18n/
  locales/
    en.json
    zh-Hant.json
    zh-Hans.json
```

## Important conventions

### Nuxt 4's `app/` directory

Components, pages, and `app.vue` must live **inside** `app/`. Only
config-level files (`nuxt.config.ts`, `tailwind.config.ts`,
`package.json`, `data/`, `i18n/locales/`) sit at the project root.
Putting a component in the wrong place is the most common cause of
"Failed to resolve component" or a page silently not rendering.

### Translations: `$t()` vs `$tm()` + `$rt()`

- `$t('key')` — a single string.
- For **arrays/objects** of translated content (e.g. a list of FAQ
  questions, or the homepage's kit cards), use `tm('key')` from
  `useI18n()`, then run each string field through `rt()` before
  rendering it. `tm()` alone returns pre-compiled message objects, not
  plain text — this is a real quirk of the i18n module, not a bug in
  this codebase.

```js
const { tm, rt, locale } = useI18n()
const items = computed(() => {
  void locale.value // forces recompute when the language changes
  return tm('some.array').map((item) => ({
    title: rt(item.title),
    body: rt(item.body),
  }))
})
```

### Navigation must use `localePath()`

Every `<NuxtLink :to="...">` should wrap its path in `localePath()`:

```vue
<NuxtLink :to="localePath('/contact')">...</NuxtLink>
```

Plain paths always resolve to the **default locale** (Traditional
Chinese) regardless of what language the visitor is currently browsing
in — forgetting `localePath()` is the most common cause of the
language silently resetting when someone clicks a link.

### Keeping the three locale files in sync

Every page pulls its text from `i18n/locales/{en,zh-Hant,zh-Hans}.json`.
A key present in one file but missing in another **will crash that
page**, not silently fall back. When adding new translatable text,
add the key to all three files at the same time.

Traditional Chinese is written first as original copy; Simplified
Chinese should be a **script conversion** of the Traditional text
(e.g. via OpenCC), not a fresh translation from English — this keeps
phrasing between the two Chinese versions consistent.

## Adding a news event

Add one object to `data/newsEvents.js`:

```js
{
  id: 56,
  date: "2026-07-01", // ISO format, used for sorting
  media: {
    type: "image", // or "video"
    thumbnail: "/event/event56/1.jpg",
    gallery: ["/event/event56/1.jpg", "/event/event56/2.jpg"],
  },
  layout: "default", // or a custom value if this event needs a bespoke page
  en: { title: "...", subtitle: "", location: "...", content: ["paragraph one", "paragraph two"] },
  "zh-Hant": { title: "...", subtitle: "", location: "...", content: [...] },
  "zh-Hans": { title: "...", subtitle: "", location: "...", content: [...] },
},
```

Media files go in `public/event/event{id}/`, matching the paths used
above — no separate manifest or filesystem probing needed (unlike the
old site's system).

## Known gaps / not yet built

- **iTrain page** — linked from the nav's Services dropdown, no page yet
- **Funding/grant pages** (real content exists in the original site's
  locale data — `fund`, `fund1`, `fund2` sections — not yet built here)
- **Summer courses page/section** — real content exists (`summerCourses`
  section), not yet built here
- **Media coverage page** — 10 real press articles exist in source data,
  not yet built here
- **Privacy Policy / Terms pages** — real privacy policy text exists in
  source data, not yet wired up
- Event `id: 13` in `newsEvents.js` is flagged `layout: "custom-13"` but
  the actual custom layout logic (matching the old site's bespoke page
  for this event) hasn't been built yet — it currently renders through
  the generic template regardless of that flag

## Environment variables

The Contact form currently has EmailJS credentials hardcoded directly
in `contact.vue`. Before this goes further (especially before making
the repo public), move these into `.env` and `runtimeConfig` instead.
