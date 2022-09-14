<template>
  <AppTemplate
    :options="options"
    @user="get_user($event)">

    <template v-slot:nav >
      <router-link to="/">
        <MenuIcon />
        <span>Nav item 1</span>
      </router-link>
      <router-link to="/about">
        <MenuIcon />
        <span>Nav item 2</span>
      </router-link>
    </template>

  </AppTemplate>
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
        title: 'Template example',
        login_url: 'https://api.users.maximemoreillon.com/auth/login',
        identification_url: 'https://api.users.maximemoreillon.com/users/self',
        anonymous_routes: ['/about']
      }
    }
  },
  methods: {
    get_user(user){
      console.log(user)
      // Do something with the user
    }
  }
}
</script>
