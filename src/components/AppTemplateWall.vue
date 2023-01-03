<template>
  <div class="wall">
    <!--<img class="logo rotating" src="../assets/img/logo/logo.png" alt="logo">-->
    <AnimatedLogo class="logo" />

    <div class="title">
      {{ options.title }}
    </div>

    <transition name="fade" mode="out-in" appear>
      <LoginForm key="loginForm" v-if="state === 'login'" :options="options" />

      <Greetings v-if="state === 'greetings'" />

      <Loading v-if="['loading', 'initial'].includes(state)" />
    </transition>
  </div>
</template>

<script>
import StoreMixin from "../mixins/store.js"

import LoginForm from "./LoginForm.vue"
import Greetings from "./Greetings.vue"
import Loading from "./Loading.vue"
import AnimatedLogo from "./AnimatedLogo.vue"

export default {
  name: "AppTemplateWall",
  props: {
    options: Object,
  },
  mixins: [StoreMixin],
  components: {
    LoginForm,
    Greetings,
    Loading,
    AnimatedLogo,
  },
  computed: {},
}
</script>

<style scoped>
.wall {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin-top: 15vh;
  margin-bottom: 5vh;

  width: 30vmin;
  height: 30vmin;
}

.title {
  font-size: 150%;
  margin-bottom: 2.5vh;
}
</style>
