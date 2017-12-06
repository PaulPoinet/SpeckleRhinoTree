  <template>
    <div>
      <v-btn class="ma-0" large color="red" @click="foldGlobalToggle" ><v-icon light>chevron_right</v-icon></v-btn>
      <v-btn class="ma-0" large color="grey lighten-2" @click="unfoldGlobalToggle" ><v-icon light>expand_more</v-icon></v-btn>
      <br><br />
     <smart-item
        :model="tree">
      </smart-item>
    </div>   
  </template>

  <script>
  import SmartItem from './SmartItem.vue'
  import Data from './Data.js'

  export default {
    components: {
      SmartItem,
    },

    data () {
      return {
        tree: Data,
      }
    },

    methods:{
      foldGlobalToggle() {
        window.bus.$emit('fold-global', false);
      },
      unfoldGlobalToggle() {
        window.bus.$emit('unfold-global', true);
      }   
    }
  }
  </script>

  <style>
  </style>