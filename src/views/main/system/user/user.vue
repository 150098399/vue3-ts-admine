<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="user"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
export default defineComponent({
  components: { PageSearch, PageContent },
  name: 'user',
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  height: 100%;
}
</style>
