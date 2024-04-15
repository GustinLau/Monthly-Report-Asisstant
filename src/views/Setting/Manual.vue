<template>
  <el-scrollbar class='manual'>
    <VueComponent />
  </el-scrollbar>
</template>

<script setup>
import { VueComponent } from '@/docs/manual.md'
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