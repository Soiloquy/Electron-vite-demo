const {ipcMain,BrowserWindow} = require('electron')
const WinState=require('electron-win-state').default
const saveImg=require('./saveImg')

const openBrowser=async(url)=>{
    return new Promise((resolve,reject)=>{
        try {
            const winState=new WinState({
                defaultHeight:600,
                defaultWidth:800,
                electronStoreOptions:{
                  name:'window-state-open'
                }
            })

            const sideWin =new BrowserWindow({
                // width:800,
                // height:600,
                show:false,
                ...winState.winOptions,
                webPreferences:{
                    nodeIntegration:true,
                    contextIsolation:false
                },

            });
            sideWin.loadURL(url)
            winState.manage(sideWin)
            // 定時器，超時直接返回錯誤並關閉窗口
            let timer
            timer=setTimeout(()=>{
                sideWin.destroy()
                resolve({
                    code:"400",
                    msg:"加載失敗,請檢查網絡"
                })
            },10000)
            // 創建窗口時直接最大化
            sideWin.on('ready-to-show',()=>{
                clearTimeout(timer)
                sideWin.show()
                sideWin.maximize()
                resolve({
                    msg:"加載成功"
                })
            })
            sideWin.webContents.once('did-finish-load',()=>{
                
            })

            // 增加右鍵菜單
            sideWin.webContents.on('context-menu',(e,arg)=>{
                saveImg(arg.srcURL)
            })
            // sideWin.webContents.on('did-fail-load',(event, errorCode, errorDescrption, validatedURL)=>{
            //     console.log('加載失敗');
            //     resolve({
            //         code:`${errorCode}`,
            //         msg:`加載失敗: ${validatedURL}`
            //     })
            // })
            
        } catch (e) {
            reject(e)
        }    
    })


}

ipcMain.handle('on-newBrowser-event',async(e,url)=>{
    const result=await openBrowser(url)

    return result
})