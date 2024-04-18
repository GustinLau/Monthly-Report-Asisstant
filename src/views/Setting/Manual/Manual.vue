<template>
  <el-scrollbar class='manual'>
    <ManualCN v-if="language==='zh-cn'" />
    <ManualEN v-if="language==='en-us'" />
    <div style='height: 16px;'></div>
  </el-scrollbar>
</template>

<script setup>
import DocumentImage from './components/DocumentImage.vue'
import { VueComponentWith as ManualCNWith } from './docs/manual-cn.md'
import { VueComponentWith as ManualENWith } from './docs/manual-en.md'
import CarbonSettings from '~icons/carbon/settings'
import CarbonArrowRight from '~icons/carbon/arrow-right'
import CarbonCheckmarkFilled from '~icons/carbon/checkmark-filled'
import CarbonCloseFilled from '~icons/carbon/close-filled'
import CarbonCloudUpload from '~icons/carbon/cloud-upload'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const appStore = useAppStore()
const language = computed(() => appStore.language)
const ManualCN = ManualCNWith({
  DocumentImage, CarbonSettings, CarbonArrowRight,
  CarbonCheckmarkFilled, CarbonCloseFilled, CarbonCloudUpload
})
const ManualEN = ManualENWith({
  DocumentImage, CarbonSettings, CarbonArrowRight,
  CarbonCheckmarkFilled, CarbonCloseFilled, CarbonCloudUpload
})
</script>


<style scoped lang='scss'>
.manual {
  height: calc(100% - 28px);
  margin-top: 28px;
  padding: 0 16px;

  :deep(h1) {
    margin: 20px 0;
  }

  :deep(h2) {
    margin: 18px 0;
  }

  :deep(ol) {
    padding-left: 20px;
  }

  :deep(p) {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 4px 0;
  }

  :deep(img) {
    margin: 4px 0;
  }

  :deep(.el-alert) {
    display: inline-block;
    width: auto;
    transform: scale(0.85);
  }

  :deep(.el-alert__description) {
    margin: 0;
  }

  :deep(.el-button) {
    margin: 0 4px;
    pointer-events: none;
  }

  :deep(svg) {
    color: var(--el-menu-text-color);
    margin: 0 4px;
    pointer-events: none;
  }

  :deep(.upload-container) {
    width: 500px;
    user-select: none;
  }

  :deep(.el-upload-dragger) {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: default;
    border-color: var(--el-color-primary);
  }

  :deep(.el-upload__text) {
    margin-top: 16px;
  }

  :deep(.el-upload__text_sub) {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    margin-top: 4px;
  }

}
</style>