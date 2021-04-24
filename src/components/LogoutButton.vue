<template>
  <LogoutIcon
    class="logout_button"
    @click="logout()"/>
</template>

<script>
/*
This component exchanges credentials for a JWT and manages the storage of the JWT in cookies
*/

import VueCookies from 'vue-cookies'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import StoreMixin from '../mixins/store.js'

export default {
  name: 'LogoutButton',
  components: {
    LogoutIcon
  },
  mixins: [StoreMixin],
  methods: {

    logout(){
      VueCookies.remove('jwt')
      this.get_user()
    },
  },

}
</script>

<style scoped>

.logout_button {
  cursor: pointer;
}

</style>
