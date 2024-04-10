<template>
  <div class="nav-bar">
    <img class="logo" :src="Logo" alt="logo"/>
    <el-menu default-active="/home" router :collapse="true">
      <el-menu-item index="/home">
        <Icon icon="carbon:application" />
      </el-menu-item>
      <el-sub-menu size="small" index="/setting" class="bottom">
        <template #title>
          <Icon icon="carbon:settings" />
        </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
      </el-sub-menu>

    </el-menu>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Logo from '@/assets/logo.svg'


</script>

<style lang="scss" scoped>
.nav-bar {
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 0 20px -5px #ccc;
  .logo {
    margin: 8px auto;
    width: 42px;
    height: 42px;
  }
  .el-menu {
    border-right: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-menu-item {
      font-size: 24px;
    }
    .el-sub-menu {
      &.bottom {
        margin-top: auto;
        margin-bottom: 16px;
      }
      :deep(.el-sub-menu__title) {
        font-size: 24px;
      }
    }
  }
}
</style>