<template>
  <div id="app">
    <ul>
      <global-controls>
      </global-controls>
    </ul>
  </div>
</template>



<script>

import GlobalControls from './components/GlobalControls.vue'
import Data from './components/Data.js'

export default {
  name: 'app',
  components: {
    GlobalControls
  },

  data () {
    return {
      tree: Data,
    }
  },

  methods:{
  }
}

</script>

<style>
#app {
  font-family: Menlo, Roboto, monospace;
  font-size:12pt;
  -webkit-font-smoothing: antialiased;

  color: black;
  margin-top: 60px;



}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;

}

li {

  
}

a {
  color: #42b983;
}


.bold {
  font-weight: bold;
}




ul {
  padding-left: 1em;
  line-height: 1.5em;

}
</style>
