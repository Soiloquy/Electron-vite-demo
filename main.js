const { app, protocol,BrowserWindow } = require('electron')
const path = require('path')
require('./controller/getSource.js')


// 注册特殊协议
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const createWindow = async() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight:600,
    minWidth:400,

    webPreferences:{
      preload:path.resolve(__dirname,'./preload/index.ts'),
    },

    show:false
  })

  win.loadURL('http://localhost:5173/')
  win.webContents.openDevTools()

  win.on('ready-to-show',()=>{
    win.show()
  })

}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
