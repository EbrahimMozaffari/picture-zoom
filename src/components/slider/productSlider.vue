<template>
  <div class="relative">
    <div class="createToDoModal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50" v-if="popUpModal">
      <div class="absolute w-full h-full bg-gray-900 opacity-90" ></div>
  
      <div class="h-5/6 w-11/12  mx-auto rounded-xl relative" >
        <div class="container overflow-hidden md:rounded-xl rounded-xl h-full">
          <div class=" w-full h-full">
              <div class=" relative bg-white rounded-xl shadow h-full " :class="mobile ? 'pt-14': 'pt-5'">
                <ul class="w-1/3 flex mb-0 list-none flex-wrap  pb-4 flex-row"  v-if="!mobile">
                  <li class="-mb-px mr-0 last:mr-0 flex-auto text-center">
                    <a class="text-xs  uppercase px-5 py-3 shadow-lg rounded  block leading-normal text-black  bg-white" v-on:click="toggleTabs(1)" :class="{'text-black  font-bold': openTab !== 1, 'border-b-2 border-b-red-500 font-extrabold': openTab === 1}">
                      Images
                    </a>
                  </li>
                  <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs  uppercase px-5 py-3 shadow-lg rounded  block leading-normal  text-black  bg-white" v-on:click="toggleTabs(2)" :class="{'text-black  font-bold': openTab !== 2, 'border-b-2 border-b-red-500 font-extrabold': openTab === 2}">
                      Video
                    </a>
                  </li>
                </ul>
                <hr />
                      <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}" class="h-full">
                        <div class="p-2 grid grid-cols-4  h-full">
                          <div class="relative lg:col-span-3 col-span-4 h-full overflow-hidden">
                            <transition name="fade">
                              <template v-for="(img, index) in images">
                                  <img  :key="index" ref="popupImage" :style="{ transform: `scale(${scale})`, cursor:isZoomed? 'zoom-out': 'zoom-in' }" style=""     @click="toggleZoom" v-if="popupCurrentIndex == index" class=" absolute z-30  h-full popupImg " :src="img.large" />
                              </template>
                            </transition> 
                          </div>
                          <div class="lg:col-span-1 col-span-4  relative">
                            <div class="bottom-0 order-last grid grid-cols-3">
                              <div v-for="(img, index) in images" :key="index" class="">
                                <img @click="changePopupCurrentImage(index)" :class="popupCurrentIndex == index ? 'activeThumbnail' : ''"  class="imgCustomPopup mx-1 cursor-pointer my-1 " :src="img.medium" />
                              </div>
                            </div>
                          </div>
                               
                          </div>
                      </div>
                      <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}" class="h-full">
                        <div class="p-2 grid grid-cols-4">
                          <div class="relative lg:col-span-3 col-span-4 h-full">
                            <video v-if="videoShow" width="100%" height="240" controls :poster="video[currentVideoIndex].cover"> 
                              <source :src="video[currentVideoIndex].source" type="video/mp4">
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div class="lg:col-span-1 col-span-4  relative">
                            <div class="bottom-0 order-last grid grid-cols-3">
                              <div v-for="(item, index) in video" :key="index" class="">
                                <img @click="changePopupCurrentVideo(index)" :class="currentVideoIndex == index ? 'activeThumbnail' : ''"  class="imgCustomPopup mx-1 cursor-pointer my-1 " :src="item.cover" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                
                <button  @click="popUpModal = !popUpModal" data-modal-hide="popup-modal" type="button" class="absolute   " :class="[mobile? 'left-1 top-1 py-2 px-3 text-black font-bold rounded-lg border border-gray-400': 'right-1 top-1']"><customDelete v-if="!mobile" />{{mobile ? 'Back': ''}}</button>

              </div>
              
          </div>
        </div>
      </div>
  </div>
  <!-- end of modal -->


    <div class="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center left-0 z-40" @click="previous">
      <arrowLeft class="text-black cursor-pointer" />
    </div>
    <div class="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center right-0 z-40" @click="next" >
      <arrowRight class="text-black cursor-pointer" />
    </div>
   
        <div class=" relative " id="slider" :class="[mobile ? 'customMarginLeft mobileHeight':'customMarginLeft desktopHeight']"  
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd" >
         <div 
         class=""
            @mouseenter="mouseOverPicture"  
            @mouseleave="mouseOutPicture" 
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd">
            <transition name="fade">
        <template v-for="(img, index) in images">
            <img  :key="index" ref="myimage" @mousemove="moveLens($event)"  v-if="currentIndex == index" class="imageSlider absolute z-30 block " :src="img.medium" />
        </template>
      </transition> 
      <div ref="lens" v-if="!popUpModal" :style="`top:${lensY}px; left:${lensX}px; width:${lensW}px; height:${lensH}px;`" @click="openPopupModal(currentIndex)" class="lens absolute z-50" :class="lensShow ? 'border border-red-600 border-dashed': ''"></div>
         </div>
        
      <div class=" thumbnail absolute bottom-0 order-last flex " v-if="!mobile" >
        <div v-for="(img, index) in images" :key="index">
          <img @click="changeCurrentImage(index)" :class="currentIndex == index ? 'activeThumbnail' : ''"  class="imgCustom mx-1 cursor-pointer " :src="img.small" />
        </div>
      </div>

    </div>
    <div  class="fixed right-0 top-0 w-3/5 h-full pl-6" :class="[mobile ? '-z-10': `z-${resultIndecx}`,]">
      <div ref="result"   id="myresult" class="img-zoom-result  w-full h-full"></div>

    </div>  
    </div>


