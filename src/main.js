// import 'element-plus/dist/index.css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/upload/style/css'
import 'element-plus/es/components/alert/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import { i18n } from '@/locales'

const app = createApp(App)

app.use(i18n)
// app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
