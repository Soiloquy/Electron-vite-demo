<template>
    <div class="search-container">
        <el-button type="primary" @click="addUrl">添加</el-button>
        <div class="input">
            <el-input v-model="inputValue" style="width: 240px" placeholder="Please input" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

let inputValue=ref("")

const addUrl=async()=>{
    // @ts-ignore
    let result=await myApi.sendUrl(inputValue.value)
}
</script>

<style lang="scss" scoped>
.search-container{
    height: 60px;
    width: 100%;
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>