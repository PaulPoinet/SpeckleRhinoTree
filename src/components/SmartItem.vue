<template>

  <li>

    <div :class="{bold: isFolder}" id="myElement">

      <v-btn class="ma-0"  small flat color="black"  v-if="isFolder" v-show="open" aria-hidden="true" @click="toggle" ><v-icon light>expand_more</v-icon></v-btn>
      <v-btn class="ma-0"  small flat color="red" v-if="isFolder" v-show="!open" @click="toggle"><v-icon light>chevron_right</v-icon></v-btn>
      <v-icon class="ma-0" v-if="!isFolder" light>crop_free</v-icon>
      <v-icon class="ma-0" v-if="isFolder && !open" light>folder</v-icon>
      <v-icon class="ma-0" v-if="isFolder && open" light>folder_open</v-icon>
      <a class="indexFont">{{index}}</a>

      <input v-if="editKey==true" type="text" font-face="Roboto" font-size:18pt v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" @focus="$event.target.select()" id="input" v-model="objectKey" @blur="editKey=false" @keyup.enter= "editKey=false">
      <label v-if="editKey==false" v-bind:title="messageEditLabel" @dblclick = "editTheKey"> {{objectKey}} </label>
      <span v-if="!isFolder">:</span>   
      <input v-if="editValue==true" type="text" font-face="Roboto" font-size:18pt v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" @focus="$event.target.select()" id="input" v-model="objectValue" @blur="editValue=false" @keyup.enter= "editValue=false">
      <label v-if="editValue==false && !isFolder" v-bind:title="messageEditLabel" @dblclick = "editTheValue"> {{objectValue}} </label>
    
      <v-btn small flat icon color="black"  class="ma-0" @click="trashThis" v-bind:title="messageDelete0" ><v-icon light>close</v-icon></v-btn>
      <v-btn small flat icon color="DarkGray" class="ma-0" v-if="!isFolder" aria-hidden="true" @click="changeType" v-bind:title="messageAdd0" ><v-icon light>create_new_folder</v-icon></v-btn>
      <v-btn small flat icon color="black" class="ma-0"  v-if="!fixObj" @click="changeBehaviour" aria-hidden="true" ><v-icon light v-if="!fixObj" aria-hidden="true">lock_open</v-icon></v-btn>
      <v-btn small flat icon color="black"  class="ma-0" v-if="fixObj" @click="changeBehaviour" aria-hidden="true" ><v-icon light v-if="fixObj" aria-hidden="true">lock</v-icon></v-btn>

      <span v-if="isFolder && model.children.length > 0" v-show="!open">
        <font face="Roboto" size="3" color="red">{...+{{model.children.length}}}</font>
      </span>

    </div>
    
    <ul v-sortable="{ onUpdate: onUpdate }" v-show="open" v-if="isFolder">
      <draggable v-model="model.children" :options="{group:'item', name: 'item', pull:true, sort: true}"  @start="drag=true" @end="drag=false" class="drag">
      <item class="item" v-for="(model, index) in model.children":model="model" :index='index' @deleteMe='deleteKid'></item>
      </draggable>
      <v-btn small flat icon color="grey lighten-1"  class="ma-0" @click="addChild"  v-bind:title="messageAdd1" aria-hidden="true" ><v-icon light>add_box</v-icon></v-btn>
    </ul>

  </li>

</template>

<script>


import draggable from 'vuedraggable'

export default {
  name: 'item',
  Value: 'item',

  props: {
    model: Object,
    index: Number,
  },

  components:{
    draggable
  },

  data: function () {
    return {
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      Value: this.model.Key,
      messageDelete0: "Delete this object ",
      messageAdd0: "Create a child object",
      messageAdd1: "Add an object",
      messageEditLabel: "Double-click to edit",
      objectKey: this.model.Key,
      objectValue: this.model.Value,
      open: true,
      editKey: false,
      editValue: false,
      fixObj: false,
      drag: true,
    }
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length
    },
  },



  methods: {


    deleteKid(index) {
      this.model.children.splice(index, 1)
    },

    toggle() {
      if (this.isFolder) {
        this.open = !this.open

      }
    },

    unfoldAll() {
      if (open){
      open = !open
    }
    },

    changeBehaviour(){
      this.fixObj = !this.fixObj
      this.drag = !this.drag
    },

    changeType() {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },

    addChild () {
      this.model.children.push({
        Key: "ObjectKey",
        Value: "ObjectValue",
      })
    },

    trashThis  () {
      this.$emit('deleteMe', this.index)
      if(this.isFolder) this.model.children = []
    },

    editTheKey  () {
        this.editKey = !this.editKey
        this.$nextTick(function() {
            var object = document.getElementById("input");
            object.focus();
        });
    },

    editTheValue  () {      
        this.editValue = !this.editValue
        this.$nextTick(function() {
            var object = document.getElementById("input");
            object.focus();
        });
    }
  },
      
  mounted() {
    window.bus.$on('fold-global', state => {
      this.open = state
    })
    window.bus.$on('unfold-global', state => {
      this.open = state
    })
  }
}

</script>

<style>
ul {
  margin: 0 2px;
}

.indexFont {
  color: DarkGray;
  font-family: Menlo, Consolas, monospace;
  font-weight: lighter;
}

.item{
  padding: 0px;
  border-style:  solid;
  border-width: 0px;
  border-radius: 6px;
  border-left-width: 2px;
  border-left-color: white;
}

.item:hover{
  padding: 0px;
  border-style:  solid;
  border-width: 0px;
  border-radius: 6px;
  border-left-width: 2px;
  border-left-color: black;
}

</style>