const {ipcMain} =require('electron')
const fs=require('fs')
const path=require('path')

ipcMain.handle('on-getImgFile-event',(e,arg)=>{
   let result= fs.readdirSync(path.resolve(__dirname,"../public/unloadImg/"))
   return result
})