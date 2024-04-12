import { createI18n } from 'vue-i18n'
import locale from './locale'

import { useElectronStore } from '@/hooks/electron-store/useElectronStore'
import { mapValues } from 'lodash'

const { getAppConfig } = useElectronStore()

const _i18n = createI18n({
  locale: getAppConfig().language ?? 'zh-cn',
  fallbackLocale: 'en-us',
  messages: mapValues(locale, (value) => value.system),
  legacy: false
})

export const languageOptions = Object.keys(locale).map((key => ({ value: key, name: locale[key].name })))

export const languages = locale

export const i18n = _i18n

export const $t = _i18n.global.t

