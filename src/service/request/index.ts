import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
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
        // 关闭loading

        this.loading?.close()
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

    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)

      // loading恢复初始值
      this.showLoading = true
    })
  }
}

export default HYRequest
