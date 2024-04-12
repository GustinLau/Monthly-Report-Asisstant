<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { computed } from 'vue'

import { useAppStore } from '@/stores/app'
import { languages } from '@/locales'

const appStore = useAppStore()
const language = computed(() => appStore.language)
const locale = computed(() => languages[language.value].element)
</script>
