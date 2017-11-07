import Vue from 'vue'
import App from './App.vue'
import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth)

import Vddl from 'vddl';
Vue.use(Vddl);


new Vue({
  el: '#app',
  render: h => h(App)
})
