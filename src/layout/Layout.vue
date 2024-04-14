<template>
  <div class="layout">
    <HeaderBar />
    <NavBar />
    <div class="container">
      <RouterView/>
    </div>
  </div>
</template>

<script setup>

import NavBar from "./components/NavBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  .header-bar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .nav-bar{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}
.container {
  position: absolute;
  left: 64px;
  top: 0;
  height: calc(100vh - 16px);
  width: calc(100vw - 64px - 16px);
  max-height: calc(100vh - 16px);
  overflow: auto;
}

</style>