// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  devtools: { enabled: true },
  modules: [['@nuxtjs/eslint-module', { fix: true }], '@vueuse/nuxt', '@nuxtjs/i18n', '@nuxt/ui', '@pinia/nuxt'],
});
