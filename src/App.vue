<template>
  <AppTemplate
    :options="options"
    @userChanged="get_user($event)">

    <template v-slot:nav>
      <router-link to="/">
        <MenuIcon />
        <span>Nav item</span>
      </router-link>
      <router-link to="/about">Banana</router-link>
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
        authenticate: true,
        title: 'Template example',
        login_url: 'https://api.users.maximemoreillon.com/auth/login',
        identification_url: 'https://api.users.maximemoreillon.com/users/self'
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
