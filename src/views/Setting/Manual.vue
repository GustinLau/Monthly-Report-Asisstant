<template>
  <el-scrollbar class='manual'>
    <ManualCN v-if="language==='zh-cn'"/>
    <ManualEN v-if="language==='en-us'"/>
  </el-scrollbar>
</template>

<script setup>
import { VueComponent as ManualCN } from '@/docs/manual-cn.md'
import { VueComponent as ManualEN } from '@/docs/manual-en.md'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const appStore = useAppStore()
const language = computed(() => appStore.language)
</script>


<style scoped lang='scss'>
.manual {
  height: calc(100% - 28px);
  margin-top: 28px;
  padding: 0 16px;

  :deep(p) {
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  :deep(.el-button) {
    margin: 0 4px;
    pointer-events: none;
  }
}
</style>