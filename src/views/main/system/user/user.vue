<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>
    <div class="content">
      <my-table
        :listData="userList"
        :title="title"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import MyTable from '@/base-ui/table'
export default defineComponent({
  components: { PageSearch, MyTable },
  name: 'user',
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const title = '用户列表'
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      },
      { label: '操作', minWidth: '120', slotName: 'handle' }
    ]

    const showIndexColumn = true
    const showSelectColumn = true

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }

    return {
      searchFormConfig,
      userList,
      userCount,
      propList,
      title,
      showIndexColumn,
      showSelectColumn,
      handleSelectionChange
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  height: 100%;
}
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
