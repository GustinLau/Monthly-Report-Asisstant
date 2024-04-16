<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { useColorMode } from '@vueuse/core'
import { RouterView } from 'vue-router'
import { computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { languages } from '@/locales'
import { useEnhance } from '@/hooks/enhance/useEnhance'

const appStore = useAppStore()
const language = computed(() => appStore.language)
const locale = computed(() => languages[language.value].element)
const { system } = useColorMode()
watch(system, (val) => (document.querySelector('html').className = val))
useEnhance()
</script>
