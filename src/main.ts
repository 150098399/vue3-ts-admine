import { createApp } from 'vue'
import { registerApp } from '@/global/index'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import hyRequest from './service'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
registerApp(app)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     requestInterceptorCatch: (err) => {
//       return err
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的config')
//       return res
//     },
//     responseInterceptorCatch: (err) => {
//       return err
//     }
//   }
// })

interface DataType {
  url: any
  returnCode: string
  success: boolean
}

hyRequest
  .get<DataType>({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
