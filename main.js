const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')


let win = null;
const createWindow = async () => {
    win = new BrowserWindow({
        frame: false,
        width: 1024,
        height: 768,
        maximizable: false,
        resizable: false,
        webPreferences: {
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用Node API
        },
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        // 开启调试台
        win.webContents.openDevTools()
    } else {
        win.loadFile(join(__dirname, 'dist/index.html'))
    }
    setupListener()
};

function setupListener() {
    ipcMain.on('window-close', function() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    })
    ipcMain.on('window-min',function(){
        win.minimize();
    })
}

app.whenReady().then(async () => {
    await createWindow(); // 创建窗口
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});


