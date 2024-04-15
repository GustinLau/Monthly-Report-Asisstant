const { app, BrowserWindow, ipcMain, nativeTheme, dialog } = require('electron')
const { join } = require('path')


let win = null
const createWindow = () => {
  win = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    transparent: true,
    backgroundColor: '#00000000',
    maximizable: false,
    resizable: false,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true // 渲染进程使用Node API
    }
  })
  if (process.env.VITE_DEV_SERVER_URL) {
    // 开启调试台
    win.webContents.openDevTools()
    return win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    return win.loadFile(join(__dirname, 'dist/index.html'))
  }
}

function setupListener() {
  ipcMain.on('window-close', function() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  ipcMain.on('window-min', function() {
    win.minimize()
  })

  ipcMain.on('change-theme', function(e, theme) {
    nativeTheme.themeSource = theme
  })

  ipcMain.on('open-save-dialog', function(e, defaultPath) {
    dialog.showSaveDialog({ defaultPath }).then(result => e.sender.send('save-path-selected', result))
  })
}

app.whenReady().then(async () => {
  setupListener()
  setupStore()
  setupTheme()
  await createWindow() // 创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function setupStore() {
  const Store = require('electron-store')
  Store.initRenderer()
}

function setupTheme() {
  const Store = require('electron-store')
  const store = new Store()
  const appConfig = store.get('appConfig') ?? {}
  nativeTheme.themeSource = appConfig.theme ?? 'system'
}