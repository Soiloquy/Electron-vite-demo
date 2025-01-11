<template>
    <div v-if="websiteStore.find(keyWords).length<=0" class="no-item">
        暂无数据...
    </div>
    <el-card style="width: 100%;" shadow="hover" v-for="ws in websiteStore.find(keyWords)" v-else>
        <div class="card-body">
            <div  class="intro" @click="handleItemClick(ws)">
                <img
                    :src="ws.screenshot"
                    style="width: 100%"/>
                <div class="title">{{ ws.title }}</div>
            </div>
            <div class="delete">
                <el-popconfirm
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="是否删除?"
                    @cancel="onCancel"
                    @confirm="confirm(ws.url)">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" circle></el-button>
                    </template>
                    <template #actions="{ confirm, cancel }">
                        <el-button size="small" @click="cancel">取消</el-button>
                        <el-button
                            type="danger"
                            size="small"
                            :disabled="!clicked"
                            @click="confirm">
                            确认
                        </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
    </el-card>

    <Mask  :show="loading"></Mask>
</template>

<script setup lang="ts">
import {onMounted,ref,inject} from 'vue';
import {Delete,InfoFilled } from '@element-plus/icons-vue'
import useWebsiteStore from '@/store/websiteStore.ts'
import { ElMessage } from 'element-plus';

import Mask from '@/components/Mask.vue';

const websiteStore=useWebsiteStore()

const clicked = ref(false)
const loading=ref(false)

const {keyWords}=inject('itemTitleSearch') as any

const onCancel=()=>{
    clicked.value = true
}

const confirm=(url:string)=>{
    websiteStore.deleteItem(url)
}

const handleItemClick=async(value:any)=>{
    loading.value=true
    // @ts-ignore
    let result=await handleUrl.openUrl(value.url)
    if (result.code) {
        ElMessage({
            message:result.msg,
            type:'error'
        })
        loading.value=false
    }else{
        ElMessage({
            message:result.msg,
            type:'success'
        })
        loading.value=false
    }
}

onMounted(()=>{
    websiteStore.init()
    console.log(websiteStore.websites);
    
})
</script>

<style lang="scss" scoped>
.no-item{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-top: 10px;
    font-weight: 700;
    font-size: 20px;
}

.card-body{
    display: flex;
    width: 100%;
    cursor: pointer;
    img{
        width: 150px!important;
        height: 150px;
    }
    .intro{
        display: flex;
        flex: 1;
        .title{
            margin-left: 30px;
            margin-right: 10px;
        }
    }
    .delete{
        align-self: center;
    }
}

.el-card{
    margin-top: 10px;
}

.el-card:hover{
    background-color: #eee;
}
</style>