<template>
  <!-- Could think of having a nav wrapper to contain the nav background -->
  <nav>

    <!-- Allow to pass nav items using slot -->
    <slot v-if="$slots.default"/>

    <!-- If no slot, Nav items can be generated from router -->
    <!-- Currently not working -->
    <template v-else-if="$router">
      <router-link
        v-for="nav_item in router_nav_items"
        :key="nav_item.name"
        :to="{ name: nav_item.name }">

        <template v-if="nav_item.nav.icon">
          <component :is="nav_item.nav.icon"/>
        </template>
        <MenuIcon v-else/>

        <span>{{nav_item.nav.label}}</span>

      </router-link>
    </template>

  </nav>
</template>

<script>

import MenuIcon from 'vue-material-design-icons/Menu.vue'
import StoreMixin from '../mixins/store.js'

/*
this did not work
import router from '@/router'

function component_factory(){
  return router.options.routes.reduce((acc,route) => {
    if(!route.nav || !route.name || !route.nav.icon) return acc
    const component_name = `route-${route.name}-icon`
    acc[component_name] = route.nav.icon
    return acc
  },{})
}
*/


export default {
  name: 'AppTemplateNav',
  props: {
    title: String,
  },
  mixins: [StoreMixin],
  components: {
    MenuIcon,
    //...component_factory(),
  },
  computed: {
    router_nav_items(){
      return this.$router.options.routes.filter(route => {
        return !!route.nav
      })
    }
  }
}
</script>

<style>

nav {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;

  z-index: 2;

  /* this animation runs when the comonent becomes visible */
  /* WARNING: animation clashes with retracted nav*/
  /*
  animation-name: apparition;
  animation-duration: 1s;
  animation-fill-mode: backwards;
  */

  //border-right: 1px solid #dddddd;
  font-size: 120%;

  transition: 0.25s;
}

nav::after {
  z-index: 1;
  content: '';
  position: absolute;
  top: 1em;
  bottom: 1em;
  left: 100%;
  right: 0;
  border-right: 1px solid #dddddd;
}

a {
  color: inherit;
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.25s;

  border-right: 3px solid transparent;
}

a:hover {
  color: #c00000;
  border-right: 3px solid #666666;
}

nav a.router-link-exact-active {
  border-right: 3px solid #c00000;
}


a > * {
  margin-right: 1em;
}

@keyframes apparition {
  from {transform: translateX(-150%);}
  to {transform: translateX(0%);}
}


</style>
