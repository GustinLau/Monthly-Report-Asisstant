import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronStore } from '@/hooks/electron-store/useElectronStore'

export const useProjectStore = defineStore('project', () => {
    const { getProjectList, setProjectList } = useElectronStore()

    const projectList = ref(getProjectList() ?? [])

    function updateProjectList(val) {
        projectList.value = val
        setProjectList(projectList.value)
    }


    return { projectList, updateProjectList }
})
