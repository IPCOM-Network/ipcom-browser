const { app, BrowserWindow, Menu } = require('electron')

let win;


function createWindow(url) {

  Menu.setApplicationMenu(null);
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    title: "IPCOM Browser",
    webPreferences: {
      sandbox: true
    }
  })


  win.webContents.loadURL(url)
  win.maximize()
  win.show()
}

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, argv, workingDirectory) => {
    if (!argv || argv.length < 4) {
      return
    }

    if (win) {
      let url = argv[3].split(':', 2);
      url = `https://${url[1]}`;
      win.webContents.loadURL(url)
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  if (!process.argv || process.argv.length < 3) {
    return
  }


  let url = process.argv[2].split(':', 2);
  url = `https://${url[1]}`;

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