<template>
  <div>

      <v-container>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <div class="text-xs-center">
                        <img :src="lesson[0].cover" height="100">
                    </div>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <div class="text-sm-left text-xs-center">
                          <template v-if="!edit">
                              <h5 v-text="lesson[0].title"></h5>
                          </template>
                          <template v-else>
                              <v-text-field v-model="lesson[0].title"></v-text-field>
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
              <v-card-media height="400px" :src ="lesson[0].cover"></v-card-media>
            </template>
            <template v-else>
                  <base64-upload class="user" style="height: 400px; background-size: cover;"
                    :imageSrc="editLes.cover"
                    @change="onChangeImage"></base64-upload>
            </template>
            <v-card-text>
                <br>  
                  <h6 class ="primary--text">เนื้อหา</h6>
                  <span v-if="!edit">
                    <span v-html="lesson[0].description"></span>
                  </span>

                          <!-- <quil v-else v-model="editLes.content"></quil> -->
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
lesson >> {{lesson}}

  </div>
</template>
<script>
import axios from 'axios'


import {mapGetters,mapActions} from 'vuex'
import Base64Upload from 'vue-base64-upload'
let mParams;
export default {
  async asyncData({params,store}){
    mParams = params.lesson;
    store.commit('setPage','เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ')
    store.commit('setCurrentLesson',mParams)
    console.log('params.title: ' + JSON.stringify(params));
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
  Base64Upload
},
computed:{
   mContent(){
     return this.content
   },
   mDescription(){
     return this.description
   },
   ...mapGetters([
     'currentLesson','getLessonFromId'
   ]),
   lesson () {
     return this.getLessonFromId(this.$route.params.lesson)
   },

},
created() {
  //do something after mounting vue instance
  // this.editLes.author = this.currentLesson[0].author;
  // this.editLes.courseId = this.currentLesson[0].courseId;
  // this.editLes.cover = this.currentLesson[0].cover;
  // this.editLes.like = this.currentLesson[0].like;
  // this.editLes.number =this.currentLesson[0].number;
  // this.editLes.time = this.currentLesson[0].time;
  // this.editLes.view = this.currentLesson[0].view;
  // this.editLes.description = this.currentLesson[0].description;
  // this.editLes.content = this.currentLesson[0].content;
  // this.editLes.title = this.currentLesson[0].title;

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
