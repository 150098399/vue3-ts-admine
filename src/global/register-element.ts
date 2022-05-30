import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/dist/index.css'

import { ElButton } from 'element-plus/lib'

const components = [ElButton]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
