<template>
  <div class="nav-bar">
    <img class="logo" :src="Logo" alt="logo" />
    <el-menu :default-active="activeMenu" router :collapse="true">
      <el-menu-item index="/home">
        <CarbonApplication />
      </el-menu-item>
      <el-sub-menu size="small" index="/setting" class="bottom" popper-class="sub-menu" :teleported="false"
                   :popper-offset="0">
        <template #title>
          <CarbonSettings />
        </template>
        <el-menu-item index="/setting/system">{{ $t('route.system_setting') }}</el-menu-item>
        <el-menu-item index="/setting/about">{{ $t('route.about') }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import CarbonApplication from '~icons/carbon/application';
import CarbonSettings from '~icons/carbon/settings';
import Logo from '@/assets/logo.svg'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { $t } from '@/locales'

const router = useRouter()
const activeMenu = computed(() => router.currentRoute.value.path)
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0 20px -5px var(--color-shadow);
  user-select: none;

  .logo {
    margin: 16px auto;
    width: 38px;
    height: 38px;
  }

  .el-menu {
    border-right: none;
    flex: 1;
    display: flex;
    flex-direction: column;

    .el-menu-item {
      font-size: 24px;
    }

    :deep(.sub-menu) {
      .el-menu-item {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
      }
    }

    .el-sub-menu {
      &.bottom {
        margin-top: auto;
        margin-bottom: 8px;
      }

      :deep(.el-sub-menu__title) {
        font-size: 24px;
      }
    }
  }
}


</style>