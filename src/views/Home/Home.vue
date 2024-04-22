<template>
  <div v-loading='loading' class='home'>
    <el-steps :active='activeIndex' process-status='finish' finish-status='success' align-center>
      <el-step
        :title="startCase($t('home.upload'))"
        :class="{'allow-click': activeIndex > 0}"
        @click='toStep(0)'
      >
        <template #icon>
          <CarbonCloudUpload style='font-size: 24px' />
        </template>
      </el-step>
      <el-step
        :title="startCase($t('home.statisticians'))"
        :class="{'allow-click': activeIndex > 1}"
        @click='toStep(1)'
      >
        <template #icon>
          <Dashboard style='font-size: 24px' />
        </template>
      </el-step>
      <el-step :title="startCase($t('home.export'))">
        <template #icon>
          <CarbonCloudDownload style='font-size: 24px' />
        </template>
      </el-step>
    </el-steps>

    <project-config-status :step='activeIndex'/>

    <upload-page v-show='activeIndex === 0' @analyzing='handleAnalyzing' @success='handleAnalyzeSuccess' />

    <data-review v-show='activeIndex === 1' :exporting='exporting' :data='analyses' @export-data='exportData' />

    <export-success v-show='activeIndex >= 2' :exporting='exporting' @export-data='exportData' />

  </div>
</template>
<script setup>
import CarbonCloudUpload from '~icons/carbon/cloud-upload'
import Dashboard from '~icons/carbon/dashboard'
import CarbonCloudDownload from '~icons/carbon/cloud-download'

import { ref, watchEffect } from 'vue'
import { $t } from '@/locales'
import { startCase } from 'lodash'
import ProjectConfigStatus from '@/views/Home/components/ProjectConfigStatus.vue'
import UploadPage from '@/views/Home/components/UploadPage.vue'
import DataReview from '@/views/Home/components/DataReview.vue'
import { useExcel } from '@/hooks/excel/useExcel'
import { useProjectStore } from '@/stores/porject'
import { ElNotification } from 'element-plus'
import { useElectron } from '@/hooks/electron/useElectron'
import ExportSuccess from '@/views/Home/components/ExportSuccess.vue'

const activeIndex = ref(0)
const analyses = ref([])
const loading = ref(false)
const exporting = ref(false)

const excel = useExcel()
const electron = useElectron()
const projectStore = useProjectStore()

let exportBuffer = null
let exportName = null


function handleAnalyzing(status) {
  loading.value = status
}

function handleAnalyzeSuccess(data) {
  analyses.value = data
  activeIndex.value = 1
}

function toStep(index) {
  if (index < activeIndex.value) {
    activeIndex.value = index
  }
}

watchEffect(() => {
  if (activeIndex.value === 0) {
    exportBuffer = null
    exportName = null
  }
})

function exportData() {
  exporting.value = true
  new Promise((resolve, reject) => {
    if (!exportBuffer || !exportName) {
      const project = projectStore.projectList.find(v => v.id === projectStore.currentProject)
      excel.exportBuffer(project, analyses.value)
        .then(({ name, buffer }) => {
          exportName = name
          exportBuffer = buffer
          resolve()
        })
        .catch(reject)
    } else {
      resolve()
    }
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        electron.ipcRenderer.once('save-path-selected', async (event, res) => {
          try {
            if (!res.canceled) {
              await electron.util.promisify(electron.fs.writeFile)(res.filePath, exportBuffer)
            }
            resolve(!res.canceled)
          } catch {
            reject()
          }
        })
        electron.ipcRenderer.send('open-save-dialog', exportName)
      })
    })
    .then((notify) => {
      if (notify) {
        ElNotification({
          showClose: true,
          message: startCase($t('home.export_success')),
          type: 'success',
          offset: 28
        })
        activeIndex.value = 3
      }
    })
    .catch((e) => {
      console.error(e)
      ElNotification({
        showClose: true,
        message: startCase($t('home.export_fail')),
        type: 'error',
        offset: 28
      })
    })
    .finally(() => {
      exporting.value = false
    })
}

</script>

<style lang='scss' scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-steps {
    margin-top: 44px;
    width: 600px;
    user-select: none;

    .allow-click {
      cursor: pointer;
    }

    :deep(.el-step__icon) {
      background: var(--color-background);
    }
  }
}
</style>