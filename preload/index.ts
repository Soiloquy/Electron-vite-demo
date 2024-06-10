// 主进程与渲染进程之间通信的逻辑
const { contextBridge,ipcRenderer } =require("electron")

// 发送URL
const sendUrl=async(url)=>{
    let result=await ipcRenderer.invoke('on-url-event',url)
    console.log(result);
    return result
}

contextBridge.exposeInMainWorld('myApi',{
    sendUrl
})
