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


  win.webContents.loadURL(url).then(() => {
    win.maximize()
    win.show()
  }).catch((err) => {
    console.error("could not open window", err)
    app.exit(0)
  })

}

const singleInstanceLock = app.requestSingleInstanceLock()

if (!singleInstanceLock) {
  console.log("app already running")
  app.quit()
} else {
  app.on('second-instance', (event, argv, workingDirectory) => {
    if (app.isPackaged) {
      argv.unshift(null)
    }
    if (!argv || argv.length < 4) {
      console.log("wrong number of args", argv)
      return
    }

    let urlParts = argv[3].split(':', 2);
    const url = `https://${urlParts[1]}`;

    if (win) {
      console.log("window found")
      win.webContents.loadURL(url)
      if (win.isMinimized()) win.restore()
      win.focus()
    } else {
      createWindow(url)
    }

  })


  if (app.isPackaged) {
    process.argv.unshift(null)
  }

  if (!process.argv || process.argv.length < 3) {
    console.error('no info browser', process.argv)
    app.exit(0)
  } else {


    let urlParts = process.argv[2].split(':', 2);
    const url = `https://${urlParts[1]}`;
    app.whenReady().then(() => createWindow(url)).catch((err) => {
      console.error("app never ready", err)
      app.exit(0)
    })
    app.once('window-all-closed', () => {
      console.log("closing all")
      app.exit(0)
    })


  }
}
