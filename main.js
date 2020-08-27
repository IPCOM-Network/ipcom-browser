const { app, BrowserWindow } = require('electron')

let win;

function createWindow(url) {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.webContents.openDevTools()
  win.loadFile("./index.html").then(() => {
    win.webContents.send("changeWeb", url)
  })
  win.maximize()
  win.show()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, argv, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      win.webContents.send("changeWeb", argv[3])
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  const url = process.argv[2]

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => createWindow(url))

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })


}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.