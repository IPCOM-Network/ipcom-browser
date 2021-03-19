const { app, BrowserWindow, Menu } = require('electron')
const { program } = require('commander');



let win;


async function createWindow(url, debug, clear) {
  Menu.setApplicationMenu(null);
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    title: "IPCOM Browser",
    webPreferences: {
      sandbox: true,
      devTools: true,
      partition: 'persist:ipcom'
    }
  })
  if (clear) {
    await win.webContents.session.clearAuthCache();
    await win.webContents.session.clearCache();
    await win.webContents.session.clearStorageData();
  }

  win.webContents.openDevTools();

  try {
    await win.webContents.loadURL(url)
    win.maximize();
    win.show();
  } catch (err) {
    console.error("could not open window", err);
    app.exit(0);
  }

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

    setTimeout(
      function () {
        if (win) {
          console.log("window found")
          win.webContents.loadURL(url)
          if (win.isMinimized()) win.restore()
          win.focus()
        } else {
          createWindow(url)
        }
      }, 5000)
  })

  program.version('0.10.1')
    .arguments('<url>')
    .option('-d,--debug', 'debug mode', false)
    .option('-c,--clear', 'clear data', false)
    .parse();

  const opts = program.opts();
  const args = program.args;


  if (opts.debug) {
    console.log(JSON.stringify(opts))
    console.log(JSON.stringify(args))
  }


  let urlParts = args[0].split(':', 2);

  if (urlParts.length != 2) {
    console.log(`incorrect url format ${args[0]}\n`);
    setTimeout(() => { app.quit() }, 2000);
  }

  const url = `https://${urlParts[1]}`;

  app.whenReady().then(() => createWindow(url, opts.debug)).catch((err) => {
    console.error("app never ready", err)
    app.exit(0)
  })
  app.once('window-all-closed', () => {
    console.log("closing all")
    app.exit(0)
  })


}

