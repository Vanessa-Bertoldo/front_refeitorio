const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = require("electron-is-dev")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preloader.js"),
      nodeIntegration: true
    },
  
  });
  //win.loadURL(isDev ? "http://localhost:3000" : `file://$${ path.join(__dirname, "") }`);
   //win.loadURL("http://localhost:3000");
   // Verifique se está em modo de desenvolvimento (local)
   if (isDev) {
    // Carregue a URL do React no modo de desenvolvimento
    win.loadURL("http://localhost:3000");
  } else {
    // Carregue o arquivo HTML da build do React
    win.loadFile("build/index.html");
  }

  //mainWindow.loadFile(path.join(__dirname, ''))
}

app.whenReady().then(() => {
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
