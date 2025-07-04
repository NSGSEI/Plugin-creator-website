//import './assets/main.css'
import './assets/testing.css'
import '../node_modules/primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false
            }
        }
    })
    .use(ToastService)
    .mount('#app')