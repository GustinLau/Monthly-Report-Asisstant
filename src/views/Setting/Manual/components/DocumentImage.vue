<template>
  <img :style='{maxWidth}' alt='' :src='src' />
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed, ref, watchEffect } from 'vue'
import { useColorMode } from '@vueuse/core'

const props = defineProps({
  name: String,
  common: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '500px'
  }
})

const appStore = useAppStore()
const language = computed(() => appStore.language)
const { system } = useColorMode()

const src = ref('')

watchEffect(async () => {
  const image = await import(`../images/${system.value}/${props.common ? 'common' : language.value}/${props.name}.png`)
  src.value = image.default
})
</script>
