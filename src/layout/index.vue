<template>
  <div class="container">
    <HeaderBar />
    <NavBar />
  </div>
</template>

<script setup>

import NavBar from "./components/NavBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: darkred;
}
.container .header-bar{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.container .nav-bar{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>