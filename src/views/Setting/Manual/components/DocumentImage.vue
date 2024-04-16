<template>
  <img style='width: 500px' alt='' :src='src' />
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { computed, ref, watchEffect } from 'vue'
import { useColorMode } from '@vueuse/core'

const props = defineProps({
  name: String
})

const appStore = useAppStore()
const language = computed(() => appStore.language)
const { system } = useColorMode()

const src = ref('')

watchEffect(async () => {
  const image = await import(`../images/${system.value}/${language.value}/${props.name}.png`)
  src.value = image.default
})
</script>
