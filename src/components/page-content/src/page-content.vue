<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
    >
      <!-- 头部插槽 -->
      <template #headerHandle>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 列插槽  -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable === 1 ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle>
        <div class="handle-btns">
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </div>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import MyTable from '@/base-ui/table'

export default defineComponent({
  components: { MyTable },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }
    getPageData()
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }
    return { dataList, handleSelectionChange, getPageData }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
