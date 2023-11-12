

<template>
  <main class=" mx-auto">
    <div class="w-full text-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <div class="">
        <productSlider />
      </div>
      <div class=" text-white">
        <div class="w-3/4 mx-auto font-sans bg-white border border-gray-200 rounded-xl shadow  dark:bg-gray-800 dark:border-gray-700 p-3 ">
          <p class="text-white">SAMSUNG</p>
        </div>
        
      </div>
      
    </div>
    
  </main>
</template>

<script setup>

import { onMounted, ref } from 'vue';

import productSlider from '../components/slider/productSlider.vue';


</script>

<style scoped>

</style>