<template>
    <div class="header-container">
        <div class="websiteCollection">
            <router-link to="/home" custom v-slot="{isActive,navigate}">
                <i class="iconfont  icon-Web" :class="{active:isActive}" @click="navigate"> 網站收藏</i>
            </router-link>
        </div>
        <div class="imgCollection">
            <router-link to="/imgCollection" custom v-slot="{isActive,navigate}">
                <i class="iconfont icon-ai-img-list" :class="{active:isActive}" @click="navigate"> 圖片收藏</i>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
// import {ref} from 'vue'
</script>

<style lang="scss" scoped>
.header-container{
    display: flex;
    padding: 5px 0;
    background-color: #f0f3f6;
    .websiteCollection{
        margin-left: 15px;
        cursor: pointer;
    }
    .imgCollection{
        margin-left: 25px;
        cursor: pointer;
    }
}
.active{
    color: #fc3d49;
}
</style>