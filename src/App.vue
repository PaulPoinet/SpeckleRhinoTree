<template>
  <div id="app">
    <ul>
      <smart-item
        class="itemxxx"
        :model="tree">
      </smart-item>
    </ul>
  </div>

</template>

<script>

import SmartItem from './components/SmartItem.vue'
import Data from './components/Data.js'

export default {
  name: 'app',
  components: {
    SmartItem
  },

  data () {
    return {
      tree: Data
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
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

.itemxxx {
  cursor: move;
}

.bold {
  font-weight: bold;
}




ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
