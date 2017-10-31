


<template>
  <li>
    <div :class="{bold: isFolder}">

      <span v-if="isFolder" v-show="open">
      <i class="fa fa-chevron-down fa-spin-hover" aria-hidden="true" @click="toggle"></i>
      </span>

      <span v-if="isFolder" v-show="!open">
        <i class="fa fa-chevron-right fa-spin-hover" @click="toggle"></i>
      </span>
     
      <span v-if="isFolder && model.children.length>0" v-show="!open" font face="Consolas">
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
        <label @dblclick = "editTheKey"> {{objectKey}} </label>
      </span>
      :
      <span v-if="editValue==true">
      <input type="text" font-face="Roboto" font-size:18pt v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}" @focus="$event.target.select()" id="input" v-model="objectValue" @blur="editValue=false" @keyup.enter= "editValue=false" >
      </span>
      <span v-if="editValue==false">
        <label @dblclick = "editTheValue"> {{objectValue}} </label>
      </span>
      


      <i class="fa fa-pencil-square-o" aria-hidden="true" @click="editTheObject" v-if="editKey==false&&editValue==false" v-bind:title="messageEdit"></i>
      <i class="fa fa-pencil-square" aria-hidden="true" @click="editTheObject" v-if="editKey==true||editValue==true"  v-bind:title="messageSave"></i>




      <span v-if="!isFolder">
        <i class="fa fa-cubes" aria-hidden="true" @click="changeType" v-bind:title="messageAdd0"></i>
      </span>


      <a class="contentDescription">
        <i class="fa fa-times" aria-hidden="true" @click="trashThis" v-if="!model.children" v-bind:title="messageDelete0"></i>
        <i class="fa fa-times" aria-hidden="true" @click="trashThis" v-if="isFolder && model.children.length>0" v-bind:title="messageDelete1"></i>
      </a>

    </div>


    <ul v-show="open" v-if="isFolder">

      <item class="item" v-for="(model, index) in model.children" :model="model" :index='index' @deleteMe='deleteKid'></item>
        <a class="addCube" aria-hidden="true" @click="addChild"  v-bind:title="messageAdd1">
        <i class="fa fa-plus"  aria-hidden="true"></i>
        <i class="fa fa-cube"  aria-hidden="true"></i>
        </a>


    </ul>
  </li>
</template>


<script>

//import ModalPrompt from './components/ModalPrompt.js'

export default {
  name: 'item',
  Value: 'item',

  props: {
    model: Object,
    index: Number,
    
  },




  data: function () {

    return {
      Value: this.model.Key,
      messageDelete0: 'Delete this object ',
      messageDelete1: 'Delete this object and its inheritance(s) ',
      messageAdd0: 'Create a child object',
      messageAdd1: 'Add an object',
      messageEdit: "Edit object's name",
      messageEditKey: "Edit object's key",
      messageEditValue: "Edit object's value",
      messageSaveKey: "Save object's key",
      messageSaveValue: "Save object's value",
      messageSave: "Save object's name",
      objectKey: this.model.Key,
      objectValue: this.model.Value,
      open: true,
      editKey: false,
      editValue: false,
    }
  },
  computed: {
    isFolder: function () {
      
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    deleteKid(index) {
      this.model.children.splice(index, 1)
    },

    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }

    },

    changeType: function () {
      if (!this.isFolder) {
        this.$set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },

    addChild: function () {
      this.model.children.push({
        Key: "ObjectKey",
        Value: "ObjectValue",
      })
    },

    trashThis: function () {
      this.$emit('deleteMe', this.index)
      if(this.isFolder) this.model.children = []
    },

    editTheKey: function () {
        this.editKey = !this.editKey
        this.$nextTick(function() {
            var object = document.getElementById("input");
            object.focus();
        });

    },
    editTheValue: function () {
        
        this.editValue = !this.editValue
        this.$nextTick(function() {
            var object = document.getElementById("input");
            object.focus();
        });
    },
    editTheObject: function () {

        if(this.editKey==true && this.editValue==true || this.editKey==false && this.editValue==false){
          this.editKey = !this.editKey
          this.editValue = !this.editValue
        }
        else if(this.editKey==false && this.editValue==true  || this.editKey==true && this.editValue==false){
          this.editKey = false
          this.editValue = false
        }
        this.$nextTick(function() {
            var object = document.getElementById("input");
            object.focus();
        });
 

        //this.model.Key = prompt('Edit Name:', this.model.Key) || this.model.Key;
    },

   textAreaAdjust: function(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";

  },



      }
}
</script>

<style>
.fa-cubes {
    color: LightGray;
}
.fa-cubes:hover {
    color:  blue;
}

.fa-cubes.identity {
    color: blue;
}

.fa-times {
    color: LightGray;
}

.fa-times:hover{
    color: red;
}






.fa-plus {
    color: LightGray;


}
.fa-plus:hover {
    color:  #1E90FF;
    @extend .fa-cube;
}

.fa-cube.identity {
    color:  #1E90FF;
}
.fa-cube {
    color:  White;


}
.fa-cube:hover {
    color:  #1E90FF;

}

.fa-chevron-down {
    color:  LightGray;
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
    color:  LightGray;
}
.fa-pencil-square-o:hover {
    color:  #2c3e50;
}

.content {
  color: LightGray;
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


</style>

