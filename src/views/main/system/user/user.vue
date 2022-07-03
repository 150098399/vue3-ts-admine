<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
export default defineComponent({
  components: { PageSearch },
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
    return { searchFormConfig }
  }
})
</script>

<style lang="less" scoped></style>
