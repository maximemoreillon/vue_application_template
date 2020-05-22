<template>
  <div id="app">
    <AppTemplate
      applicationName="AppTemplate"
      authenticationApiUrl="http://172.16.98.151:30091"
      authenticationFrontUrl="http://172.16.98.151:31091">

      <!-- proper way to embed navigation -->
      <template v-slot:navigation>
        <router-link to="/">Home</router-link>
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
