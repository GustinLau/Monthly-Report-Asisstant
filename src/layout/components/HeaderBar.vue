<template>
  <div class="header-bar">
    <el-link class="min-button" :underline="false" @click="minimize">
      <Minimize />
    </el-link>
    <el-link class="close-button" :underline="false" @click="close">
      <Close />
    </el-link>
  </div>
</template>

<script setup>
import Minimize from '~icons/mingcute/minimize-fill';
import Close from '~icons/mingcute/close-fill';
import { useElectron } from "@/hooks/electron/useElectron";

const electron = useElectron()

function minimize() {
  electron?.ipcRenderer.send('window-min')
}

function close() {
  electron?.ipcRenderer.send('window-close')
}
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  height: 28px;
  z-index: 999;
  align-items: center;
  justify-content: flex-end;
  -webkit-app-region: drag;
}

.el-link {
  height: 100%;
  width: 42px;
  -webkit-app-region: no-drag;
}

.min-button {
  color: #409EFF;

  &:hover {
    background: #eee;
    color: #409EFF
  }
}


.close-button {
  color: #F56C6C;

  &:hover {
    background: #F56C6C;
    color: #fff
  }
}

</style>