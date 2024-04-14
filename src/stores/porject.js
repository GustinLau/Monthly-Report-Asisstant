import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronStore } from '@/hooks/electron-store/useElectronStore'

export const useProjectStore = defineStore('project', () => {
    const { getProjectList, setProjectList, getAppConfig, setAppConfig } = useElectronStore()

    const projectList = ref(getProjectList() ?? [])

    function updateProjectList(val) {
        projectList.value = val
        setProjectList(projectList.value)
    }

    const currentProject = ref(getAppConfig().project ?? null)

    function updateCurrentProject(val) {
        currentProject.value = val
        setAppConfig({ project: currentProject.value })
    }

    return { projectList, updateProjectList, currentProject, updateCurrentProject }
})
