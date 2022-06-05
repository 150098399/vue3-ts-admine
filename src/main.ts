import { createApp } from 'vue'
import { registerApp } from '@/global/index'

import App from './App.vue'
import router from './router'
import store from './store'
import hyRequest from './service'

const app = createApp(App)
registerApp(app)

app.use(store).use(router).mount('#app')

hyRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
console.log(process.env.BASE_URL)
