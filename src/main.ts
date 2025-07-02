import './assets/main.css'
import PrimeVue from 'primevue/config'
import PrimeVueConfig from '@/app/plugins/PrimeVue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, PrimeVueConfig)
app.mount('#app')
