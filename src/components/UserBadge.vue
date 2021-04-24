<template>
  <div class="user_bage">

    <div class="" v-if="user_loading">
      USER LOADING
    </div>


    <div v-if="user && !user_loading" class="">
      {{username}}
    </div>





  </div>
</template>

<script>

import AppTemplateStore from '../template_store.js'

export default {
  name: 'UserBadge',

  components: {

  },
  data(){
    return {
    }
  },
  mounted(){
  },

  watch: {

  },
  methods: {






  },
  computed: {
    user_loading(){
      return AppTemplateStore.state.user_loading
    },
    user(){
      return AppTemplateStore.state.user
    },
    username(){
      if(!this.user) return
      return this.user.properties.username
    }
  }
}
</script>

<style scoped>


form {
  outline: 1px solid blue;
}


</style>
