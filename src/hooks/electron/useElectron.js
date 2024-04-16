const isElectron = !!(window && window.process && window.process.type)

export function useElectron() {
    if (isElectron) {
        return {
            ipcRenderer: window.require('electron').ipcRenderer,
            shell: window.require('electron').shell,
            childProcess: window.require('child_process'),
            fs: window.require('fs'),
            util: window.require('util')
        }
    }
}