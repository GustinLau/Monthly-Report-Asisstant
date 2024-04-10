const isElectron = !!(window && window.process && window.process.type)

export function useElectron() {
    if (isElectron) {
        return {
            ipcRenderer: window.require('electron').ipcRenderer,
            webFrame: window.require('electron').webFrame,
            remote: window.require('electron').remote,
            childProcess: window.require('child_process'),
            fs: window.require('fs'),
            path: window.require('path'),
        }
    }
}