<template>
  <footer>
    <img
      src="../assets/img/logo/logo.png"
      alt="logo"
      class="logo rotating">
    <span>{{options.title}}</span>
    <span>-</span>
    <a href="https://maximemoreillon.com">Maxime Moreillon</a>
  </footer>
</template>

<script>

export default {
  name: 'AppTemplateFooter',
  props: {
    options: Object,
  },
  components: {

  },
  data(){
    return {

    }
  },
  computed: {

  }
}
</script>

<style scoped>

footer {
  padding: 0.5em;
  font-size: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*
  animation-name: apparition;
  animation-duration: 1s;
  animation-fill-mode: both;
  */
}

footer a {
  text-decoration: none;
  color: inherit;
}

footer .logo {
  height: 1.5em;
  width: 1.5em;
}

footer > *:not(:last-child) {
  margin-right: 0.5em;
}


@keyframes apparition {
  from {transform: translateY(150%);}
  to {transform: translateX(0%);}
}

</style>
