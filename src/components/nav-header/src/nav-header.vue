<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick">
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
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
</style>
