<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default defineComponent({
  components: {},
  setup() {
    return { zhCn }
  }
})
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
