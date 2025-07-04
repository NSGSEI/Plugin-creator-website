//import './assets/main.css'
import './assets/testing.css'
// PrimeIcons CSS已通过CDN在index.html中引入

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