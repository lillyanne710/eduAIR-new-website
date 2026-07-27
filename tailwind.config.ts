import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      colors: {
        ink: "#1C1420",
        paper: "#FAF6EC",
        plum: {
          DEFAULT: "#7B2A6D",
          deep: "#551D4B",
          soft: "#F3E4EF",
        },
        gold: {
          DEFAULT: "#C08A2E",
          soft: "#F4E6C8",
        },
      },
    },
  },
  plugins: [],
};
