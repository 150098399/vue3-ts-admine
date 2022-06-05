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
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      console.log('单独响应的config')
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET'
// })