</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import arrowRight from '@/components/icons/arrowRight.vue'
import arrowLeft from '@/components/icons/arrowLeft.vue'
import customDelete from '@/components/icons/iconCustomDelete.vue'

const lensShow = ref(false)
const currentIndex = ref(0)
const images = ref([
    // {small:'/images/p2-1-small.jpg',medium:'/images/p2-1-medium.jpg',larg:'/images/p2-1-larg.jpg'},
    // {small:'/images/p2-2-small.jpg',medium:'/images/p2-2-medium.jpg',larg:'/images/p2-2-larg.jpg'},
    {small:'/images/product-image-thumbnail.jpeg',medium:'/images/product-image.jpeg',large:'/images/product-image-large.jpeg'},
    {small:'/images/product-image-back-thumbnail.jpeg',medium:'/images/product-image-back.jpeg',large:'/images/product-image-back-large.jpeg'},
    {small:'/images/product-image-front-thumbnail.jpeg',medium:'/images/product-image-front.jpeg',large:'/images/product-image-front-large.jpeg'},


])

const video= ref([
  {cover:'https://picsum.photos/id/500/600/450',source:'/video/video-01.mp4'},
  {cover:'https://picsum.photos/id/550/600/450',source:'/video/video-02.mp4'},
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
const popUpModal = ref(false)
const mobile = ref(false)
const popupCurrentIndex = ref(0)
const touchState = ref({
  startX: 0,
  startY: 0,
  isSwiping: false,
});
const scale = ref(1);
const isZoomed = ref(false)
const popupImage = ref(null)
const openTab = ref(1)
const currentVideoIndex = ref(0)
const videoShow = ref(true)
const resultIndecx = ref(10)

// const originalTransform = ref('');
// let zoomed = false; // اضافه شده

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
  if(window.innerWidth<1024){
    mobile.value=true
  }else{
    mobile.value=false
  }
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
    resultIndecx.value = 50
      lensShow.value = true
      result.value.style.backgroundImage = "url('" + images.value[currentIndex.value].large + "')";
  }

  //messureSize()
}
const mouseOutPicture =()=>{
  resultIndecx.value = 10
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
    result.value.style.backgroundRepeat = 'no-repeat'
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
const changePopupCurrentImage = (index)=>{
   //messureSize()
  popupCurrentIndex.value = index;  
  isZoomed.value = false
    scale.value = 1
  //console.log(myimage.value);
  
}
const resizeHandler = ()=>{
  // let h =  window.innerHeight;
  // let w =  window.innerWidth;
  lensW.value = window.innerWidth/10
  lensH.value = window.innerHeight/4
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
 
  touchState.value.isSwiping = false;
};

const openPopupModal = (index) => {
  
  mouseOutPicture()
  popupCurrentIndex.value = index
  popUpModal.value = true
};

const handleZoom = (event) => {
  const image = event.target;
  const { left, top, width, height } = image.getBoundingClientRect();
  const x = (event.clientX - left) / width;
  const y = (event.clientY - top) / height;

  const zoomFactor = 2;
  scale.value = zoomFactor;

   image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
};

const toggleZoom = (event) => {
 
  if(!isZoomed.value){
    handleZoom(event)
    isZoomed.value = true
  }else{
    isZoomed.value = false
    scale.value = 1
    
  }
};
const toggleTabs = (index) => {
  openTab.value = index
};

const changePopupCurrentVideo = (index) => {
  currentVideoIndex.value = index
  videoShow.value =false
  setTimeout(()=>{
    videoShow.value =true
  },100)
  
};

</script>

<style scoped>
.popupImg {
  transition: transform 0.3s ease-in-out;
  
  max-width: 100% !important;
  max-height: 100% !important;
  
}
.lens{
  position: absolute;
  /*set the size of the lens:*/
  width: 150px;
  height: 100px;

}


#slider{
  text-align: center;
     
    
}
.desktopHeight{
  height: 520px;
}
.mobileHeight{
  height: 375px;
}
.customMarginLeft{
  margin-left: 50px;
  margin-right: 50px;
}
.imageSlider{
   
    max-width: 100%;
    max-height: 360px;
    width: auto;
    /* margin: 0 auto !important; */
    
   /* height: 450px; */
}
.activeThumbnail{
    border: 1px #eb5541  solid;
}
.imgCustomPopup{
 
  max-height: 100px;
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