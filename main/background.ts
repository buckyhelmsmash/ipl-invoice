import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import Store from 'electron-store'

const isProd = process.env.NODE_ENV === 'production'

// Initialize store for authentication
const authStore = new Store({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
  },
})

if (isProd) {
  serve({ directory: 'app' })
}

;(async () => {
  await app.whenReady()

  if (!isProd) {
    app.setPath('userData', `${app.getPath('userData')} (development)`)
  }

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

// Authentication handlers
ipcMain.handle('login', async (event, { username, password }) => {
  // Simple authentication - in production, use proper hashing and database
  if (username === 'admin' && password === 'admin') {
    authStore.set('isAuthenticated', true)
    return { success: true }
  }
  return { success: false }
})

ipcMain.handle('logout', async () => {
  authStore.set('isAuthenticated', false)
  return { success: true }
})

ipcMain.handle('check-auth', async () => {
  return authStore.get('isAuthenticated', false)
})

// Legacy message handler
ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
