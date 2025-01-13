<template>
    <div>
      <!-- 瀑布流布局 -->
      <div class="waterfall">
        <div v-for="(image, index) in imgList" :key="index" class="item">
          <img :src="`../../../../public/unloadImg/${image}`" alt="Uploaded Image" />
        </div>
      </div>
    </div>
  </template>  

<script setup lang="ts">
import {onMounted,ref} from 'vue';

let imgList=ref([])

onMounted(async()=>{
    // @ts-ignore
    let result=await imageHandle.getImg()
    imgList.value=result
    console.log(result);
})
</script>

<style lang="scss" scoped>
/* 瀑布流布局 */
.waterfall {
  //不兼容   
  //display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  //grid-template-rows: masonry;
    column-count: 5;
    column-gap: 5px;
}

.item {
  width: 100%;
  display: block;
  border-radius: 8px;
  padding: 0 10px;
  overflow: hidden;
}

.item img {
  width: 100%;
  display: block;
  object-fit: cover;
  padding: 10px 0;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
</style>