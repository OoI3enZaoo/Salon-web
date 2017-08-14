<template>
     <!-- <quill-editor
            v-model="modelFromParrent"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorChange($event)"
                >
  </quill-editor> -->

  <!-- <div class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
          :options="editorOption">
   </div> -->
  <!-- <div class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        v-quill:myQuillEditor="editorOption">
   </div> -->

   <div class="quill-editor"
        :content="modelFromParrent"
        @change="onEditorChange($event)"
        v-quill:myQuillEditor="editorOption">
   </div>

</template>
<script>

// import { quillEditor } from 'vue-quill-editor'
// import { ImageImport } from '../modules/ImageImport.js'
//  import { ImageResize } from '../modules/ImageResize.js'
//  Quill.register('modules/imageImport', ImageImport)
//  Quill.register('modules/imageResize', ImageResize)

export default {
props:['value'],

data (){
  return {
     content: '<p>I am Example</p>',
     editorOption: {
          modules: {
            imageImport: true,
                 imageResize: {
                 displaySize: true
               }
          }
        },

    // editorOption: {
    //   modules: {
    //      imageImport: true,
    //      imageResize: {
    //      displaySize: true
    //    }
    //  },
    // modules: {
    //         toolbar: [
    //           ['bold', 'italic', 'underline', 'strike'],
    //           ['blockquote', 'code-block']
    //         ]
    //       },
     num : 'numnum',
     message : '5555555'
     }
},
mounted() {
  //do something after mounting vue instance
  console.log('app init, my quill insrance object is:', this.myQuillEditor)
},
methods: {
  onEditorChange({ editor, html, text }) {
      //console.log('editor change!',  html)
      //  this.content = html
        this.$emit('input',html)
    }
},
  // components: {
  //   quillEditor
  // },
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
