<template>
  <div class="relative"     >
    <!-- <button class="z-50 absolute left-0"  @click="previous"><arrowLeft class="text-white bg-slate-600 rounded-full " /></button>
    <button class="z-50 absolute right-0"  @click="next"><arrowRight class="text-white mr-2 bg-slate-600 rounded-full" /></button>     -->
    <div class="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center left-0 z-50" @click="previous"
    >
      <arrowLeft class="text-white bg-slate-600 rounded-full cursor-pointer" />
    </div>
    <div class="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center right-0 z-50" @click="next" >
      <arrowRight class="text-white mr-2 bg-slate-600 rounded-full cursor-pointer" style="" />
    </div>
   
        <div class=" relative flex justify-end" id="slider" >
         <div 
            @mouseenter="mouseOverPicture"  
            @mouseleave="mouseOutPicture" 
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd">
            <transition name="fade">
        <template v-for="(img, index) in images">
            <img  :key="index" ref="myimage" @mousemove="moveLens($event)"  v-if="currentIndex == index" class="imageSlider absolute z-40" :src="img.medium" />
        </template>
      </transition> 
      <div ref="lens" :style="`top:${lensY}px; left:${lensX}px; width:${lensW}px; height:${lensH}px;`" class="lens z-50" :class="lensShow ? 'border border-red-600 border-dashed': ''"></div>
         </div>
        
      <div class="thumbnail absolute bottom-0 order-last flex z-50">
        <div v-for="(img, index) in images" :key="index">
          <img @click="changeCurrentImage(index)" :class="currentIndex == index ? 'activeThumbnail' : ''"  class="imgCustom mx-1 cursor-pointer " :src="img.small" />
        </div>
      </div>
      <div  class="fixed right-0 w-1/2 h-full">
        <div ref="result"   id="myresult" class="img-zoom-result  w-full h-full"></div>

      </div>
    </div>
  </div>


</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import arrowRight from '@/components/icons/arrowRight.vue'
import arrowLeft from '@/components/icons/arrowLeft.vue'

const lensShow = ref(false)
const currentIndex = ref(0)
const images = ref([
    // {small:'/images/p2-1-small.jpg',medium:'/images/p2-1-medium.jpg',larg:'/images/p2-1-larg.jpg'},
    // {small:'/images/p2-2-small.jpg',medium:'/images/p2-2-medium.jpg',larg:'/images/p2-2-larg.jpg'},
    {small:'https://picsum.photos/id/230/60/45',medium:'https://picsum.photos/id/230/600/450',larg:'https://picsum.photos/id/230/3200/2400'},
    {small:'https://picsum.photos/id/231/60/45',medium:'https://picsum.photos/id/231/600/450',larg:'https://picsum.photos/id/231/3200/2400'},
    {small:'https://picsum.photos/id/232/60/45',medium:'https://picsum.photos/id/232/600/450',larg:'https://picsum.photos/id/232/3200/2400'},
    {small:'https://picsum.photos/id/233/60/45',medium:'https://picsum.photos/id/233/600/450',larg:'https://picsum.photos/id/233/3200/2400'},
    {small:'https://picsum.photos/id/234/60/45',medium:'https://picsum.photos/id/234/600/450',larg:'https://picsum.photos/id/234/3200/2400'},


])

const myimage = ref(null)
const lens = ref(null)
const result = ref(null)
const lensX = ref(0)
const lensY = ref(0)
const lensW = ref(100)
const lensH = ref(150)
const cx  = ref(0)
const cy = ref(0)

const touchState = ref({
  startX: 0,
  startY: 0,
  isSwiping: false,
});



onMounted(()=>{
  /*calculate the ratio between result DIV and lens:*/
  resizeHandler();
  messureSize();
  window.addEventListener("resize", resizeHandler);

})
onUnmounted(()=>{
  window.removeEventListener("resize", resizeHandler);
})

const messureSize = ()=>{

  setTimeout(()=>{
  cx.value = result.value.offsetWidth / lens.value.offsetWidth;
  cy.value = result.value.offsetHeight / lens.value.offsetHeight;
 // console.log("cx.value",cx.value,"-> cy.value",cy.value);
 // result.value.style.backgroundImage = "url('" + images.value[currentIndex.value].larg + "')";
result.value.style.backgroundSize = (myimage.value[0].width * cx.value) + "px " + (myimage.value[0].height * cy.value) + "px";
  },1000)

}
const mouseOverPicture =()=>{
  if(window.innerWidth>1024){
      lensShow.value = true
      result.value.style.backgroundImage = "url('" + images.value[currentIndex.value].larg + "')";
  }

  //messureSize()
}
const mouseOutPicture =()=>{
  lensShow.value = false
  result.value.style.backgroundImage = ''
}
const moveLens = (e)=> {

    let pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    //console.log("lens.offsetWidth",lens.value.offsetWidth);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.value.offsetWidth / 2);
    y = pos.y - (lens.value.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > myimage.value[0].width - lens.value.offsetWidth) {x = myimage.value[0].width - lens.value.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > myimage.value[0].height - lens.value.offsetHeight) {y = myimage.value[0].height - lens.value.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    //console.log(x,y);
      lensY.value = y
      lensX.value = x
    // lens.style.left = x + "px";
    // lens.style.top = y + "px";
    /*display what the lens "sees":*/

    result.value.style.backgroundPosition = "-" + (x * cx.value) + "px -" + (y * cy.value) + "px";
  }
const getCursorPos = (e)=>{
      let a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = myimage.value[0].getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  //console.log(e);
}
const next = ()=>{
    //currentIndex.value ++;
        if(++currentIndex.value > images.value.length -1){
            currentIndex.value = 0;     
        }
        messureSize()
}
const previous = ()=>{
    if(--currentIndex.value < 0){
        currentIndex.value = (images.value.length -1);
    }
    messureSize()
}

const changeCurrentImage = (index)=>{
   //messureSize()
  currentIndex.value = index;  
  //console.log(myimage.value);
  
}

const resizeHandler = ()=>{
  // let h =  window.innerHeight;
  // let w =  window.innerWidth;
  lensW.value = window.innerWidth/20
  lensH.value = window.innerHeight/10
  messureSize();

}

const touchStart = (e) => {
  touchState.value = {
    startX: e.touches[0].clientX,
    startY: e.touches[0].clientY,
    isSwiping: false,
  };
};


const touchMove = (e) => {
  const diffX = e.touches[0].clientX - touchState.value.startX;
  
  if (!touchState.value.isSwiping ) {
    touchState.value.isSwiping = true;

    if (diffX > 0) {
      // Swipe right
      next();
    } else {
      previous();
      // Swipe left
      
    }
  }

  touchState.value.startX = e.touches[0].clientX;
  touchState.value.startY = e.touches[0].clientY;
};

const touchEnd = () => {
  // Additional touch end logic if needed
  touchState.value.isSwiping = false;
};



</script>

<style scoped>
.lens{
  position: absolute;
  /*set the size of the lens:*/
  width: 150px;
  height: 100px;
  top: 0;
  right: 0;
}


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