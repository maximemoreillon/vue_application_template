<template>
  <div class="application_template">
    <!-- Actual application only shown if non athenticating or logged in -->
    <!-- Seems like there would need to be a wrapper here for layouting -->

    <transition name="fade" mode="out-in" appear>

      <div
        class="app_content_wrapper"
        v-if="state === 'content'">

        <AppTemplateHeader
          :options="options"
          key="header">
          <!-- Additional header item -->
          <slot name="header"/>
        </AppTemplateHeader>

        <transition name="fade" appear>
          <div
            v-if="nav_open"
            class="nav_background"
            @click="toggle_nav()"/>
        </transition>

        <AppTemplateNav
          v-if="nav_exists"
          key="nav"
          :class="{open: nav_open}">
          <slot name="nav" />
        </AppTemplateNav>

        <AppTemplateMain
          key="main"
          :options="options">
          <slot v-if="$slots.default"/>
        </AppTemplateMain>


      </div>

      <AppTemplateWall
        v-else
        :options="options">

      </AppTemplateWall>



    </transition>

  </div>
</template>

<script>

import AppTemplateHeader from './components/AppTemplateHeader.vue'
import AppTemplateNav from './components/AppTemplateNav.vue'
import AppTemplateMain from './components/AppTemplateMain.vue'
import AppTemplateFooter from './components/AppTemplateFooter.vue'
import AppTemplateWall from './components/AppTemplateWall.vue'


import StoreMixin from './mixins/store.js'

//import axios from 'axios'
import VueCookies from 'vue-cookies'

import 'vue-material-design-icons/styles.css'

// Haven't found a way to import CSS in a rollup package
//import './assets/css/buttons.css'



export default {
  name: 'AppTemplate',
  components: {
    AppTemplateNav,
    AppTemplateHeader,
    AppTemplateMain,
    AppTemplateFooter,
    AppTemplateWall,
  },
  mixins: [
    StoreMixin
  ],
  props: {
    options: Object
  },
  data(){
    return {
    }
  },
  watch: {
    // User is in mixin
    user(){
      this.set_authorization_header()
    }
  },
  mounted(){
    this.set_options(this.options)
    this.set_router_loading_events()
    if(this.options.authenticate) this.get_user()
    else this.set_state('content')
  },
  methods: {

    set_router_loading_events(){
      // Check if router is installed
      if(!this.$router) return

      this.$router.beforeEach((to, from, next) => {
        this.set_route_loading(true)
        next()
      })

      this.$router.afterEach(() => {
        this.set_route_loading(false)
      })
    },

    set_authorization_header(){
      // This might not be the right place for this
      // check if axios is installed
      if(!this.axios) return

      const jwt = VueCookies.get("jwt")

      // wither set or unset the header depending on of jwt being in cookies
      if(jwt) this.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      else delete this.axios.defaults.headers.common['Authorization']

    },

  },
  computed: {
    nav_exists(){
      return !!this.$slots.nav
    },

  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');

* {
  box-sizing: border-box;
}

.material-design-icon__svg {
  bottom: 0 !important;
}

body {
  margin: 0;
  font-family: 'Lexend Deca', Arial, sans-serif;
  background-color: white;
}

.app_content_wrapper{

  position: relative;
  height: 100vh;

  display: grid;
  grid-template-areas:
  'header header'
  'nav main';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  /* needed to hide animated elements coming into the screen */
  overflow: hidden;
}

.columns_wrapper {
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

main {
  grid-area: main;
  /* transitions for what ? */
  //transition: 0.25s;
}

nav {
  padding: 0.5em 0;
  grid-area: nav;
  width: 200px;
  transition: 0.25s;
}

header {
  grid-area: header;
  z-index: 1000;
}

footer {
  grid-area: footer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.rotating {
  animation-name: rotation;
  animation-duration: 60s;
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}

button {
  background-color: transparent;
  color: currentColor;

  cursor: pointer;
  padding: 0.25em 1em;
  transition: 0.25s;
  border: none;
}

button.bordered {
  border: 1px solid currentColor;
}

button:hover:not(:disabled){
  color: #c00000;
}

button.bordered:hover:not(:disabled) {
  background-color: #c0000011;
  border-color: #c00000;
}

button:disabled{
  cursor: not-allowed;
}

.nav_background{
  display: none; /* THIS WILL NOT ANIMATE */

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #00000044;

}

nav:not(.open){

}

@media only screen and (max-width: 800px) {

  .app_content_wrapper {
    grid-template-columns: 0 1fr;
  }

  .nav_background {
    display: block;
  }

  nav {
    /* WARNING: has no proper parent with position relative */
    /* can be solved with columns wrapper */
    position: absolute;

    /*
    top: 0;
    left: 0;
    */
    z-index: 10;

    /* of columns_wrapper */
    /* WARNING: no parent when using grid */
    height: 100%;
  }

  nav::after {
    display: none;
  }

  nav:not(.open){
    transform: translateX(-100%);
  }

  header .navigation_control{
    transform: translateX(0%) !important;

  }


}

</style>
