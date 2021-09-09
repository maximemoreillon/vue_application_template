import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
