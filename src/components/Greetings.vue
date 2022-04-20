<template>
<div class="greetings">
  Welcome {{user.properties.display_name}}
</div>
</template>

<script>
import AppTemplateStore from '../template_store.js'

export default {
  name: 'Greetings',
  computed: {
    user(){
      return AppTemplateStore.state.user
    },
  }
}
</script>

<style scoped>
.greetings {
  user-select: none;
  font-size: 150%;
}

</style>
