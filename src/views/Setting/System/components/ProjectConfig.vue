<template>
  <div style="margin-bottom: 8px;margin-top: -16px" class="clearfix">
    <el-button type="success" style="float:right" @click="openDialog(null, true)">{{ startCase($t('common.add')) }}</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" max-height="440">
    <el-table-column show-overflow-tooltip prop="id" align="center" :label="startCase($t('common.No'))" width="160" />
    <el-table-column show-overflow-tooltip prop="name" align="center" :label="startCase($t('common.name'))" />
    <el-table-column align="center" :label="startCase($t('common.action'))" width="130">
      <template #default>
        <el-button link type="primary" size="small">{{ startCase($t('common.edit')) }}</el-button>
        <el-divider direction="vertical" />
        <el-button link type="danger" size="small">{{ startCase($t('common.delete')) }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="clearfix" style="margin-top: 8px; user-select: none">
    <el-pagination
      style="float: right"
      v-model:current-page="currentPage"
      :page-size="pageSize"
      background
      small
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="500"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ startCase($t('common.cancel')) }}
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          {{ startCase($t('common.confirm')) }}
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useElectronStore } from '@/hooks/electron-store/useElectronStore'
import { $t } from '@/locales'
import { startCase } from 'lodash'

const { getProjectList } = useElectronStore()

const pageSize = 10
const totalProjectList = ref([])
const currentPage = ref(1)
const total = computed(() => totalProjectList.value.length)
const tableData = computed(() => {
  return totalProjectList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
})

onBeforeMount(() => {
  totalProjectList.value = getProjectList()
})

function handleCurrentChange(val) {
  currentPage.value = val
}

const dialogVisible = ref(false)
const isCreate = ref(false)
const dialogTitle = computed(() => isCreate.value ? '新增项目' : '编辑项目')

function openDialog(project, _isCreate) {
  isCreate.value = _isCreate
  dialogVisible.value = true
}
</script>

<style scoped lang="scss">

</style>