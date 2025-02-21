const {ipcMain,BrowserWindow} =require('electron')

const getSource=(url)=>{
    return new Promise((resolve,reject)=>{
        const win=new BrowserWindow({
            width:1000,
            height:800,
            show:false,
            webPreferences:{
                offscreen:true
            }
        })
        win.loadURL(url)

        win.webContents.on('did-finish-load',async()=>{
            const title=win.getTitle()
            try {
                const image=await win.webContents.capturePage()
                if (image.isEmpty()) {
                    resolve({
                        msg:'500'
                    })
                }else{
                    const screenshot=image.toDataURL()
                    resolve({
                        title,
                        screenshot,
                        url
                    })
                }
                win.close()
            } catch (e) {
                reject(e)
            }
        })
    })
    
}

ipcMain.handle('on-url-event',async(e,url)=>{
    const result=await getSource(url)
    return result
})