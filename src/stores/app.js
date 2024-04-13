import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronStore } from '@/hooks/electron-store/useElectronStore'
import { i18n } from '@/locales'
import { useElectron } from "@/hooks/electron/useElectron";

export const useAppStore = defineStore('app', () => {
    const electron = useElectron()
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
        setAppConfig({ theme: val })
        electron?.ipcRenderer.send('change-theme', val)
    }

    return { language, setLanguage, theme, setTheme }
})
