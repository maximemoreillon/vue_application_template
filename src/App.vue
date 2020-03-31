<template>
  <div id="app">
    <AppTemplate
      applicationName="AppTemplate">
      <template v-slot:navigation>
        <router-link to="/banana">Banana</router-link>
      </template>
      <router-view />
    </AppTemplate>
  </div>
</template>

<script>

import AppTemplate from '@/AppTemplate.vue'



export default {
  name: 'App',
  components: {
    AppTemplate
  },

}
</script>

<style>

</style>
