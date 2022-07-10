<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="handel-btns">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary" @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  components: { HyForm },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // 表单双向绑定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 表单重置操作
    const handleResetClick = () => {
      formData.value = formOriginData
    }
    return { formData, handleResetClick }
  }
})
</script>

<style scoped>
.handel-btns {
  padding: 0 50px 20px 0;
  text-align: right;
}
</style>
