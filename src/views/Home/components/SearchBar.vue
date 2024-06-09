<template>
    <div class="search-container">
        <div class="button">+</div>
        <div class="input">
            <input type="text" placeholder="请输入关键字">
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'


</script>

<style lang="scss" scoped>
.search-container{
    height: 60px;
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>