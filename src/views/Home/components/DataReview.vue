<template>
  <div class='data-review'>
    <el-tabs v-model='activeName' type='border-card' addable>
      <template #add-icon>
        <el-button type='primary' :loading='exporting' @click='handleExport'>{{ startCase($t('home.export')) }}</el-button>
      </template>
      <el-tab-pane v-for='(tab, i) of tabs' :key='tab' :label='tab' :name='tab'>
        <el-table :data='props.data[i].data' stripe max-height='320'>
          <el-table-column :label='startCase($t("home.table.job_number"))' align='center' width='150'>
            <template #default='{ row }'>
              {{ row.user.id }}
            </template>
          </el-table-column>
          <el-table-column :label='startCase($t("home.table.name"))' align='center' width='150'>
            <template #default='{ row }'>
              {{ row.user.name }}
            </template>
          </el-table-column>
          <el-table-column :label='startCase($t("home.table.planned_work_hours"))' align='center'>
            <template #default='{ row }'>
              {{ row.totalPredictWork.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column :label='startCase($t("home.table.actual_working_hours"))' align='center'>
            <template #default='{ row }'>
              {{ row.totalFinishWork.toFixed(2) }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { startCase } from 'lodash'
import { $t } from '@/locales'

const props = defineProps({
  data: Array,
  exporting: Boolean
})
const tabs = computed(() => props.data?.map(item => item.month))
const activeName = ref('')

const emits = defineEmits(['export-data'])

watch(tabs, (val) => {
  activeName.value = val[0] ?? ''
}, { immediate: true })

function handleExport() {
  emits('export-data')
}
</script>

<style scoped lang='scss'>
.data-review {
  width: 656px;
  margin-top: 16px;
}

.el-tabs {
  :deep(.el-tabs__item) {
    user-select: none;
  }

  :deep(.el-tabs__content) {
    width: 100%;
    height: 350px;
  }

  :deep(.el-tabs__new-tab) {
    margin: 0 4px 0 8px;
    border: none;
    width: auto;
    height: 38px;
  }
}

.el-table {
  :deep(.el-table__inner-wrapper) {
    &:before {
      background: none;
    }
  }
}
</style>