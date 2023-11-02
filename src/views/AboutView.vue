

<template>
  <main class="container mx-auto">
    <div class="w-full text-center">
      <div class="lg:w-1/2 sm:w-full md:w-1/2">
        <!-- <slider /> -->
        <productSlider />
      </div>
      <div class="w-1/2">
        <div class="img-zoom-container">
          <div class="relative">
            <img id="myimage" ref="myimage" @mousemove="moveLens($event)" src="https://picsum.photos/id/230/600/300" >
            <div ref="lens" :style="`top:${lensY}px; left:${lensX}px`" class="lens"></div>
          </div>
          
          <div ref="result" id="myresult" class="img-zoom-result"></div>
        </div>
      </div>
      
    </div>
    
  </main>
</template>

<script setup>
// import newMainSliderVue from '@/components/product/newMainSlider.vue';
import { onMounted, ref } from 'vue';
const myimage = ref(null)
const lens = ref(null)
const result = ref(null)
const lensX = ref(0)
const lensY = ref(0)
const cx  = ref(0)
const cy = ref(0)
import productSlider from '../components/slider/productSlider.vue';
// import slider from '../components/product/slider.vue';
const mouseMoving = (e)=>{
 
  // let xy =  getCursorPos(e)
  // lensY.value = xy.y
  // lensX.value = xy.x
   //console.log(xy);
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
    if (x > myimage.value.width - lens.value.offsetWidth) {x = myimage.value.width - lens.value.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > myimage.value.height - lens.value.offsetHeight) {y = myimage.value.height - lens.value.offsetHeight;}
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
    a = myimage.value.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  //console.log(e);
}

onMounted(()=>{
  /*calculate the ratio between result DIV and lens:*/
  setTimeout(()=>{
      cx.value = result.value.offsetWidth / lens.value.offsetWidth;
  cy.value = result.value.offsetHeight / lens.value.offsetHeight;
  console.log("cx.value",cx.value,"-> cy.value",cy.value);
    //result.value.style.backgroundImage = "url('" + myimage.value.src + "')";
result.value.style.backgroundImage = "url('https://picsum.photos/id/230/1200/600')";
    result.value.style.backgroundSize = (myimage.value.width * cx.value) + "px " + (myimage.value.height * cy.value) + "px";
  },1000)


})


</script>

<style scoped>
.lens{
  position: absolute;
  border: 1px solid #ff0808;
  /*set the size of the lens:*/
  width: 150px;
  height: 100px;
  top: 0;
  right: 0;
}
.img-zoom-container {
  position: relative;
}

.img-zoom-lens {
  position: absolute;
  border: 1px solid #d4d4d4;
  /*set the size of the lens:*/
  width: 40px;
  height: 40px;
}

.img-zoom-result {
  border: 1px solid #d4d4d4;
  /*set the size of the result div:*/
  width: 600px;
  height: 300px;
}

</style>