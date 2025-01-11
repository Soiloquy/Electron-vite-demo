<template>
    <div v-if="show" class="mask">
      <div class="mask-content">
        <slot>
          <div class="default-loading">Loading...</div>
        </slot>
      </div>
    </div>
  </template>

<script setup lang="ts">
import {defineProps} from 'vue';

const props=defineProps({
    show:Boolean
})

console.log(props);

</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .mask-content {
    text-align: center;
    color: white;
  }
  
  .default-loading {
    font-size: 1.2rem;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
  }
</style>
  