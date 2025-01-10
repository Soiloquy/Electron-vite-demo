<template>
    <SearchBar></SearchBar>
    <Teleport to="body">
        <Dialog></Dialog>
    </Teleport>
    <List></List>
</template>

<script setup lang="ts">
import {ref,provide} from 'vue'
import SearchBar from './components/SearchBar.vue';
import Dialog from './components/Dialog.vue';
import List from './components/List.vue';

// 控制dialog顯示與隱藏
const dialogIsShow=ref(false)
const changeDialogStatus=(value:boolean)=>{
    dialogIsShow.value=value
}

provide('dialogShow',{
    dialogIsShow,
    changeDialogStatus
})

// searcbar
const keyWords=ref('')
const searchKeyWords=(value:any)=>{
    console.log(value);
    keyWords.value=value
}

provide('itemTitleSearch',{
    keyWords,
    searchKeyWords
})
</script>

<style lang="scss" scoped>

</style>