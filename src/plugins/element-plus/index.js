import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/alert/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/config-provider/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/divider/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/link/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/radio-group/style/css'
import 'element-plus/es/components/scrollbar/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/step/style/css'
import 'element-plus/es/components/steps/style/css'
import 'element-plus/es/components/sub-menu/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'
import 'element-plus/es/components/upload/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/descriptions/style/css'
import 'element-plus/es/components/descriptions-item/style/css'
import 'element-plus/es/components/progress/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import {
  ElAlert,
  ElButton,
  ElConfigProvider,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElRadioButton,
  ElRadioGroup,
  ElScrollbar,
  ElSelect,
  ElStep,
  ElSteps,
  ElSubMenu,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElUpload,
  ElLoading,
  ElDescriptions,
  ElDescriptionsItem,
  ElProgress
} from 'element-plus'

const components = [
  ElAlert,
  ElButton,
  ElConfigProvider,
  ElDialog,
  ElDivider,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElRadioButton,
  ElRadioGroup,
  ElScrollbar,
  ElSelect,
  ElStep,
  ElSteps,
  ElSubMenu,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElUpload,
  ElDescriptions,
  ElDescriptionsItem,
  ElProgress
]

const directives = {
  loading: ElLoading.directive
}
// console.log(ElLoadingDirective)

export default {
  install(app) {
    // 注册全局组件
    components.forEach(component => app.component(component.name, component))
    Object.keys(directives).forEach(directive => app.directive(directive, directives[directive]))
  }
}