// This mixins facilitates access to states and mutations of the store

import AppTemplateStore from '../template_store.js'
// NOTE: Mixins imported in other components don't share date

let {state,mutations} = AppTemplateStore


let computed = {}
for (let key in state) {
  computed[key] = () => state[key]
}

export default {
  methods: mutations,
  computed,

}
