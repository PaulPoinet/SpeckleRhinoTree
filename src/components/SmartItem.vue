<template>
  <li>
    
    <div :class="{bold: isFolder}" class="myElement">
      <span v-if="isFolder" v-show="open">
        <i class="fa fa-chevron-down fa-spin-hover" aria-hidden="true" @click="toggle"></i>
      </span>

      <span v-if="isFolder" v-show="!open">
        <i class="fa fa-chevron-right fa-spin-hover" @click="toggle"></i>
      </span>
     
      <span v-if="isFolder && model.children.length > 0" v-show="!open" font face="Consolas">
        <font face="Roboto" size="2" color="blue" >{...+{{model.children.length}}}</font>
      </span>
      <span v-if="isFolder">
        <i class="fa fa-cubes identity" aria-hidden="true"></i>
      </span>
      <span v-if="!isFolder">
        <i class="fa fa-cube identity" aria-hidden="true"></i>
      </span>

      <a class="content">
      {{index}}
      </a>


      <span v-if="editKey==true">
        <input type="text" font-face="Roboto" font-size:18pt v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" @focus="$event.target.select()" id="input" v-model="objectKey" @blur="editKey=false" @keyup.enter= "editKey=false">
      </span>

      <span v-if="editKey==false">
        <label v-bind:title="messageEditLabel" @dblclick = "editTheKey"> {{objectKey}} </label>
      </span>
      
      <span v-if="!isFolder">
      :
      </span>

      <span v-if="editValue==true">
      <input type="text" font-face="Roboto" font-size:18pt v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" @focus="$event.target.select()" id="input" v-model="objectValue" @blur="editValue=false" @keyup.enter= "editValue=false">
      </span>
      <span v-if="editValue==false && !isFolder">
        <label v-bind:title="messageEditLabel" @dblclick = "editTheValue"> {{objectValue}} </label>
      </span>
      

      <!-- 
      <i class="fa fa-pencil-square-o" aria-hidden="true" @click="editTheObject" v-if="editKey==false&&editValue==false" v-bind:title="messageEdit"></i>
      <i class="fa fa-pencil-square" aria-hidden="true" @click="editTheObject" v-if="editKey==true||editValue==true"  v-bind:title="messageSave"></i>
      -->



      <span v-if="!isFolder">
        <i class="fa fa-cubes" aria-hidden="true" @click="changeType" v-bind:title="messageAdd0"></i>
      </span>
        <!-- 
        <i class="fa fa-times" aria-hidden="true" @click="trashThis" v-if="!model.children" v-bind:title="messageDelete0"></i>
        <i class="fa fa-times" aria-hidden="true" @click="trashThis" v-if="isFolder && model.children.length>0" v-bind:title="messageDelete1"></i>
         -->
      <a class="contentDescription">
        <i class="fa fa-times" aria-hidden="true" @click="trashThis" v-bind:title="messageDelete0"></i>
      </a>

    </div>
    


    <ul v-show="open" v-if="isFolder">
      <draggable v-model="model.children" :options="{group:'people'}" @start="drag=true" @end="drag=false" class="drag">
        

      <item class="item" v-for="(model, index) in model.children":model="model" :index='index' @deleteMe='deleteKid' ></item>
      

      </draggable>


        

      <a class="addCube" aria-hidden="true" @click="addChild"  v-bind:title="messageAdd1">
      <i class="fa fa-plus"  aria-hidden="true"></i>
      <i class="fa fa-cube"  aria-hidden="true"></i>
      </a>

    </ul>
  </li>
</template>


<script>


//import ModalPrompt from './components/ModalPrompt.js'
import draggable from 'vuedraggable'
export default {
    name: 'item',
  Value: 'item',
  props: {
    model: Object,
    index: Number,
    
  },
  components:{
    draggable,
  },
  data: function () {
    return {
      Value: this.model.Key,
      messageDelete0: "Delete this object ",
      messageDelete1: "Delete this object and its inheritance(s) ",
      messageAdd0: "Create a child object",
      messageAdd1: "Add an object",
      messageEdit: "Edit object's name",
      messageEditKey: "Edit object's key",
      messageEditValue: "Edit object's value",
      messageSaveKey: "Save object's key",
      messageSaveValue: "Save object's value",
      messageSave: "Save object's name",
      messageEditLabel: "Double-click to edit",
      objectKey: this.model.Key,
      objectValue: this.model.Value,
      open: true,
      editKey: false,
      editValue: false,
      

    }
  },
  computed: {

    isFolder: function () {
      return this.model.children && this.model.children.length
    }





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
    },
    editTheObject  () {
        if( this.editKey==true && this.editValue==true || this.editKey==false && this.editValue==false ){
          this.editKey = !this.editKey
          this.editValue = !this.editValue
        }
        else if( this.editKey==false && this.editValue==true  || this.editKey==true && this.editValue==false){
          this.editKey = false
          this.editValue = false
        }
        this.$nextTick( function( ) {
            var object = document.getElementById("input");
            object.focus();
        });
        //this.model.Key = prompt('Edit Name:', this.model.Key) || this.model.Key;
    },
   textAreaAdjust (o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
    },
      }
}
</script>

<style>
.fa-cubes {
    color: DarkGray;
}
.fa-cubes:hover {
    color:  blue;
}
.fa-cubes.identity {
    color: blue;
}
.fa-times {
    color: DarkGray;
}
.fa-times:hover{
    color: red;
}
.fa-plus {
    color: DarkGray;
}
.fa-plus:hover {
    color:  #1E90FF;
    @extend .fa-cube;
}
.fa-cube.identity {
    color:  #1E90FF;
}
.fa-cube {
    color:  rgba(0,0,0,0);
}
.fa-cube:hover {
    color:  #1E90FF;
}
.fa-chevron-down {
    color:  DarkGray;
    /*transition: transform 0.2s ease 0s;*/
}
.fa-chevron-down:hover {
    color:  blue;
    /*transform: rotate(-90deg);*/
}
.fa-chevron-right {
    color:  blue;
    /*transition: transform 0.2s ease 0s;*/
}
.fa-chevron-right:hover {
    color:  blue;
    /*transform: rotate(90deg);*/
}
.fa-pencil-square-o {
    color:  DarkGray;
}
.fa-pencil-square-o:hover {
    color:  #2c3e50;
}
.content {
  color: DarkGray;
  font-family: Menlo, Consolas, monospace;
  font-weight: lighter;
}
.addCube:hover .fa-cube {
  color:  #66CCFF;
}
.addCube:hover .fa-plus {
  color:  #1E90FF;
}
.inputStyle{
}



.item{
  
  padding: 0px;
  padding-left: 5px;

  border-style:  solid;
  border-width: 0px;
  border-color: rgba(102, 204, 255,0);
  border-radius: 5px;


  border-left-width: 2px;
  border-left-color: DarkGray;



}


.item:hover{
  
  padding: 0px;
  padding-left: 5px;



  border-style:  solid;
  border-width: 0px;
  border-color: rgba(0, 0, 255,0);
  border-radius: 5px;
  background-color: rgba(117, 190, 218, 0.1);
  
    border-left-width: 2px;
  border-left-color: black;

}





</style>