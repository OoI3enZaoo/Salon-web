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
                          <v-btn icon error class ="white--text display:inline" @click.native="remove"><v-icon>delete</v-icon></v-btn>

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
                    <v-text-field  v-else multi-line label="แก้ไข" :value="description"></v-text-field>
                <br>  <br>  <br>
                  <h6 class ="primary--text">เนื้อหา</h6>

                  <span v-if="!edit">
                    {{content}}
                  </span>
                  <quill-editor v-else
                        ref="myQuillEditor"
                        v-model="editLesson.content"
                        :content ="mContent"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                      </quill-editor>
                        {{editLesson.content}}
                  <!-- <v-text-field  v-else multi-line label="แก้ไข" :value="content"></v-text-field> -->

            </v-card-text>
            <br><br>
            <v-card-actions v-if="edit">
                <v-spacer></v-spacer>
                <v-btn primary @click.native="Save">บันทึก</v-btn>
                    <v-btn class ="white primary--text" @click.native ="edit = !edit">ยกเลิก</v-btn>
            </v-card-actions>
          </v-card>
      </v-container>



      <v-container>


        <br>
        <v-divider></v-divider>






        <!-- <v-layout row wrap>
              <v-flex xs12 sm2>
                <div class="text-xs-center">
                    <img src="https://www.sochiie.com/wp-content/uploads/2014/04/facebook-teerasej-profile-ball-circle.png" height="80">
                </div>
              </v-flex>
              <v-flex xs12 sm8>
                <div class="text-xs-center text-sm-left">
                  <p class ="primary--text">Theerapat Vijitpoo &nbsp; &nbsp; <v-icon small>av_timer</v-icon> &nbsp;<span class="grey--text">2 ชั่วโมงที่แล้ว</span> </p>
                  <p>รอติดตามอยู่นะครับ</p>
                    </div>
              </v-flex>
              <v-flex xs12 sm2>
                <div class="text-xs-center text-sm-left">
                  <v-btn error icon class ="white--text"><v-icon>delete</v-icon></v-btn>
                </div>
            </v-flex>
         </v-layout> -->

            <!-- <br>
                <v-divider></v-divider>
            <br> -->
            {{lessonRef}}
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
 import {db} from '../../../util/firebase'
 let lessonRef = db.ref('lessons')
let mParams;
export default {
  firebase :{
      lessonRef
  },
  async asyncData({params,store}){
    store.commit('setPage','เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ')
      lessonRef.child(params.title)
        mParams = params.title;
        const { data } =  await axios.get('https://salon-b177d.firebaseio.com/lessons/' + params.title + '.json')
        return data;

},
methods: {
  remove(){
    console.log("params: " + mParams);
    lessonRef.child(mParams).remove()

      // axios.delete('https://salon-b177d.firebaseio.com/lessons/' + mParams + '/.json')
      // .then((res)=>{
      //   this.$router.push('/manage')
      // })
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
       axios.put('')
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
   }

},
data(){
  return {
    edit : false,
    editLesson :{
          description : '',
          content : '',
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
