<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
      v-model:page="pageInfo"
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

      <!-- 动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
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
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }

    // 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (
          item.slotName === 'status' ||
          item.slotName === 'createAt' ||
          item.slotName === 'updateAt' ||
          item.slotName === 'handle'
        ) {
          return false
        } else {
          return true
        }
      }
    )
    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      handleSelectionChange,
      getPageData
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
