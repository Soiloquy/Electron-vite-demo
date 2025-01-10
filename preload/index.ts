// 主进程与渲染进程之间通信的逻辑(桥)
const { contextBridge,ipcRenderer } =require("electron")

// 发送URL
const sendUrl=async(url)=>{
    
    let result=await ipcRenderer.invoke('on-url-event',url)
    return result
}

// 打開URL網址
const openUrl=async(value)=>{
    let result =await ipcRenderer.invoke('on-newBrowser-event',value)
    return result
}

contextBridge.exposeInMainWorld('handleUrl',{
    sendUrl,
    openUrl
})
