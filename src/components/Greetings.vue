<template>
  <div class="greetings">Welcome {{ display_name }}</div>
</template>

<script>
import AppTemplateStore from "../template_store.js"

export default {
  name: "Greetings",
  computed: {
    user() {
      return AppTemplateStore.state.user
    },
    display_name() {
      if (this.user.properties) return this.user.properties.display_name
      else return this.user.display_name
    },
  },
}
</script>

<style scoped>
.greetings {
  user-select: none;
  font-size: 120%;
}
</style>
