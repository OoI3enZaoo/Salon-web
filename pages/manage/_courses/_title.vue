<template>
  <div>


      <v-container>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <div class="text-xs-center">
                        <img src="http://doofazit.com/image/matt-bloom-circle.png" height="100">
                    </div>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <div class="text-sm-left text-xs-center">
                          <h5>{{title}}</h5>
                        <span class = "hidden-xs-only ">บทความโดย&nbsp;&nbsp;&nbsp;</span>
                        <span>นายสมชาย น มงคล </span>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <span >11 กรกฎาคม 2560</span>

                    </div>
                  </v-flex>
                      <v-spacer></v-spacer>
                  <v-flex xs12 sm2>
                    <div class="text-sm-right text-xs-center">
                          <v-btn v-if="edit ==false"icon info class ="white--text display:inline" @click.native="edit = !edit"><v-icon>mode_edit</v-icon></v-btn>
                          <template v-else>
                            <v-btn  icon info class ="white--text display:inline" @click.native="Save"><v-icon>save</v-icon></v-btn>
                              <v-btn  icon info class ="white--text display:inline" @click.native="edit = !edit"><v-icon>cancel</v-icon></v-btn>
                          </template>
                          <v-btn icon error class ="white--text display:inline" @click.native="Remove"><v-icon>delete</v-icon></v-btn>

                    </div>
                  </v-flex>
              </v-layout>

            </v-card-text>

            <v-card-media height="400px" :src ="cover"></v-card-media>
            <v-card-text>
              <h6 class ="primary--text">รายละเอียด</h6>
                <span v-if="!edit">
                  {{description}}
                </span>
                    <v-text-field  class="input-group--focused" v-else label="แก้ไข"  v-model="description"></v-text-field>
                <br>  <br>  <br>
                  <h6 class ="primary--text">เนื้อหา</h6>

                  <span v-if="!edit">
                    <span v-html="content"></span>
                  </span>
                  <quill-editor v-else
                        ref="myQuillEditor"
                        v-model="content"
                        :content ="mContent"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                      </quill-editor>

                  <!-- <v-text-field  v-else multi-line label="แก้ไข" :value="content"></v-text-field> -->

            </v-card-text>
            <br><br>
            <v-card-actions >
                <v-spacer></v-spacer>
                <template v-if="edit">
                    <v-btn primary @click.native="Save">บันทึก</v-btn>
                    <v-btn class ="white primary--text" @click.native ="edit = !edit">ยกเลิก</v-btn>
                </template>
                <template v-else>
                    <v-btn primary @click.native="edit = !edit">แก้ไข</v-btn>
                    <v-btn error class ="white--text" @click.native ="Remove">ลบ</v-btn>
                </template>

            </v-card-actions>
          </v-card>
      </v-container>


  </div>
</template>
<script>
import axios from 'axios'

import { quillEditor } from 'vue-quill-editor'
import { ImageImport } from '../../../modules/ImageImport.js'
 import { ImageResize } from '../../../modules/ImageResize.js'
 Quill.register('modules/imageImport', ImageImport)
 Quill.register('modules/imageResize', ImageResize)

let mParams;
export default {
  async asyncData({params,store}){
    store.commit('setPage','เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ')
    //  const filter =  store.state.lesson.filter(data => params.title == data.key ? data : undefined)
        //console.log("filters: " + filter);
        // if(filter == ''){
        //   console.log("not found");
        // }else{
        //     console.log("found: " + filter);
        // }
        mParams = params.title;
        const { data } =  await axios.get('https://salon-b177d.firebaseio.com/lessons/' + params.title + '.json')
        store.commit('addLesson',data)
        data.key = mParams
        console.log("data: " + JSON.stringify(data));
        return data;
    },
    methods: {
      Remove(){
        console.log("params: " + mParams);
          axios.delete('https://salon-b177d.firebaseio.com/lessons/' + mParams + '/.json')
          .then((res)=>{
            this.$router.push('/manage')
          })
      },
      onEditorBlur(editor) {
       console.log('editor blur!', editor)
     },
     onEditorFocus(editor) {
       console.log('editor focus!', editor)
     },
     onEditorReady(editor) {
       console.log('editor ready!', editor)
     },
     onEditorChange({ editor, html, text }) {
       console.log('editor change!', editor, html, text)
       this.content = html
     },
     Save(){
       this.editLesson.author = this.author;
       this.editLesson.courseId = this.courseId;
       this.editLesson.cover = this.cover;
       this.editLesson.like = this.like;
       this.editLesson.number =this.number;
       this.editLesson.time = this.time;
       this.editLesson.title = this.title;
       this.editLesson.view = this.view;
       this.editLesson.description = this.description;
       this.editLesson.content = this.content;
       console.log("res: " + JSON.stringify(this.editLesson));
       axios.put('https://salon-b177d.firebaseio.com/lessons/' + mParams + '.json',this.editLesson)
       .then((res)=>{
         console.log("res2: " + JSON.stringify(res));
       })

       this.edit = false
     }

},
watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      }
    },
components: {
  quillEditor
},
computed:{
  editor() {
     return this.$refs.myQuillEditor.quill
   },
   mContent(){
     return this.content
   },
   mDescription(){
     return this.description
   }

},
data(){
  return {
    edit : false,
    editLesson :{
          description : '',
          content : ''
    },
    editorOption: {
      modules: {
         imageImport: true,
         imageResize: {
         displaySize: true
       }
       }
     }
  }
},
mounted() {
  //do something after mounting vue instance
  console.log("this.content: " + this.mContent);
}
}
</script>
