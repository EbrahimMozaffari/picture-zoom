<template>
    <div class="container relative flex justify-end" id="slider">
           <div class=" z-40 w-full h-full  flex justify-between absolute">
            <button class="h-full"  @click="previous"><arrowLeft class="text-white bg-slate-600 rounded-full " /></button>
            <button  @click="next"><arrowRight class="text-white mr-2 bg-slate-600 rounded-full" /></button>    
         </div>
         <div>
            <transition name="fade">
        <template v-for="(img, index) in images">
            <img  :key="index"  v-if="currentIndex == index" class="imageSlider absolute" :src="img.medium" />
        </template>
      </transition> 
         </div>
        
      <div class="thumbnail absolute bottom-0 order-last flex z-50">
        <div v-for="(img, index) in images" :key="index">
          <img @click="changeCurrentImage(index)" :class="currentIndex == index ? 'activeThumbnail' : ''"  class="imgCustom mx-1 cursor-pointer " :src="img.small" />
      </div>
      </div>
      <div class="fixed right-0 w-1/2">


      </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import arrowRight from '@/components/icons/arrowRight.vue'
import arrowLeft from '@/components/icons/arrowLeft.vue'

const show = ref(false)
const currentIndex = ref(0)
const images = ref([
    {small:'https://picsum.photos/id/230/60/45',medium:'https://picsum.photos/id/230/600/450',larg:'https://picsum.photos/id/230/900/700'},
    {small:'https://picsum.photos/id/231/60/45',medium:'https://picsum.photos/id/231/600/450',larg:'https://picsum.photos/id/231/900/700'},
    {small:'https://picsum.photos/id/232/60/45',medium:'https://picsum.photos/id/232/600/450',larg:'https://picsum.photos/id/232/900/700'},
    {small:'https://picsum.photos/id/233/60/45',medium:'https://picsum.photos/id/233/600/450',larg:'https://picsum.photos/id/233/900/700'},
    {small:'https://picsum.photos/id/234/60/45',medium:'https://picsum.photos/id/234/600/450',larg:'https://picsum.photos/id/234/900/700'},


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


// onMounted(()=>{


// imageZoom("myimage", "myresult");
// function imageZoom(imgID, resultID) {
//   var img, lens, result, cx, cy;
//   img = document.getElementById(imgID);
//   result = document.getElementById(resultID);
//   /*create lens:*/
//   lens = document.createElement("DIV");
//   lens.setAttribute("class", "img-zoom-lens");
//   /*insert lens:*/
//   img.parentElement.insertBefore(lens, img);
//   /*calculate the ratio between result DIV and lens:*/
//   cx = result.offsetWidth / lens.offsetWidth;
//   cy = result.offsetHeight / lens.offsetHeight;
//   /*set background properties for the result DIV:*/
//   result.style.backgroundImage = "url('" + img.src + "')";
//   result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
//   /*execute a function when someone moves the cursor over the image, or the lens:*/
//   lens.addEventListener("mousemove", moveLens);
//   img.addEventListener("mousemove", moveLens);
//   /*and also for touch screens:*/
//   lens.addEventListener("touchmove", moveLens);
//   img.addEventListener("touchmove", moveLens);
//   function moveLens(e) {
//     var pos, x, y;
//     /*prevent any other actions that may occur when moving over the image:*/
//     e.preventDefault();
//     /*get the cursor's x and y positions:*/
//     pos = getCursorPos(e);
//     /*calculate the position of the lens:*/
//     x = pos.x - (lens.offsetWidth / 2);
//     y = pos.y - (lens.offsetHeight / 2);
//     /*prevent the lens from being positioned outside the image:*/
//     if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
//     if (x < 0) {x = 0;}
//     if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
//     if (y < 0) {y = 0;}
//     /*set the position of the lens:*/
//     lens.style.left = x + "px";
//     lens.style.top = y + "px";
//     /*display what the lens "sees":*/
//     result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
//   }
//   function getCursorPos(e) {
//     var a, x = 0, y = 0;
//     e = e || window.event;
//     /*get the x and y positions of the image:*/
//     a = img.getBoundingClientRect();
//     /*calculate the cursor's x and y coordinates, relative to the image:*/
//     x = e.pageX - a.left;
//     y = e.pageY - a.top;
//     /*consider any page scrolling:*/
//     x = x - window.pageXOffset;
//     y = y - window.pageYOffset;
//     return {x : x, y : y};
//   }
// }

// })



</script>

<style scoped>


#slider{
    height: 520px;
}
.imageSlider{
    left: 0;
    width: 100%;
    height: 450px;
}
.activeThumbnail{
    border: 1px #e6eb41  solid;
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