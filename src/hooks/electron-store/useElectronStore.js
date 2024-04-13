export function useElectronStore() {
    const Store = require('electron-store');
    const store = new Store()

    function getProjectList() {
        return store.get('projects') ?? []
    }

    function setProjectList(projects) {
        store.set('projects', projects)
    }

    function getAppConfig() {
        return store.get('appConfig') ?? {}
    }

    function setAppConfig(appConfig) {
        const config = getAppConfig()
        store.set('appConfig', { ...config, ...appConfig })
    }

    return {
        getAppConfig,
        setAppConfig,
        getProjectList,
        setProjectList
    }
}