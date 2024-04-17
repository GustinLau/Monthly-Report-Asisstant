<template>
  <el-button class='update-check' size='large' :loading='checking' @click='checkUpdate'>
    {{ checking ? $t('about.updater.checking') : $t('about.version_update') }}
  </el-button>
</template>

<script setup>
import { useElectron } from '@/hooks/electron/useElectron'
import { $t } from '@/locales'
import { ElMessageBox, ElNotification } from 'element-plus'
import { startCase } from 'lodash'
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'
import dayjs from 'dayjs'

const electron = useElectron()
const checking = ref(false)
const downloading = ref(false)
const updateModalVisible = ref(false)
const downloadProgress = ref(0)

const releaseInfo = reactive({
  notes: '',
  date: '',
  version: ''
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
    releaseInfo.notes = info.releaseNotes
    releaseInfo.version = info.version
    // TODO
    console.log(releaseInfo)
  })
  electron.ipcRenderer.on('update-download-progress', (e, progress) => {
    downloadProgress.value = progress.percent
  })
  electron.ipcRenderer.on('update-downloaded', () => {
    downloading.value = false
    updateModalVisible.value = false
    ElMessageBox.confirm(
      $t('about.updater.update_confirm_text'),
      startCase($t('about.updater.update_confirm')),
      { type: 'success' }
    )
      .then(() => electron.ipcRenderer.send('update-now'))
      .catch(() => null)
  })
}

function removeListeners() {
  electron.ipcRenderer.removeAllListeners('update-checking')
  electron.ipcRenderer.removeAllListeners('update-error')
  electron.ipcRenderer.removeAllListeners('update-not-available')
  electron.ipcRenderer.removeAllListeners('update-available')
  electron.ipcRenderer.removeAllListeners('update-download-progress')
  electron.ipcRenderer.removeAllListeners('update-downloaded')
}

onBeforeMount(setupListeners)
onBeforeUnmount(removeListeners)

function checkUpdate() {
  electron.ipcRenderer.send('check-update')
}


</script>

<style scoped lang='scss'>

.update-check {
  margin-top: 24px;
  width: 480px;
}

</style>