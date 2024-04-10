<template>
  <div class="nav-bar">
    <img class="logo" :src="Logo" alt="logo"/>
    <el-menu :collapse="true">
      <el-menu-item index="2">
        <Icon icon="carbon:application" />
      </el-menu-item>
      <el-menu-item class="bottom">
        <Icon icon="carbon:settings" />
      </el-menu-item>
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
  .logo {
    width: 60px
  }
  .el-menu {
    border-right: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-menu-item {
      font-size: 24px;
      &.bottom {
        margin-top: auto;
      }
    }
  }
}
</style>