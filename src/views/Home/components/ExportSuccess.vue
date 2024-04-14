<template>
  <div class='export-success'>
    <img alt='' :src='smile' />
    <h2>{{ startCase($t('home.export_success')) }}</h2>
    <el-button type='primary' :loading='exporting' @click='handleExport'>
      {{ startCase($t('home.export_files')) }}
    </el-button>
  </div>
</template>

<script setup>
import { startCase } from 'lodash'
import { $t } from '@/locales'
import smile from '@/assets/smile.svg'

defineProps({
  exporting: Boolean
})
const emits = defineEmits(['export-data'])

function handleExport() {
  emits('export-data')
}
</script>

<style scoped lang='scss'>
.export-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 128px;
    height: 128px;
    margin-top: 48px;
    margin-bottom: 28px;
    user-select: none;
    -webkit-user-drag: none;
  }
  h2 {
    user-select: none;
    margin-bottom: 28px;
  }
}
</style>