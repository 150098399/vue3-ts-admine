<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="searchFormConfig"></page-search>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
export default defineComponent({
  components: { PageSearch },
  name: 'user',
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style lang="less" scoped></style>
