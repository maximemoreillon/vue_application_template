<template>
  <header>

    <template v-if="nav_exists">
      <backburger-icon
        class="navigation_control"
        v-if="nav_open"
        v-on:click="toggle_nav()"/>

      <menu-icon
        class="navigation_control"
        v-else
        v-on:click="toggle_nav()"/>
    </template>



    <img
      src="../assets/img/logo/logo.png"
      alt="logo"
      class="logo rotating">

    <span class="title">{{options.title}}</span>

    <div class="spacer"/>

    <slot v-if="$slots.default"/>

    <LogoutButton v-if="user"/>

  </header>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import BackburgerIcon from 'vue-material-design-icons/Backburger.vue'

import LogoutButton from './LogoutButton.vue'
import StoreMixin from '../mixins/store.js'

export default {
  name: 'AppTemplateHeader',
  props: {
    options: Object,
    nav_exists: Boolean,
  },
  components: {
    LogoutButton,
    MenuIcon,
    BackburgerIcon,
  },
  mixins: [
    StoreMixin
  ],
  methods: {

  },
  computed: {


  }
}
</script>

<style scoped>

header {
  padding: 0.5em 0.75em;

  font-size: 130%;

  background: #444;
  color: #eee;

  display: flex;
  align-items: center;

  /*
  animation-name: apparition;
  animation-duration: 1s;
  animation-fill-mode: both;
  */

  //box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  user-select: none;

}


header .navigation_control{
  cursor: pointer;
  transform: translateX(-250%);
  transition: transform 0.5s;
}


header .logo {
  height: 1.4em;
  width: 1.4em;
  user-select: none;
}

header > *:not(:last-child) {
  margin-right: 0.5em;
}

header .spacer {
  flex-grow: 1;
}
header .title {
  margin-right: auto;
}

@keyframes apparition {
  from {transform: translateY(-150%);}
  to {transform: translateX(0%);}
}



</style>
