const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const {
  ipcMain
} = require('electron')

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
    icon: __dirname + '/logoalt.png',
  });

  mainWindow.loadURL('https://technata.com.br/box');
  mainWindow.removeMenu();
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  })
  loadingScreen.close();
  ipcMain.on('progress', (evt, arg) => {
    mainWindow.setProgressBar(arg / 100)
  })
  ipcMain.on('remove-progress', (evt, arg) => {
    mainWindow.setProgressBar(-1)
  })
};

let loadingScreen;

const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    },
    icon: __dirname + '/logoalt.png',
  })
  loadingScreen.setResizable(false);
  loadingScreen.loadFile(path.join(__dirname, 'loading.html'));
  loadingScreen.on('closed', () => {
    loadingScreen = null;
  })
  ipcMain.on('app-loaded', (evt, arg) => {
    createWindow()
  })
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  })
}

app.on('ready', () => {
  createLoadingScreen();
  //createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});