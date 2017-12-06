import Vue from 'vue'
import App from './App.vue'
import VueInputAutowidth from 'vue-input-autowidth'
import Sortable from 'vue-sortable'
import Vuetify from 'vuetify'

window.bus = new Vue()

Vue.use(Vuetify)
Vue.use(Sortable)
Vue.use(VueInputAutowidth)

import 'vuetify/dist/vuetify.css'
import Vddl from 'vddl'
import draggable from 'vuedraggable'

Vue.use(Vddl)


new Vue({
  el: '#app',
  render: h => h(App)
})
