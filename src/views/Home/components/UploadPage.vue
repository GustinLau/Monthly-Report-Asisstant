<template>
  <div class='upload-container'>
    <el-upload
      drag
      :disabled='!allowUpload'
      :class="{'upload-disabled': !allowUpload}"
      :show-file-list='false'
      :auto-upload='false'
      accept='.csv'
      :on-change='handleFile'
    >
      <CarbonCloudUpload style='font-size: 64px;color: var(--el-color-primary)' />
      <div class='el-upload__text'>
        {{ $t('home.upload_tips') }}
      </div>
      <div class='el-upload__text_sub'>
        {{ $t('home.only_support_csv_file') }}
      </div>
    </el-upload>
  </div>
</template>

<script setup>
import CarbonCloudUpload from '~icons/carbon/cloud-upload'
import { $t } from '@/locales'
import { computed } from 'vue'
import { ElNotification } from 'element-plus'
import { useProjectStore } from '@/stores/porject'
import { useExcel } from '@/hooks/excel/useExcel'

const projectStore = useProjectStore()
const allowUpload = computed(() => !!projectStore.projectList.find(v => v.id === projectStore.currentProject))

const excel = useExcel()
const emit = defineEmits(['analyzing', 'success'])

function handleFile(file) {
  if (file.name.endsWith('.csv')) {
    emit('analyzing', true)
    excel.readExcel(file.raw.path)
      .then(analyses => {
        emit('analyzing', false)
        emit('success', analyses)
      })
      .catch(err => {
        emit('analyzing', false)
        ElNotification({
          showClose: true,
          message: err,
          type: 'error',
          offset: 28
        })
      })
  } else {
    ElNotification({
      showClose: true,
      message: $t('home.file_type_is_not_supported'),
      type: 'error',
      offset: 28
    })
  }
}
</script>

<style scoped lang='scss'>
.upload-disabled {
  :deep(.el-upload-dragger) {
    cursor: not-allowed;;
  }
}

.upload-container {
  width: 600px;
  margin-top: 64px;
  user-select: none;

  :deep(.el-upload-dragger) {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.el-upload__text {
  margin-top: 16px;
}

.el-upload__text_sub {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  margin-top: 4px;
}
</style>