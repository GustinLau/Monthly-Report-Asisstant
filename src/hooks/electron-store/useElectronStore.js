export function useElectronStore() {
  const Store = require('electron-store');
  const store = new Store()

  function getProjectList() {
    return store.get('projects', [])
  }

  function setProjectList(projects) {
    this.store.set('projects', projects)
  }

  function getAppConfig() {
    return store.get('appConfig', {})
  }

  function setAppConfig(appConfig) {
    store.set('appConfig', appConfig)
  }

  return {
    getAppConfig,
    setAppConfig,
    getProjectList,
    setProjectList
  }
}