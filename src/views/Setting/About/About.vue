<template>
  <div class='about'>
    <img class='logo' :src='Logo' alt=''>
    <div class='main-info'>
      <div>{{ $t('system.title') }}</div>
      <div>V{{ version }}</div>
    </div>
    <div class='sub-info'>
      <div>{{ $t('about.compile_time') }}：{{ BUILD_TIME }}</div>
    </div>
    <Updater />
    <p class='op'>
      <el-link :underline='false' @click='aboutAuthor'>{{ $t('about.author') }}</el-link>
      <el-divider direction='vertical' />
      <el-link :underline='false' @click='feedback'>{{ $t('about.feedback') }}</el-link>
      <el-divider direction='vertical' />
      <el-link :underline='false' @click='openManual'>{{ $t('about.manual') }}</el-link>
    </p>
    <p class='copyright'>Copyright &copy; {{ CopyrightYear }} {{ author }}, All Right Reserved</p>
  </div>
</template>

<script setup>
import Logo from '@/assets/logo.svg'
import packageInfo from '../../../../package.json'
import { computed } from 'vue'
import { useElectron } from '@/hooks/electron/useElectron'
import { $t } from '@/locales'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import Updater from '@/views/Setting/About/components/Updater.vue'

/* global __BUILD_TIME__ */
const BUILD_TIME = __BUILD_TIME__

const CopyrightYear = computed(() => dayjs().year() === 2024 ? '2024' : `2024 - ${dayjs().year()}`)
const version = computed(() => packageInfo.version)
const author = computed(() => packageInfo.author)

const { shell } = useElectron()
const router = useRouter()

function aboutAuthor() {
  shell.openExternal('https://github.com/GustinLau')
}

function feedback() {
  shell.openExternal('https://github.com/GustinLau/Monthly-Report-Asisstant/issues')
}

function openManual() {
  router.push({ name: 'Manual' })
}
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  user-select: none;
}

.logo {
  width: 148px;
  margin-top: 64px;
}

.main-info {
  font-size: 24px;
  margin: 16px 0 6px 0;
  text-align: center;
}

.sub-info {
  font-size: 12px;
  color: #aaa;
  margin: 6px 0;
  text-align: center;
}

.op {
  margin-top: 16px;
}

.copyright {
  color: #aaa;
  font-size: 12px;
  margin-top: auto;
  margin-bottom: 32px;
}
</style>
