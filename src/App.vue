<template>
  <div id="app">
    <AppTemplate
      :options="options">

      <!-- proper way to embed navigation -->
      <template v-slot:nav>
        <router-link to="/">
          <MenuIcon />
          <span>Home</span>
        </router-link>
        <router-link to="/about">Banana</router-link>
      </template>

    </AppTemplate>
  </div>
</template>

<script>

import AppTemplate from '@/AppTemplate.vue'

import MenuIcon from 'vue-material-design-icons/Menu.vue'


export default {
  name: 'App',
  components: {
    AppTemplate,
    MenuIcon
  },
  data(){
    return {
      options: {
        authenticate: true,
        title: 'Template example',
        login_url: 'https://api.users.maximemoreillon.com/auth/login',
        identification_url: 'https://api.users.maximemoreillon.com/users/self'
      }
    }
  }

}
</script>

<style>

</style>
