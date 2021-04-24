<template>
  <form
    class=""
    @submit.prevent="login()">

    <div class="title">
      {{options.title}}
    </div>

    <!-- username input -->
    <div class="">

      <AccountIcon />

      <input
        type="text"
        v-model="identifier"
        autocomplete="username"
        placeholder="Username"
        :disabled="processing">

    </div>

    <!-- Password input -->
    <div class="">

      <KeyIcon />

      <input
        type="password"
        v-model="password"
        autocomplete="password"
        placeholder="Password"
        :disabled="processing">

    </div>

    <!-- This submit input is hidden -->
    <input type="submit" value="Login">

    <button type="button"
      @click="login()"
      :disabled="processing">
      <span>Login</span>
    </button>

    <div class="error">
      {{error}}
    </div>

  </form>
</template>

<script>
/*
This component exchanges credentials for a JWT and manages the storage of the JWT in cookies
*/

import axios from 'axios'
import VueCookies from 'vue-cookies'

import StoreMixin from '../mixins/store.js'

import AccountIcon from 'vue-material-design-icons/Account.vue'
import KeyIcon from 'vue-material-design-icons/Key.vue'

export default {
  name: 'LoginForm',
  props: {
    options: Object,
  },
  mixins: [StoreMixin],
  components: {
    KeyIcon,
    AccountIcon,
  },
  data(){
    return {
      identifier: '',
      password: '',
      error: null,
      processing: false,
    }
  },
  methods: {
    login(){
      // Send credentials and get JWT

      const url = this.options.login_url
      const body = { identifier: this.identifier, password: this.password }

      this.error = null
      this.processing = true

      axios.post(url, body)
      .then( ({data}) => {
        if(!data.jwt) return
        VueCookies.set('jwt', data.jwt)
        this.get_user()

        // clear the inputs
        this.identifier = ''
        this.password = ''

      })
      .catch( (error) => {
        if(error.response) this.error = error.response.data
        else this.error = `Error while logging in`
        console.error(error)
       })
      .finally(() => {

        this.processing = false

      })
    },



  },
  computed: {

  }
}
</script>

<style scoped>


form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 150%;
}

form > * {
  margin: 0.5em;
}

form > div {
  display: flex;
  align-items: center;
}

form input:not(:first-child) {
  margin-left: 0.5em;
}

form input {
  border: none;
  border-bottom: 1px solid #444444;
  padding: 0.25em;
}

/* replace the submit button by a custom buttom */
form input[type="submit"] {
  display: none;
}

</style>
