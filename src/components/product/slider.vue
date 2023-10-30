<template>
    <div class="container relative   grid content-center" id="slider">
           <div class=" z-40 w-full flex justify-between ">
            <button class="text-white bg-slate-600 rounded-full" @click="previous"><arrowLeft /></button>
            <button class="text-white mr-2 bg-slate-600 rounded-full" @click="next"><arrowRight /></button>    
         </div>
        <transition name="fade">
        <template v-for="(img, index) in images">
            <img :key="index"  v-if="currentIndex == index" class="imageSlider absolute" :src="img" />
        </template>
      </transition> 
      <div class="relative">ddd</div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import arrowRight from '@/components/icons/arrowRight.vue'
import arrowLeft from '@/components/icons/arrowLeft.vue'

const show = ref(false)
const currentIndex = ref(0)
const images = ref([
    '/images/img_girl.jpg',
    '/images/p1-1-big.jpg',
    '/images/carousel-3.svg',
    '/images/carousel-4.svg',
])

const next = ()=>{
    //currentIndex.value ++;
        if(++currentIndex.value > images.value.length -1){
            currentIndex.value = 0;     
        }
    
}
const previous = ()=>{
    if(--currentIndex.value < 0){
        currentIndex.value = (images.value.length -1);
    }
}

</script>

<style scoped>
#slider{
    height: 400px;
}
.imageSlider{
    left: 0;
    width: 100%;
    height: 100%;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>