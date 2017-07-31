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
                          <template v-if="!edit">
                              <h5 v-text="currentLesson[0].title"></h5>
                          </template>
                          <template v-else>
                              <v-text-field v-model="editLes.title"></v-text-field>
                          </template>
                        <span class = "hidden-xs-only ">บทความโดย&nbsp;&nbsp;&nbsp;</span>
                        <span>นายสมชาย น มงคล</span>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <span >11 กรกฎาคม 2560</span>

                    </div>
                  </v-flex>
                      <v-spacer></v-spacer>
                  <v-flex xs12 sm2>
                    <div class="text-sm-right text-xs-center">
                          <v-btn v-if="edit ==false"icon info class ="white--text display:inline" @click.native="edit = !edit" v-tooltip:top="{html : 'แก้ไข'}"><v-icon>mode_edit</v-icon></v-btn>
                          <template v-else>
                            <v-btn  icon info class ="white--text display:inline" @click.native="Save" v-tooltip:top="{html : 'บันทึก'}"><v-icon>save</v-icon></v-btn>
                              <v-btn  icon info class ="white--text display:inline" @click.native="cancel" v-tooltip:top="{html : 'ยกเลิก'}"><v-icon>cancel</v-icon></v-btn>
                          </template>
                          <v-btn icon error class ="white--text display:inline" @click.native="Remove" v-tooltip:top="{html : 'ลบ'}"><v-icon>delete</v-icon></v-btn>

                    </div>
                  </v-flex>
              </v-layout>

            </v-card-text>
            <template v-if="!edit">
              <v-card-media height="400px" :src ="currentLesson[0].cover"></v-card-media>
            </template>
            <template v-else>
                  <base64-upload class="user" style="height: 400px; background-size: cover;"
                    :imageSrc="editLes.cover"
                    @change="onChangeImage"></base64-upload>
            </template>
            <v-card-text>
              <h6 class ="primary--text">รายละเอียด</h6>
                <span v-if="!edit">
                  {{currentLesson[0].description}}
                </span>
                    <v-text-field  class="input-group--focused" v-else label="แก้ไข"   v-model="editLes.description"></v-text-field>
                <br>  <br>  <br>
                  <h6 class ="primary--text">เนื้อหา</h6>
                  <span v-if="!edit">
                    <span v-html="currentLesson[0].content"></span>
                  </span>

                          <quil v-else v-model="editLes.content"></quil>
            </v-card-text>
            <br><br>
            <v-card-actions >
                <v-spacer></v-spacer>
                <template v-if="edit">
                    <v-btn primary @click.native="Save" v-tooltip:top="{html : 'บันทึก'}">บันทึก</v-btn>
                    <v-btn class ="white primary--text" @click.native ="cancel" v-tooltip:top="{html : 'ยกเลิก'}">ยกเลิก</v-btn>
                </template>
                <template v-else>
                    <v-btn primary @click.native="edit = !edit" v-tooltip:top="{html : 'แก้ไข'}" >แก้ไข</v-btn>
                    <v-btn error class ="white--text" @click.native ="Remove" v-tooltip:top="{html : 'ลบ'}">ลบ</v-btn>
                </template>

            </v-card-actions>
          </v-card>
      </v-container>


  </div>
</template>
<script>
import axios from 'axios'


import {mapGetters,mapActions} from 'vuex'
import Base64Upload from 'vue-base64-upload'
import quil from '../../../components/quill.vue'
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
          this.$router.push('/manage')
          this.removeLesson(mParams)
      },
      testna(){
        console.log("testna555 ");
      },
     Save(){
       console.log("save");

       this.currentLesson[0].title =  this.editLes.title
       this.currentLesson[0].description =  this.editLes.description
       this.currentLesson[0].content =  this.editLes.content
       if(this.dataImg != ''){
         this.currentLesson[0].cover =  this.dataImg
         this.editLes.cover = this.dataImg
       }
       this.editLesson({
         params : mParams,
         data : this.currentLesson[0]})
      // console.log("res: " + JSON.stringify(this.editLes));


       this.edit = false
     },
     ...mapActions([
        'editLesson','removeLesson'
     ]),
     onChangeImage(file) {
       this.dataImg = 'data:image/jpeg;base64,'+file.base64;
     },
     cancel (){
          this.editLes.title = this.currentLesson[0].title
          this.editLes.description = this.currentLesson[0].description
          this.editLes.content = this.currentLesson[0].content
          this.editLes.cover = this.currentLesson[0].cover
          this.edit = !this.edit
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
  Base64Upload,quil
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
created() {
  //do something after mounting vue instance
  this.editLes.author = this.currentLesson[0].author;
  this.editLes.courseId = this.currentLesson[0].courseId;
  this.editLes.cover = this.currentLesson[0].cover;
  this.editLes.like = this.currentLesson[0].like;
  this.editLes.number =this.currentLesson[0].number;
  this.editLes.time = this.currentLesson[0].time;
  this.editLes.view = this.currentLesson[0].view;
  this.editLes.description = this.currentLesson[0].description;
  this.editLes.content = this.currentLesson[0].content;
  this.editLes.title = this.currentLesson[0].title;

},
data(){
  return {
    edit : false,
    editLes :[],
    dataImg : '',
    description: 'Hello'
  }
}
}
</script>
