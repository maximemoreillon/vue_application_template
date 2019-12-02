<template>
  <div class="application_wrapper">

    <header>
      <!-- hamburger to open navigation -->
      <span
        v-if="navigation.length > 0"
        class="mdi navigation_control button"
        v-bind:class="navigation_control_icon"
        v-on:click="toggle_navigation()"/>

      <!-- Logo -->
      <img class="rotating_logo" src="https://cdn.maximemoreillon.com/logo/thick/logo.svg" alt="">

      <!-- application title -->
      <span class="application_name">{{applicationName}}</span>

      <!-- Logout button -->
      <span
        v-if="!noLoginControls"
        class="mdi mdi-logout aligned_right button"
        v-on:click="logout()"/>

    </header>

    <!-- Not using grid so need an additional wrapper -->
    <div class="columns_wrapper">

      <!-- left column : Nav -->
      <nav
        v-if="navigation.length > 0"
        v-bind:class="{open: navigation_open}">

        <!-- NAV items must be passed as props -->
        <router-link
          v-for="(navigationItem, index) in navigation"
          v-bind:key="index"
          v-bind:to="navigationItem.route">

          <!-- Why have the onclick here? -->
          <!-- Why have the icon and the text in the same span? -->
          <span
            class="mdi"
            v-bind:class="'mdi-' + navigationItem.icon"
            v-on:click="close_navigation()">
            {{navigationItem.label}}
          </span>

        </router-link>
      </nav>

      <div
        class="nav_background"
        v-bind:class="{visible: navigation_open}"
        v-on:click="close_navigation()"/>

      <!-- Main. Note: footer is part of main -->
      <main>
        <router-view class="router_view"/>

        <!-- footer -->
        <footer>
          <img class="rotating_logo" src="https://cdn.maximemoreillon.com/logo/thick/logo.svg" alt="">
          <div class="application_info">
            <div class="application_name">{{applicationName}}</div>
            <div class="author_name">Maxime MOREILLON</div>
          </div>
        </footer>
      </main>


    </div>

  </div>
</template>

<script>
export default {
  name: 'AppTemplate',
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
  methods: {
    toggle_navigation(){
      this.navigation_open = !this.navigation_open;
    },
    close_navigation(){
      this.navigation_open = false;
    },
    logout(){
      this.axios.post('https://authentication.maximemoreillon.com/logout')
      .then( () => location.reload() )
      .catch(error => console.log(error))
    }
  },
  computed: {
    navigation_control_icon(){
      if(this.navigation_open) return "mdi-backburger"
      else return "mdi-menu"
    }
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

  /* take all viewport */
  /* NOT BEING HONORED */
  height: 100vh;

  /* vertical layout */
  display: flex;
  flex-direction: column;
  align-items: stretch;
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

  /* header size must be fixed */
  flex-grow: 0;
  flex-shrink: 0;

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



.columns_wrapper {
  /* position relative to position nav */
  position: relative;

  /* take all available vertical space */
  height: 100%;

  /* columns side by side */
  display: flex;
  flex-direction: row;

}


/* NAV */
nav {

  /* fixed width */
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 200px; /* matching with nav width when in mobile view */

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

nav > * {
  font-size: 120%;
  text-align: center;

  /* padding for space between nav items */
  padding: 15px 0;


  text-decoration: none;
  color: #111111;



  border-right: 3px solid transparent;
  transition: color 0.25s, border-color 0.25s;
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

  /* grow horizontally */
  flex-grow: 1;
  flex-shrink: 1;

  /* Take all available vertical space */
  height: 100%;

  /* scroll only on main */
  overflow-y: auto;


}

main .router_view{
  padding: 15px;
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

@media only screen and (max-width: 800px) {

  nav {
    /* transform margin into padding */
    /* This takes the border from upmost top to utmost bottom */
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

</style>
