import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronStore } from '@/hooks/electron-store/useElectronStore'
import { i18n } from '@/locales'

export const useAppStore = defineStore('app', () => {
  const { setAppConfig, getAppConfig } = useElectronStore()
  const language = ref(getAppConfig().language ?? 'zh-cn')

  function setLanguage(val) {
    language.value = val
    i18n.global.locale.value = val;
    setAppConfig({ language: val })
  }

  const theme = ref(getAppConfig().theme ?? 'system')

  function setTheme(val) {
    theme.value = val
  }

  return { language, setLanguage, theme, setTheme }
})
