<template>



<div>


     <quill-editor
            v-model="modelFromParrent"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                >
  </quill-editor>

</div>




</template>
<script>

import { quillEditor } from 'vue-quill-editor'
import { ImageImport } from '../modules/ImageImport.js'
 import { ImageResize } from '../modules/ImageResize.js'
 Quill.register('modules/imageImport', ImageImport)
 Quill.register('modules/imageResize', ImageResize)

export default {
props:['value'],

data (){
  return {
    editorOption: {
      modules: {
         imageImport: true,
         imageResize: {
         displaySize: true
       }
     },
     num : 'numnum',
     message : '5555555'
     }
  }
},
methods: {
  onEditorChange({ editor, html, text }) {
      //console.log('editor change!',  html)
      //  this.content = html
        this.$emit('input',html)

    },
  test(){
    console.log("test");
  },
  updateValue(value) {
      this.$emit('input', value)
    },
    increase(){

    //  console.log("this.num: " + this.num);
        this.$emit('input', '5555')
    }
},
  components: {
    quillEditor
  },
  created() {
    //do something after creating vue instance

  },
  computed: {
    modelFromParrent (){
      return  this.value
    }
  }


}
</script>

<style lang="scss">
  .editor-example {
    border: 1px solid #ccc;
  }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
