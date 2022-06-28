<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>

    <div class="content">
      <div>
        <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { pathMapBreadcrumb } from '@/utils/map-menus'
export default defineComponent({
  components: { UserInfo, HyBreadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑
    const store = useStore()
    const route = useRoute()

    const breadcrumbs = computed(() => {
      const currentPath = route.path
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumb(userMenus, currentPath)
    })
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>
<style lang="less" scoped>
.el-icon {
  font-size: 30px;
  cursor: pointer;
}
.nav-header {
  display: flex;
  width: 100%;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
