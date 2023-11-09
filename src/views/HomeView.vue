

<template>
  <main class=" mx-auto">
    <div class="w-full text-center">
      <div class="lg:w-1/2 sm:w-1/2 md:w-1/2 w-full">
        <productSlider />
      </div>
      <div class="w-1/2 text-white">
        <p class="text-white">SAMSUNG</p>
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