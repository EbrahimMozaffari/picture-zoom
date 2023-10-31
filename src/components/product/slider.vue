<template>
    <div class="container relative flex flex-col justify-between" id="slider">
           <div class=" z-40 w-full h-full  flex justify-between">
            <button class="h-full"  @click="previous"><arrowLeft class="text-white bg-slate-600 rounded-full " /></button>
            <button  @click="next"><arrowRight class="text-white mr-2 bg-slate-600 rounded-full" /></button>    
         </div>
        <transition name="fade">
        <template v-for="(img, index) in images">
            <img :key="index"  v-if="currentIndex == index" class="imageSlider absolute" :src="img" />
        </template>
      </transition> 
      <div class="thumbnail">
        <div v-for="(img, index) in images" :key="index">
          <img @click="changeCurrentImage(index)"  width="50" height="50"  class="imgCustom mx-1 cursor-pointer " :src="img" />
      </div>
      </div>
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
    '/images/img_girl.jpg',
    '/images/p1-1-big.jpg',
    '/images/carousel-3.svg',
    '/images/carousel-4.svg',
    '/images/img_girl.jpg',
    '/images/p1-1-big.jpg',
    '/images/carousel-3.svg',
    '/images/carousel-4.svg',
    '/images/img_girl.jpg',
    '/images/p1-1-big.jpg',
    '/images/carousel-3.svg',
    '/images/carousel-4.svg',
    '/images/img_girl.jpg',
    '/images/p1-1-big.jpg',
    '/images/carousel-3.svg',
    '/images/carousel-4.svg',
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

const changeCurrentImage = (index)=>{
  currentIndex.value = index;  
}
</script>

<style scoped>

.imgCustom{
  width: 70px !important;
  height: 60px !important;
}
#slider{
    height: 500px;
}
.imageSlider{
    left: 0;
    width: 100%;
    height: 450px;
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