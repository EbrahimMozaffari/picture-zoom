

<template>
  <main class=" mx-auto">
    <div class="w-full text-center grid grid-cols-7">
      <div class="col-span-7  md:col-span-7  lg:col-span-3 m-3 bg-slate-500 p-3">
        <productSlider />
      </div>
      <div class="col-span-7 md:col-span-7  lg:col-span-4 text-white m-3 ">
        <div class="w-full h-full text-left font-sans bg-white border border-gray-200 rounded-xl shadow  dark:bg-gray-800 dark:border-gray-700 p-5  lg:p-16">
          <p class=" text-gray-500">SAMSUNG</p>
          <p class="text-white mt-2 font-semibold text-lg">Samsung Galaxy S23 Ultra 5G</p>
          <p class="text-white mt-2 font-semibold text-lg mb-3">£500.00</p>
          <hr>
          <p class="mt-2">Slim: Dual SLim</p>
          <p class="mt-2">Condotion: Like New</p>
          <p class="mt-2">Color: LAVENDER</p>
          <p class="mt-2">Network: Locked</p>
          <p class="mt-2">Storage: 512GB</p>
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