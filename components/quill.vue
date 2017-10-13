<template>
   <div class="quill-editor"
        :content="modelFromParrent"
        @change="onEditorChange($event)"
        v-quill:myQuillEditor="editorOption">
   </div>

</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      content: '<p>I am Example</p>',
      editorOption: {
        modules: {}
      },
      num: 'numnum',
      message: '5555555'
    }
  },
  mounted () {
    console.log('app init, my quill insrance object is:' + this.myQuillEditor)
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.$emit('input', html)
    }
  },
  computed: {
    modelFromParrent () {
      return this.value
    }
  }
}
</script>
<style>
  .quill-editor {
    height: 300px;
  }
</style>
