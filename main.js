//I have no idea what most of this does!!! - NCR

const { app, BrowserWindow, session } = require('electron')


// Main App Activity: 
app.on('ready', async () => {


    const mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        minimizable: true,
        width: 1000,
        height: 600,
        frame: false,
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




