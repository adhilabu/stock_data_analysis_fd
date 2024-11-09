// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/products': { swr: true },
    '/products/**': { swr: 3600 },
    '/blog': { isr: 3600 },
    '/blog/**': { isr: true },
    '/admin/**': { ssr: false },
    '/api/**': { cors: true },
    '/old-page': { redirect: '/new-page' },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxthq/studio'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      backendApiBaseUrl: process.env.BACKEND_API || 'http://127.0.0.1:8000',
      taipyApiBaseUrl: process.env.TAIPY_API || 'http://127.0.0.1:5000',
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5321510867132090",
          async: true,
          crossorigin: "anonymous",
        },
      ],
    },
  },
})
