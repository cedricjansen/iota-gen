const {app, BrowserWindow, ipcMain, contextBridge } = require('electron')
const path = require('path')

let win;

function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, './src/js/preload.js')
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("generate", (event, arg) =>  {
    const seed = require('./src/js/seed.js');
    var s = seed.generate();
    console.log(s);
      
    win.webContents.send('generated', s);
})





