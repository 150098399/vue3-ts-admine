<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>

    <div class="content">
      <div>面包屑</div>
      <div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
export default defineComponent({
  components: { UserInfo },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
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
