const {Menu, dialog} =require('electron');
const got=require('got').default
const path=require('path')
const imageType=require('image-type')
const fs=require('fs')
const getCurrentTime=require('../src/utils/getTime')

const saveImg=(srcUrl)=>{
    if(srcUrl){
        const contextMenu=Menu.buildFromTemplate([
            {
                label:'圖片另存爲',
                click:()=>{
                    got.get(srcUrl).then(async (response)=>{
                        const chunk=Buffer.from(response.rawBody)
                        const imgType=imageType(chunk)
                        let finalImgType

                        if (imgType?.ext) {
                            finalImgType=imgType.ext
                        }else{
                            let tmp=srcUrl.split('.')
                            finalImgType=tmp[tmp.length-1]
                        }

                        // 打開保存圖片的窗口
                        const {filePath,canceled}=await dialog.showSaveDialog({
                            title:'圖片另存爲',
                            defaultPath:path.resolve(__dirname,'../public/unloadImg/'+'Electron_'+getCurrentTime()+'.'+finalImgType)
                        })
                        if (!canceled) {
                            fs.writeFileSync(filePath,chunk)
                        }
                    }).catch(e=>{
                        console.log(e);
                    })
                }
            }
        ])
        contextMenu.popup()
    }
}

module.exports=saveImg