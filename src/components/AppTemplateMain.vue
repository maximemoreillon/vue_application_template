<template>
  <main key="main">
    <!-- main and actual_main different divs due to footer -->

    <!-- Main can be passed as slot -->
    <!-- Wrapping so as to be the same as when using router -->
    <!-- NOT VERY ELEGANT -->
    <div class="actual_main" v-if="$slots.default">
      <slot />
    </div>


    <template v-else>
      <!-- Route transitions -->
      <transition
        name="route-transition"
        mode="out-in"
        appear>

        <router-view
          v-if="!route_loading"
          class="actual_main"/>

        <div
          v-if="route_loading"
          class="actual_main loader_wrapper">
          <Loader/>
        </div>



      </transition>
    </template>

    <AppTemplateFooter :options="options"/>

  </main>
</template>

<script>

import AppTemplateFooter from './AppTemplateFooter.vue'
import Loader from '@moreillon/vue_loader'

import StoreMixin from '../mixins/store.js'


export default {
  name: 'AppTemplateMain',
  props: {
    options: Object,
  },
  mixins: [
    StoreMixin
  ],
  components: {
    AppTemplateFooter,
    Loader,
  }


}
</script>

<style scoped>
main {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.loader_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
}

.actual_main {
  flex-grow: 1;
  padding: 0 1em;
}

.route-transition-enter-active, .route-transition-leave-active {
  transition: opacity 0.25s;
}
.route-transition-enter, .route-transition-leave-to {
  opacity: 0;
}

</style>
