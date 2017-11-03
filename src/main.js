import Vue from 'vue'
import App from './App.vue'
import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth)

let GlobalBus = new Vue() 

new Vue({
  el: '#app',
  render: h => h(App)
})
