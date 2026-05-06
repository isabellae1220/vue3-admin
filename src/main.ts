import { createApp } from 'vue'
import '@/assets/less/index.less'
import App from './App.vue'
import router from'./router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import '@/api/mock.ts'
import api from '@/api/api'


const pinia = createPinia()
const app = createApp(App)

// 先注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$api = api

// 装插件 + 挂载放最后
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')