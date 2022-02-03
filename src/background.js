'use strict'

import { app, protocol, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let tray = null

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  win.setTitle('abc')
  win.webContents.openDevTools()
  win.webContents.on('did-finish-load', () => {
    win.setTitle('Cheese Talk')
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  tray = new Tray('C:\\web\\cheeese\\cheeese\\src\\assets\\cheese.png')
  tray.setTitle('hello world')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'open',
      type: 'normal',
      checked: true,
      click: () => {
        var wins = BrowserWindow.getAllWindows()
        wins.forEach(function (win) {
          if (win.getTitle() === 'Cheese Talk') {
            win.focus()
            win.show()
            return null
          }
        })
      }
    },
    { label: 'quit', type: 'normal', click: () => { app.quit() } }
  ])
  tray.setToolTip('Cheese')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    var wins = BrowserWindow.getAllWindows()
    wins.forEach(function (win) {
      if (win.getTitle() === 'Cheese Talk') {
        win.focus()
        win.show()
        return null
      }
    })
  })
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
// ipcMain에서의 이벤트 수신
ipcMain.on('close', (evt) => {
  var win = BrowserWindow.getFocusedWindow()
  if (win.getTitle() === 'Cheese Talk') {
    win.hide()
  } else {
    win.close()
  }
})
ipcMain.on('minimize', (evt) => {
  // BrowserWindow.getFocusedWindow().openDevTools()
  BrowserWindow.getFocusedWindow().minimize()
})
ipcMain.on('maximize', (evt) => {
  BrowserWindow.getFocusedWindow().maximize()
})
ipcMain.on('unmaximize', (evt) => {
  BrowserWindow.getFocusedWindow().unmaximize()
})
ipcMain.on('setTitle', (evt, titleNm) => {
  var mywin = BrowserWindow.getFocusedWindow()
  mywin.webContents.on('did-finish-load', () => {
    // console.log(titleNm)
    // console.log(mywin)
    mywin.setTitle(titleNm)
  })
})
ipcMain.on('alreadyOpen', (evt, titleNm) => {
  var wins = BrowserWindow.getAllWindows()
  wins.forEach(function (win) {
    if (titleNm === win.getTitle()) {
      console.log(titleNm)
      win.focus()
      evt.returnValue = [true, wins.length]
      return true
    }
  })
  evt.returnValue = [false, wins.length]
  return false
})
