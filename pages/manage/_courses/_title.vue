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
                          <h5>{{currentLesson[0].title}}</h5>
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

            <v-card-media height="400px" :src ="currentLesson[0].cover"></v-card-media>
            <v-card-text>
              <h6 class ="primary--text">รายละเอียด</h6>
                <span v-if="!edit">
                  {{currentLesson[0].description}}
                </span>
                    <v-text-field  class="input-group--focused" v-else label="แก้ไข"  v-model="currentLesson[0].description"></v-text-field>
                <br>  <br>  <br>
                  <h6 class ="primary--text">เนื้อหา</h6>


                  <span v-if="!edit">
                    <span v-html="currentLesson[0].content"></span>
                  </span>
                  <quill-editor v-else
                        ref="myQuillEditor"
                        v-model="currentLesson[0].content"
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
import {mapGetters,mapActions} from 'vuex'
let mParams;
export default {
  async asyncData({params,store}){
    mParams = params.title;
    store.commit('setPage','เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ')
    store.commit('setCurrentLesson',mParams)
    //  const filter =  store.state.lesson.filter(data => params.title == data.key ? data : undefined)
        //console.log("filters: " + filter);
        // if(filter == ''){
        //   console.log("not found");
        // }else{
        //     console.log("found: " + filter);
        // }

        // const { data } =  await axios.get('https://salon-b177d.firebaseio.com/lessons/' + params.title + '.json')
        // store.commit('addLesson',data)
        // data.key = mParams
        // console.log("data: " + JSON.stringify(data));
        // return data;
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
       this.editLes.author = this.currentLesson[0].author;
       this.editLes.courseId = this.currentLesson[0].courseId;
       this.editLes.cover = this.currentLesson[0].cover;
       this.editLes.like = this.currentLesson[0].like;
       this.editLes.number =this.currentLesson[0].number;
       this.editLes.time = this.currentLesson[0].time;
       this.editLes.title = this.currentLesson[0].title;
       this.editLes.view = this.currentLesson[0].view;
       this.editLes.description = this.currentLesson[0].description;
       this.editLes.content = this.currentLesson[0].content;

       this.editLesson({
         params : mParams,
         data : this.editLes})


      // console.log("res: " + JSON.stringify(this.editLes));


       this.edit = false
     },    
     ...mapActions([
        'editLesson'
     ])

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
   },
   ...mapGetters([
     'currentLesson'
   ])

},
data(){
  return {
    edit : false,
    editLes :{
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
}
}
</script>
