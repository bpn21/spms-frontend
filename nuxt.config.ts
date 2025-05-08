// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
  ],
  devtools: { enabled: false },
  quasar: {
    plugins: ['Notify'],
  },
  env: {
    BASE_URL : "http://localhost:8000/"
  },
   alias: {
    'class-validator': 'class-validator/cjs/index.js',
  },
  router: {
    middleware: ['admin, guest'], 
  },
  


  
})
// quasar.config file


