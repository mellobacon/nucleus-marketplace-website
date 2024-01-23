// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/default.scss', "primevue/resources/themes/saga-purple/theme.css"],
    modules: ['@nuxtjs/supabase', 'nuxt-primevue', '@vee-validate/nuxt'],
    supabase: {
        redirect: false,
    },
    primevue: {
        components: {
            prefix: 'Prime'
        }
    },
});
