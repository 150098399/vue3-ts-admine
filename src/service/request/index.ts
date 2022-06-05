import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例拦截请求,成功')
        return config
      },
      (err) => {
        console.log('所有实例拦截请求,失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例拦截响应,成功')
        return res
      },
      (err) => {
        console.log('所有实例拦截响应,失败')
        return err
      }
    )
  }

  request(config: HYRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default HYRequest
