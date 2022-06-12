<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div>
      <el-tabs type="border-card" stretch>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><User /></el-icon>
              <span>账号登录</span>
            </span>
          </template>
          <login-account></login-account>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon :size="15"><iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <h2>手机登录</h2>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: { LoginAccount },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
}
</style>
