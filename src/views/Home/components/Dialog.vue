<template>
    <el-dialog
        v-model="dialogIsShow"
        title="添加网站链接"
        width="500"
        center
        align-center>
        <div class="input">
            <el-input v-model="inputValue" placeholder="请输入网站链接"/>
        </div>

        <template #footer>
        <div class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="addUrl">
            确认
            </el-button>
        </div>
        </template>
    </el-dialog>

    <Mask :show="loading"></Mask>
</template>

<script setup lang="ts">
import {ref,inject} from 'vue'
import useWebsiteStore from '@/store/websiteStore.ts'
import {ElMessage} from 'element-plus';

import Mask from '@/components/Mask.vue';

let inputValue=ref("")
const {dialogIsShow,changeDialogStatus}=inject('dialogShow') as any
const websiteStore=useWebsiteStore()

const loading=ref(false)

// 網址的正則表達式
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

const cancel=()=>{
    inputValue.value=""

    changeDialogStatus(false)
}

const isValidUrl=()=>{
    return urlRegex.test(inputValue.value)
}

const addUrl=async()=>{
    // 判斷輸入的網址是否合法
    if (isValidUrl()) {
        // 設置加載動畫
        loading.value=true

        // @ts-ignore
        // 獲得處理過後的結果
        let result= await handleUrl.sendUrl(inputValue.value)
        if (result.msg=='500') {
            loading.value=false
            ElMessage({
                message:"此网站不存在",
                type:"warning"
            })
        }else{
            loading.value=false
            websiteStore.add(result)
        }
        inputValue.value=""

        changeDialogStatus(false)
    } else {
        ElMessage({
            message:"請輸入合法地址",
            type:"error"
        })
    }
    inputValue.value=""
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header{
    margin-top: 15px;
}
.input{
    margin: 20px 0;
    padding: 0 30px;
    text-align: center;
}
.dialog-footer{
    margin-bottom: 10px;
}
</style>