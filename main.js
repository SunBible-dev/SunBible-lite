//I have no idea what most of this does!!! - NCR

const { app, BrowserWindow, session } = require('electron')


// Main App Activity: 
app.on('ready', async () => {


    const mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        minimizable: true,
        width: 800,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    mainWindow.loadURL('https://the-sunshining.github.io/SunBible/')
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
        { role: 'togglefullscreen' },
        { role: 'close' }

    ]
});




