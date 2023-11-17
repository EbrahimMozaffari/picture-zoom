

<template>
  <main class=" mx-auto container">
    <div class="w-full text-center grid grid-cols-7">
      <div class="col-span-7  md:col-span-7  lg:col-span-3 m-3 bg-white p-3">
        <productSlider />
      </div>
      <div class="col-span-7 md:col-span-7  lg:col-span-4  z-20">
        <div class="w-full h-full  font-sans p-5  lg:pl-16">
          <div class="text-left">
            <p class="text-gray-500 ">SAMSUNG</p>
          <p class=" mt-2  text-lg lg:text-xl	font-bold">Samsung Galaxy S23 Ultra 5G</p>
          <p class=" mt-2 font-bold text-lg lg:text-xl  mb-3">£500.00</p>
          <hr class="w-full h-1 mx-auto my-2   md:my-5 bg-gray-400 ">
          <p class="mt-5">Slim: Dual SLim</p>
          <p class="mt-5">Condotion: Like New</p>
          <p class="mt-5">Color: LAVENDER</p>
          <p class="mt-5">Network: Locked</p>
          <p class="mt-5">Storage: 512GB</p>
          <hr class="w-full h-1 mx-auto my-2   md:my-5 bg-gray-400 ">
          <div class="pt-6">
            <button class="text-4xl lg:text-4xl	p-2 cursor-pointer text-black" @click="decrease">-</button>
            <span class="px-4 py-2 lg:px-8 lg:py-6 bg-gray-300">{{ number }}</span>
            <button class="text-4xl lg:text-4xl	p-2 cursor-pointer text-black" @click="increase">+</button>
          </div>
          </div>
          
          <button class="customBg rounded lg:w-full mx-auto w-full text-black  lg:text-l	font-bold mt-10 p-2">
            Add to Basket
          </button>
        </div>
        
      </div>
      
    </div>
    
  </main>
</template>

<script setup>

import { onMounted, ref } from 'vue';

import productSlider from '../components/slider/productSlider.vue';
const number = ref(1)

const increase = ()=>{
    number.value++
}
const decrease = ()=>{
  if( number.value >1){
    number.value--
  }
}
</script>

<style scoped>
.customBg{
  background: #ffd712;
}
</style>