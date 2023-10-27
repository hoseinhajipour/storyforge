const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/www/index.html`);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', function() {
    createWindow();

    console.log(" ready  xxx");
    electronReload(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
    if (mainWindow === null) createWindow();
});
