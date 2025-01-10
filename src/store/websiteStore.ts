import { defineStore } from "pinia";
import { WebsiteData } from "./style";
import store from 'store2'
import _ from 'lodash'
import {ElMessage} from 'element-plus';

const useWebsiteStore=defineStore('websiteStore',{
    state(){
        return{
            websites:[] as WebsiteData[]
        }
    },
    actions:{
        add(item:WebsiteData){
            if (_.find(this.websites,{url:item.url})) {
                ElMessage({
                    message: '此网站已添加',
                    type: 'warning',
                })
            } else {
                this.websites.unshift(item)
                // 通过store2本地存储保存的网站
                store.set('websites',this.websites)
            }
        },
        init(){
            if (store.get('websites')!=null) {
                this.websites=store.get('websites')
            }
        },
        deleteItem(url:string){
            this.websites=this.websites.filter(value=>{
                return value.url != url
            })
            store('websites',this.websites)
        }
    },
    getters:{
        // 進行搜索查詢
        find(){
            return (keyWords:string)=>{
                if (keyWords==='') {
                    return this.websites
                } else {
                    const result=_.filter(this.websites,(item)=>{
                        let parent=new RegExp(keyWords,'i')
                        return parent.test(item.title)
                    })
                    return result
                }
            }
        }
    }
})

export default useWebsiteStore