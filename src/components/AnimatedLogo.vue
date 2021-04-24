<template>
  <!-- Logo wrapper for global rotation -->
  <div class="logo_wrapper">

    <!-- The full logo that overlays with the parts once animation is done
     This is used to hide seams between logo parts -->
    <div class="logo_layer logo_layer_full">
      <img class="logo_part logo_full" src="../assets/img/logo/logo.svg">
    </div>

    <!-- Logo layers that can rotate independantly -->
    <div class="logo_layer logo_layer_1">
      <img class="logo_part logo_part_1" src="../assets/img/logo/parts/1.svg">
      <img class="logo_part logo_part_2" src="../assets/img/logo/parts/2.svg">
      <img class="logo_part logo_part_3" src="../assets/img/logo/parts/3.svg">
    </div>
    <div class="logo_layer logo_layer_2">
      <img class="logo_part logo_part_4" src="../assets/img/logo/parts/4.svg">
      <img class="logo_part logo_part_5" src="../assets/img/logo/parts/5.svg">
      <img class="logo_part logo_part_6" src="../assets/img/logo/parts/6.svg">
    </div>
    <div class="logo_layer logo_layer_3">
      <img class="logo_part logo_part_7" src="../assets/img/logo/parts/7.svg">
      <img class="logo_part logo_part_8" src="../assets/img/logo/parts/8.svg">
      <img class="logo_part logo_part_9" src="../assets/img/logo/parts/9.svg">
    </div>



  </div>
</template>

<script>
export default {
  name: 'AnimatedLogo',
  data(){
    return {
      window_loaded: false,
    }
  },
  mounted(){
    window.onload = function() {
      document.body.classList.add("loaded");
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo_wrapper{
  /* This is a rotating frame for all logo elements */

  /* IE compatibility */
  position: relative;

  /* centering */
  display: flex;
  justify-content: center;
  align-items: center;

  /* overall rotation of the logo */
  animation-name: rotation;
  animation-duration: 100s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}


/* Layouting */
.logo_layer {

  /* positioning and sizing */
  position: absolute;
  width: 100%;
  height: 100%;

  /* Needed for IE */
  top: 0;
  left: 0;

  /* centering content*/
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0; /* needs to be transparent until loading complete */

  /* animations */
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-fill-mode: both;
}

.logo_part {

  /* positioning and sizing */
  position: absolute;
  width: 100%;
  height: 100%;

  /* Needed for IE */
  top: 0;
  left: 0;

}

.logo_layer_full {
  z-index: 10;
}



body.loaded .logo_layer_1  {
  animation-name: layer_1_apparition;
  animation-delay: 0;
  animation-duration: 1.5s;
}

body.loaded .logo_layer_2 {
  animation-name: layer_2_apparition;
  animation-delay: 0.25s;
  animation-duration: 1.25s;
}

body.loaded .logo_layer_3{
  animation-name: layer_3_apparition;
  animation-delay: 0.5s;
  animation-duration: 1s;
}

/* overlay of full logo */
body.loaded .logo_layer_full{
  animation-name: fade;
  animation-duration: 0.5s;
  animation-delay: 1.5s;
}


/* ANIMATIONS */
@keyframes rotation {
  0%   {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes layer_1_apparition {
  0%   {
    opacity: 0;
    transform: scale(1.5) rotate(540deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes layer_2_apparition {
  0%   {
    opacity: 0;
    transform: scale(1.5) rotate(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(360deg);
  }
}

@keyframes layer_3_apparition {
  0%   {
    opacity: 0;
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

</style>
