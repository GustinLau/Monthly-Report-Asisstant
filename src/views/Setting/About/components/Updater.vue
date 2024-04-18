<template>
  <el-button class='update-check' size='large' :loading='checking' @click='checkUpdate'>
    {{ checking ? $t('about.updater.checking') : $t('about.version_update') }}
  </el-button>
  <el-dialog
    v-model="updateModalVisible"
    :title="downloading? $t('about.updater.downloading') : $t('about.updater.discover_new_version')"
    :close-on-click-modal="false"
    @close="handleUpdateModalClose"
  >
    <template v-if="updateModalVisible && !downloading">
      <el-descriptions :column="1">
        <el-descriptions-item :label="$t('about.updater.latest_version')">
          {{ releaseInfo.version }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('about.updater.file_size')">
          {{ formatBytes(releaseInfo.fileSize) }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('about.updater.update_time')">
          {{ releaseInfo.date }}
        </el-descriptions-item>
      </el-descriptions>
      <el-scrollbar max-height="128px">
        <div v-html="releaseInfo.notes"></div>
      </el-scrollbar>
    </template>
    <template v-else>
      <el-progress :text-inside="true" :stroke-width="26" :percentage="downloadProgress" />
      <p style="text-align: right">{{ speed }}/s</p>
    </template>
    <template v-if="updateModalVisible && !downloading" #footer>
      <el-button type="info" @click="updateModalVisible = false">{{ $t('about.updater.next_time') }}</el-button>
      <el-button type="primary" @click="updateNow">{{ $t('about.updater.update_now') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { useElectron } from '@/hooks/electron/useElectron'
import { $t } from '@/locales'
import { ElMessageBox, ElNotification } from 'element-plus'
import { round, startCase } from 'lodash'
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'
import dayjs from 'dayjs'

const electron = useElectron()
const checking = ref(false)
const downloading = ref(false)
const updateModalVisible = ref(false)
const downloadProgress = ref(0)
const speed = ref(formatBytes(0))

const releaseInfo = reactive({
  notes: '',
  date: '',
  version: '',
  fileSize: 0
})

function setupListeners() {
  electron.ipcRenderer.on('update-checking', () => {
    checking.value = true
  })
  electron.ipcRenderer.on('update-error', () => {
    ElNotification({
      showClose: true,
      message: $t('about.updater.update_error'),
      type: 'error',
      offset: 28
    })
    checking.value = false
  })
  electron.ipcRenderer.on('update-not-available', () => {
    checking.value = false
    ElNotification({
      showClose: true,
      message: $t('about.updater.already_up_to_date'),
      type: 'success',
      offset: 28
    })
  })
  electron.ipcRenderer.on('update-available', (e, info) => {
    checking.value = false
    releaseInfo.date = dayjs(info.releaseDate).format('YYYY-MM-DD HH:mm:ss')
    releaseInfo.notes = info.releaseNotes.replace(/</g, '&lt;').replace(/\n/g, '<br>')
    releaseInfo.version = info.version
    releaseInfo.fileSize = info.files[0]?.size
    updateModalVisible.value = true
  })
  electron.ipcRenderer.on('update-download-progress', (e, progress) => {
    downloadProgress.value = round(progress.percent, 2)
    speed.value = formatBytes(progress.bytesPerSecond)
  })
  electron.ipcRenderer.on('update-downloaded', () => {
    downloading.value = false
    updateModalVisible.value = false
    ElMessageBox.confirm(
      $t('about.updater.update_confirm_text'),
      startCase($t('about.updater.update_confirm')),
      { type: 'success' }
    )
      .then(() => electron.ipcRenderer.send('install-now'))
      .catch(() => null)
  })
  electron.ipcRenderer.on('download-canceled', () => {
    downloading.value = false
  })
}

function removeListeners() {
  electron.ipcRenderer.removeAllListeners('update-checking')
  electron.ipcRenderer.removeAllListeners('update-error')
  electron.ipcRenderer.removeAllListeners('update-not-available')
  electron.ipcRenderer.removeAllListeners('update-available')
  electron.ipcRenderer.removeAllListeners('update-download-progress')
  electron.ipcRenderer.removeAllListeners('update-downloaded')
  electron.ipcRenderer.removeAllListeners('download-canceled')
}

onBeforeMount(setupListeners)
onBeforeUnmount(removeListeners)

function checkUpdate() {
  checking.value = true
  electron.ipcRenderer.send('check-update')
}

function updateNow() {
  electron.ipcRenderer.send('start-download')
  downloading.value = true
}

function handleUpdateModalClose() {
  updateModalVisible.value = false
  if (downloading.value) {
    electron.ipcRenderer.send('cancel-download')
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formatted = round((bytes / Math.pow(k, i)), 2).toFixed(2)
  return `${formatted} ${sizes[i]}`
}

</script>

<style scoped lang='scss'>

.update-check {
  margin-top: 24px;
  width: 480px;
}

</style>