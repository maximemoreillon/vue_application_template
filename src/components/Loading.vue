<template>
<Loader class="loading">Loading</Loader>
</template>

<script>
import Loader from '@moreillon/vue_loader'
export default {
  name: 'Loading',
  components: {
    Loader
  }
}
</script>

<style scoped>
.loading {
  font-size: 150%;
}

</style>
