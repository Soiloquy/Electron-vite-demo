const {ipcMain,BrowserWindow} = require('electron')

const openBrowser=(url)=>{
    return new Promise((resolve,reject)=>{
        try {
            const win =new BrowserWindow({
                width:800,
                height:600,
                webPreferences:{
                    nodeIntegration:true,
                    contextIsolation:true
                }
            });
        
            // 創建窗口時直接最大化
            win.maximize()
        
            win.loadURL(url)

            resolve({
                msg:"加載成功"
            })
        } catch (e) {
            reject(e)
        }    
    })


}

ipcMain.handle('on-newBrowser-event',async(e,url)=>{
    const result=await openBrowser(url)

    return result
})