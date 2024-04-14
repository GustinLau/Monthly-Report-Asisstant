<template>
  <el-alert
    :type="project ? 'success' : 'error'"
    :class="{'allow-click': step===1}"
    :closable='false'
    @click='showProjectConfig'
  >
    <div v-if='project' class='alert-content'>
      <CarbonCheckmarkFilled />
      <span style='margin-left: 8px'>{{ startCase($t('home.current_config')) }}：{{ project.name }}</span>
    </div>
    <div v-else class='alert-content'>
      <CarbonCloseFilled />
      <span style='margin-left: 8px'>{{ startCase($t('home.project_not_configured')) }}</span>
    </div>
  </el-alert>

  <el-dialog v-model='dialogVisible' :title="startCase($t('home.project_select'))" width='380'>
    <el-form :model='form'>
      <el-form-item :label="startCase($t('common.project'))" prop='id' :label-width='80'>
        <el-select v-model='form.id' filterable>
          <el-option
            v-for='item in projectList'
            :key='item.id'
            :label='item.name'
            :value='item.id'
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogVisible = false'>
          {{ startCase($t('common.cancel')) }}
        </el-button>
        <el-button type='primary' @click='projectConfigConfirm'>
          {{ startCase($t('common.confirm')) }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import CarbonCheckmarkFilled from '~icons/carbon/checkmark-filled'
import CarbonCloseFilled from '~icons/carbon/close-filled'
import { startCase } from 'lodash'
import { $t } from '@/locales'
import { useProjectStore } from '@/stores/porject'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  step: Number
})

const projectStore = useProjectStore()
const projectList = computed(() => projectStore.projectList)
const project = computed(() => projectStore.projectList.find(v => v.id === projectStore.currentProject))

const dialogVisible = ref(false)
const form = reactive({ id: '' })

function showProjectConfig() {
  if (props.step === 1) {
    form.id = projectStore.currentProject
    dialogVisible.value = true
  }
}

function projectConfigConfirm() {
  dialogVisible.value = false
  projectStore.updateCurrentProject(form.id)
}

</script>

<style scoped lang='scss'>
.el-alert {
  width: auto;
  margin-top: 16px;

  &.allow-click {
    cursor: pointer;
  }

  user-select: none;
}

.alert-content {
  display: flex;
  align-items: center;
}

</style>