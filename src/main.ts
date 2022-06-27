import { createApp } from 'vue'
import { registerApp } from '@/global/index'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store/index'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
registerApp(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
