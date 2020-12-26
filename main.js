//I have no idea what most of this does!!! - NCR

const { app, BrowserWindow, session, Menu } = require('electron')


// Main App Activity: 
app.on('ready', async () => {


    const mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        minimizable: true,
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    mainWindow.loadFile('app-iframe.html')
    mainWindow.removeMenu()

    // const { session } = require('electron')
    // Get all service workers.
    console.log(session.defaultSession.serviceWorkers.getAllRunning())

    // Handle logs and get service worker info
    session.defaultSession.serviceWorkers.on('console-message', (event, messageDetails) => {
        console.log(
            'Got service worker message',
            messageDetails,
            'from',
            session.defaultSession.serviceWorkers.getFromVersionID(messageDetails.versionId)
        )
    })


})



//App menu mac os
const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'View SunBible Online',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://the-sunshining.github.io/SunBible/')
        }
      },
      {
        label: 'Open SunBible Wallpaper online',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://the-sunshining.github.io/SunBible_IMG_Library/SunBible_wallpaper_img/wallpaper.html')
        }
      },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
 
  
  // { role: 'viewMenu' }
  ...(isMac ? [{
    label: 'View',
    submenu: [
      { role: 'reload' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }] : [])
 
  
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)





// Right Click Menu using - "electron-context-menu": "^2.3.0"
const contextMenu = require('electron-context-menu');
contextMenu({
    menu: (actions, props, browserWindow) => [

        { role: 'copy' },
        { role: 'selectAll' },
        { type: 'separator' },
        actions.copyImage(),
        actions.saveImageAs(),
        { type: 'separator' },
        { role: 'minimize'},
        { role: 'togglefullscreen' },
        { role: 'close' }

    ]
});




