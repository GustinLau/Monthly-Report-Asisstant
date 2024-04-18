<template>
  <div style="margin-bottom: 8px;margin-top: -16px" class="clearfix">
    <el-button type="success" style="float:right" @click="openDialog(null, true)">
      {{ startCase($t('common.add')) }}
    </el-button>
  </div>
  <el-table :data="tableData" style="width: 100%" max-height="440">
    <el-table-column show-overflow-tooltip prop="id" align="center" :label="startCase($t('common.id'))" width="160" />
    <el-table-column show-overflow-tooltip prop="name" align="center" :label="startCase($t('common.name'))" />
    <el-table-column align="center" :label="startCase($t('common.action'))" width="130">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="openDialog(scope.row, false)">
          {{ startCase($t('common.edit')) }}
        </el-button>
        <el-divider direction="vertical" />
        <el-button link type="danger" size="small" @click="deleteProject(scope.row)">
          {{ startCase($t('common.delete')) }}
        </el-button>
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
      :close-on-click-modal="false"
      width="380"
  >
    <el-form ref="formRef" :rules="projectFormRules" label-width="60" :model="projectForm">
      <el-form-item required prop="id" :label="startCase($t('common.id'))">
        <el-input v-model="projectForm.id" :readonly="!isCreate" />
      </el-form-item>
      <el-form-item required prop="name" :label="startCase($t('common.name'))">
        <el-input v-model="projectForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ startCase($t('common.cancel')) }}
        </el-button>
        <el-button type="primary" @click="saveProjectConfig">
          {{ startCase($t('common.confirm')) }}
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { $t } from '@/locales'
import { cloneDeep, startCase } from 'lodash'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useProjectStore } from "@/stores/porject";

const projectStore = useProjectStore()

const pageSize = 10
const totalProjectList = computed(() => projectStore.projectList)
const currentPage = ref(1)
const total = computed(() => totalProjectList.value.length)
const tableData = computed(() => {
  return totalProjectList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
})

function handleCurrentChange(val) {
  currentPage.value = val
}

const dialogVisible = ref(false)
const isCreate = ref(false)
const dialogTitle = computed(() =>
    isCreate.value
        ? startCase($t('setting.project_config_page.add_project'))
        : startCase($t('setting.project_config_page.edit_project'))
)
const formRef = ref(null)
const projectForm = reactive({
  id: '',
  name: ''
})

const projectFormRules = reactive({
  id: [
    { required: true, message: $t('setting.project_config_page.please_input_id'), trigger: 'blur' }
  ],
  name: [
    { required: true, message: $t('setting.project_config_page.please_input_name'), trigger: 'blur' },
  ],
})

function openDialog(project, _isCreate) {
  isCreate.value = _isCreate
  formRef?.value?.resetFields()
  projectForm.id = project?.id ?? ''
  projectForm.name = project?.name ?? ''
  dialogVisible.value = true
}

function saveProjectConfig() {
  formRef.value.validate((valid) => {
    if (valid) {
      if (isCreate.value && totalProjectList.value.some(item => item.id === projectForm.id)) {
        ElMessageBox.confirm($t('setting.project_config_page.cover_data'), startCase($t('common.duplicate_data')), { type: 'warning' })
            .then(() => {
              const list = cloneDeep(totalProjectList.value)
              const target = list.find(item => item.id === projectForm.id)
              target.name = projectForm.name
              projectStore.updateProjectList(list)
              dialogVisible.value = false
              ElNotification({
                message: startCase($t('common.save_success')),
                type: 'success',
                offset: 28
              })
            })
            .catch(() => null)
      } else if (!isCreate.value) {
        const list = cloneDeep(totalProjectList.value)
        const target = list.find(item => item.id === projectForm.id)
        target.name = projectForm.name
        projectStore.updateProjectList(list)
        dialogVisible.value = false
        ElNotification({
          message: startCase($t('common.save_success')),
          type: 'success',
          offset: 28
        })
      } else {
        const list = cloneDeep(totalProjectList.value)
        list.push(cloneDeep(projectForm))
        projectStore.updateProjectList(list)
        dialogVisible.value = false
        ElNotification({
          message: startCase($t('common.save_success')),
          type: 'success',
          offset: 28
        })
      }
    }
  })
}

function deleteProject(project) {
  ElMessageBox.confirm($t('setting.project_config_page.delete_data'), startCase($t('common.operation_confirm')), { type: 'error' })
      .then(() => {
        const list = cloneDeep(totalProjectList.value)
        projectStore.updateProjectList(list.filter(item => item.id !== project.id))
        if (projectStore.currentProject === project.id) {
          projectStore.updateCurrentProject('')
        }
        ElNotification({
          message: startCase($t('common.delete_success')),
          type: 'success',
          offset: 28
        })
      })
      .catch(() => null)
}
</script>
