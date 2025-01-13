<template>
    <div class="search-container">
        <el-button type="primary" @click="showDialog" class="search-button">添加</el-button>
        <div class="input">
            <el-input v-model="inputValue" @keyup="searchItem"  style="width: 300px;" placeholder="请输入关键字"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,inject,onMounted,watch} from 'vue'
import _ from 'lodash'

let inputValue=ref("")
let MenuOpenDialog=ref("")
const {changeDialogStatus}=inject('dialogShow') as any
const {searchKeyWords}=inject('itemTitleSearch') as any

const showDialog=()=>{
    changeDialogStatus(true)
}

const searchItem =_.debounce((e)=>{searchKeyWords(e.target.value)},500)

onMounted(async()=>{
    // @ts-ignore
    menuHandle.openDialog()
    // @ts-ignore
    MenuOpenDialog.value= await menuHandle.newLink()
})

watch(MenuOpenDialog,async(action)=>{
    if (action) {
        showDialog()
        // 重置變量和事件，從而多次觸發
        MenuOpenDialog.value=""
        // @ts-ignore
        MenuOpenDialog.value= await menuHandle.newLink()
    }
})
</script>

<style lang="scss" scoped>
.search-container{
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-button{
        margin-right: 20px;
    }
}
</style>