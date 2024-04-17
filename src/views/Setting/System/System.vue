<template>
  <div class="title">
    <template v-if="canGoBack">
      <el-button style="line-height: 32px" text @click="closeSubPage">
        <CarbonArrowLeft style="font-size: 24px;" />
      </el-button>
    </template>
    <span>{{ title }}</span>
  </div>
  <div class="container">
    <el-form v-show="isMainPage" label-position="left" label-width="auto">
      <el-form-item :label="$t('setting.language_setting')">
        <el-select :model-value="language" @change="handleLanguageChange">
          <el-option v-for="opt in languageOptions" :key="opt.value" :value="opt.value" :label="opt.name" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('setting.theme_mode')">
        <el-radio-group :model-value="theme" @change="handleThemeChange">
          <el-radio-button :label="startCase($t('setting.theme.light'))" value="light" />
          <el-radio-button :label="startCase($t('setting.theme.dark'))" value="dark" />
          <el-radio-button :label="startCase($t('setting.theme.system'))" value="system" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('setting.project_config')">
        <el-button text @click="openProjectConfigPage">
          <CarbonArrowRight style="font-size: 18px" />
        </el-button>
      </el-form-item>
    </el-form>

    <ProjectConfig v-if="isProjectConfigPage" />
  </div>
</template>

<script setup>
import CarbonArrowLeft from '~icons/carbon/arrow-left';
import CarbonArrowRight from '~icons/carbon/arrow-right';
import { computed, reactive } from 'vue'
import { last, startCase } from 'lodash'
import ProjectConfig from '@/views/Setting/System/components/ProjectConfig.vue'
import { useAppStore } from '@/stores/app'
import { languageOptions, $t } from '@/locales'

const appStore = useAppStore()
const language = computed(() => appStore.language)

function handleLanguageChange(val) {
  appStore.setLanguage(val)
}

const theme = computed(() => appStore.theme)

function handleThemeChange(val) {
  appStore.setTheme(val)
}

const titleMap = {
  Main: () => $t('route.system_setting'),
  ProjectConfig: () => $t('setting.project_config')
}
const stack = reactive(['Main'])
const title = computed(() => titleMap[last(stack)]())
const canGoBack = computed(() => stack.length > 1)
const isMainPage = computed(() => last(stack) === 'Main')
const isProjectConfigPage = computed(() => last(stack) === 'ProjectConfig')

function openProjectConfigPage() {
  stack.push('ProjectConfig')
}

function closeSubPage() {
  stack.pop()
}
</script>

<style scoped lang="scss">
.title {
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  margin-top: 28px;
  margin-bottom: 16px;
  margin-left: 16px;
  display: flex;
  align-items: center;

  .el-button {
    padding: 8px;
    margin-right: 8px;
  }

  span {
    font-weight: bold;
  }

  user-select: none;
}

.container {
  padding: 0 16px;

  .el-form-item {
    user-select: none;

    :deep(.el-form-item__content) {
      justify-content: end;
    }
  }

  .el-select {
    width: 100px;
  }
}

</style>