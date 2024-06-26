import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from '@/plugins/element-plus'
import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'

const app = createApp(App)

app.use(i18n)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
