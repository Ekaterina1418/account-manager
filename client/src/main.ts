import './assets/main.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import PrimeVueConfig from '@/app/plugins/PrimeVue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ToastService);
app.use(router)
app.use(PrimeVue, PrimeVueConfig)
app.mount('#app')

export default app