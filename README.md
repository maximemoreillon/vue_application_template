# Vue application template
A templating component for VueJS applications

## Usage
```vue
<template>
  <AppTemplate
    :options="options"
    @user="get_user($event)">

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

import AppTemplate from '@moreillon/vue_application_template'

export default {
  name: 'App',
  components: {
    AppTemplate,
  },
  data(){
    return {
      options: {
        authenticate: true,
        title: 'Template example',
        login_url: 'https://api.users.example.com/auth/login',
        identification_url: 'https://api.users.example.com/users/self'
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
```
