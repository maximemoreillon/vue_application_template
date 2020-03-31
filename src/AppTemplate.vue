<template>
  <div class="application_wrapper">

    <header>
      <!-- hamburger to open and close navigation -->
      <template v-if="navigation.length > 0 || this.$slots.navigation">
        <backburger-icon
          class="navigation_control button"
          v-if="navigation_open"
          v-on:click="toggle_navigation()"/>
        <menu-icon
          class="navigation_control button"
          v-else
          v-on:click="toggle_navigation()"/>
      </template>

      <!-- Logo -->
      <!-- TODO: Serve a local logo -->
      <img
        class="rotating_logo"
        src="https://cdn.maximemoreillon.com/logo/thick/logo.svg"
        alt="Logo">

      <!-- application title -->
      <span class="application_name">{{applicationName}}</span>

      <!-- Login status-->
      <LoginStatus
        class="aligned_right"
        v-if="!noLoginControls"/>


    </header>


    <nav
      v-if="(navigation.length > 0 || this.$slots.navigation)"
      v-bind:class="{open: navigation_open}">

      <!-- navigation items can be passed using this slot -->
      <slot name="navigation" />

    </nav>

    <div
      class="nav_background"
      v-bind:class="{visible: navigation_open}"
      v-on:click="close_navigation()"/>

    <!-- Main. Note: footer is part of main -->
    <main>

      <!-- slot to add content in the main -->
      <slot />

      <!-- footer -->
      <footer>
        <img
          class="rotating_logo"
          src="https://cdn.maximemoreillon.com/logo/thick/logo.svg"
          alt="Logo">
        <div class="application_info">
          <div class="application_name">{{applicationName}}</div>
          <div class="author_name">Maxime MOREILLON</div>
        </div>
      </footer>


    </main>



  </div>
</template>

<script>

import VueCookies from 'vue-cookies'

import BackburgerIcon from 'vue-material-design-icons/Backburger.vue';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import LoginIcon from 'vue-material-design-icons/Login.vue';
import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import LoginStatus from '@moreillon/vue_login_status'

export default {
  name: 'AppTemplate',
  components: {
    BackburgerIcon,
    MenuIcon,
    LoginIcon,
    LogoutIcon,
    LoginStatus
  },
  props: {
    applicationName: {
      type: String,
    },
    navigation: {
      type: Array,
      default(){
        return []
      },
    },
    slotted: {
      type: Boolean,
      default() {
        return false
      }
    },
    noLoginControls: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data(){
    return {
      navigation_open: false,
    }
  },
  mounted(){

  },
  methods: {
    toggle_navigation(){
      this.navigation_open = !this.navigation_open;
    },
    close_navigation(){
      this.navigation_open = false;
    },
    logout(){
      VueCookies.remove('jwt')
      // Not very elegant way to deal with this
      location.reload()
    },
    login(){
      location.href = "https://authentication.maximemoreillon.com/"
    },
  },
  computed: {
    navigation_control_icon(){
      if(this.navigation_open) return "mdi-backburger"
      else return "mdi-menu"
    },

    logged_in(){
      if(VueCookies.get('jwt')) return true
      return false
    },

  }
}
</script>

<!-- Not scoped so as to access body and app -->
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.application_wrapper{

  /* Forgot what for */
  position: relative;

  /* font parameters */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* default text color */
  color: #111111;

  /* span all viewport vertically*/
  height: 100vh;
  width: 100%;

  /* vertical layout */
  display: grid;
  grid-template-areas:
    'header header'
    'nav main';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
}

.rotating_logo {
  animation-name: logo_rotation;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes logo_rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

/* HEADER */
header {
  grid-area: header;

  /* flex for content */
  display: flex;
  align-items: stretch;

  /* shadows */
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  position: relative;
  z-index: 11;

  /* coloring and sizing */
  background-color: #444444;
  color: white;
  font-size: 150%;

}

header > * {
  display: flex;
  align-items: center;

  margin: 10px;

  /* keep only one margin width between elements */
  margin-right: 0px;
}

header > *:last-child {
  margin-right: 10px;
}

header .rotating_logo {
  width: 35px;
}

header .aligned_right{
  margin-left: auto
}

header .button{
  cursor: pointer;
}

header .button:hover{
  color: #dddddd;
}

header .navigation_control{
  transform: translateX(-200%);
  transition: transform 0.5s;
}



/* NAV */
nav {

  grid-area: nav;
  width: 200px;

  /* for the border not to hit the header and the bottom of the page */
  margin: 15px 0;

  /* vertical layout using flex */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid #dddddd;

  /* additional visuals */
  background-color: white;
  transition: transform 0.5s;
}

nav a {
  font-size: 120%;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  /* vertical space between nav items */
  padding: 15px 0;

  text-decoration: none;
  color: #111111;

  border-right: 3px solid transparent;
  transition: color 0.25s, border-color 0.25s;
}

nav a > * {
  /* aligning icons and text */
  display: flex;
  align-items: center;
  justify-content: center;
}

nav a > *:not(:last-child) {
  margin-right: 5px;
}


nav a:hover {
  border-right: 3px solid #666666;
  color: #666666;
}
nav a.router-link-exact-active {
  border-right: 3px solid #c00000;
}

nav .mdi {
  /* space between icon and text */
  margin-right: 5px;
}

.nav_background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
}

main {

  grid-area: main;
  position: relative;

  /* grow horizontally */
  flex-grow: 1;
  flex-shrink: 1;

  /* vertical layout */
  display: flex;
  flex-direction: column;


  /* scroll only on main */
  /* NOT WORKING */
  overflow-y: auto;


}

/* selector a bit dangerous */
main > *:first-child{

  flex-grow: 1;

  padding: 25px 2vw;
}


footer {

  /* clearing the nav bar and leaving space for the border top*/
  margin: 0 10%;

  border-top: 1px solid #dddddd;

  padding: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

}

footer .rotating_logo {
  width: 40px;
}

footer .application_info{
  margin-left: 10px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #c00000;
}


@media only screen and (max-width: 800px) {

  .application_wrapper {
    grid-template-columns: 0 1fr;
  }

  nav {
    /* transform margin into padding */
    /* This creates a gap between the border and the surrounding elements */
    margin: 0;
    padding: 15px 0;

    border: none;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: 200px; /* matching flex basis */

  }

  nav:not(.open){
    transform: translateX(-100%);
  }

  .nav_background.visible {
    opacity: 0.5;
    visibility: visible;;
  }

  header .navigation_control{
    transform: translateX(0%);

  }
}

/* Hide footer and header on small screens */
@media only screen and (max-height: 400px) {
  header {
    display: none !important;
  }
  footer {
    display: none !important;
  }

}

</style>
