<template>
  <div>
    <v-layout row wrap>
      <v-flex sm10 xs12>
        <v-select label="ค้นหาคอร์สที่สนใจ" v-bind:items="this.courseList" v-model="courseSelect" multiple chips persistent-hint v-tooltip:top="{html : 'คลิ๊กเพื่อเลือกคอร์ส'}"></v-select>
      </v-flex>
      <v-flex sm2 xs12>
        <createCourse v-model="editLes"></createCourse>
      </v-flex>
    </v-layout>
    <span v-for="(course,index) in loadCourse" :key="course" >
      <span v-for="select in courseSelect">
        <span v-if="course.name == select">
    <v-layout row wrap>
      <v-flex xs12 sm6>

              <h2 class="display-1"> {{course.name}}</h2>

      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-right text-sm-right text-md-right">


          <v-btn icon primary class="white--text display:inline" @click.native="Add(course.key)"  >
             <v-icon>add</v-icon>
             </v-btn>

          <v-btn v-if="course.edit == false"icon info class ="white--text " @click.native="course.edit = !course.edit" v-tooltip:top="{html : 'แก้ไขรายละเอียดคอร์ส'}" ><v-icon>mode_edit</v-icon></v-btn>
          <template v-else>
            <v-btn  icon info class ="white--text" @click.native="save(course,editLes[index])" v-tooltip:top="{html : 'บันทึก'}" ><v-icon>save</v-icon></v-btn>
              <v-btn  icon info class ="white--text" @click.native="cancel(course,editLes[index])" v-tooltip:top="{html : 'ยกเลิก'}"><v-icon>cancel</v-icon></v-btn>
          </template>
          <v-btn icon error class="white--text " @click.native="RemoveC(course.name,course.key)" v-tooltip:top="{html : 'ลบคอร์ส'}">
          <v-icon>delete</v-icon>
          </v-btn>

        </div>
      </v-flex>
    </v-layout>
    <template v-if="!course.edit">
          <blockquote>
            <v-expansion-panel >
                  <v-expansion-panel-content>
                    <div slot="header" v-if="course.snippet">{{course.snippet}}</div>
                    <div slot="header" v-else>แนะนำคอร์ส</div>
                    <v-card>
                      <v-card-text>
                          <p v-html="course.description"></p>
                      </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
          </blockquote>
    </template>
    <template v-else>
          <blockquote>

            <v-expansion-panel expand>
                  <v-expansion-panel-content default>
                  <v-text-field v-model ="editLes[index].snippet"></v-text-field>
                    <v-card>
                      <v-card-text>
                      <!-- <v-text-field type ="text" auto-grow textarea v-model ="course.description"></v-text-field> -->

                          <quil v-model="editLes[index].description"></quil>

                      </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
          </blockquote>
    </template>

    <div class="text-xs-right">
    <p style="display:inline" v-tooltip:top="{html : 'ราคา'}">
      <v-icon large>attach_money</v-icon> 2500</p>&nbsp;&nbsp;
    <p style="display:inline" v-tooltip:top="{html : 'ขายไปแล้ว'}">
      <v-icon large>shopping_cart</v-icon>50</p> &nbsp;&nbsp;

  </div>


    <br>
    <v-divider></v-divider>
    <br>

    <v-layout row wrap>
      <template v-for="lesson in loadLesson" v-if="course.key == lesson.courseId"  v-bind:pagination.sync="page" >
      <v-flex sm12 md6 lg4 xl3>
        <v-card class ="elevation-1" v-tooltip:top="{html : 'กดเพื่อดูรายละเอียด'}">
          <v-layout row>
              <v-flex xs4>
                  <v-card-media height="200px" :src="lesson.cover"> </v-card-media>
              </v-flex>
              <v-flex xs8>
                <nuxt-link tag ="span" type="span" :to="'/manage/'+ course.key+ '/'+ lesson.key" style ="cursor:pointer;" >
                  <v-card-title>
                    <h6 class="headline grey.darken--text">{{lesson.title}}</h6>
                    <p class ="item-description" style="-webkit-box-orient:vertical;">{{lesson.description}}</p>

                  </v-card-title>
                    </nuxt-link>
                  <v-card-actions >
                  <p><v-icon>access_time</v-icon>&nbsp;2017/7/27&nbsp;20:36</p>&nbsp;&nbsp;
                  <p><v-icon>remove_red_eye</v-icon>&nbsp;{{lesson.view}}</p>&nbsp;&nbsp;
                    <p><v-icon>favorite</v-icon>&nbsp;{{lesson.like}}</p>&nbsp;&nbsp;

                      <!-- <p><v-btn icon @click.native="RemoveL(lesson.key)" class ="red red--text" flat>ลบ</v-btn></p>&nbsp;&nbsp; -->
                </v-card-actions>
              </v-flex>
          </v-layout>
        </v-card>
        <br>
      </v-flex>
      </template>

    </v-layout>

    <br>
    <v-divider></v-divider>
    <br>
      <br>

    </span></span>
  </span>

  </div>
</template>
<script>

import axios from 'axios'
import createLesson from './createLesson.vue'
import createCourse from './createCourse.vue'
import {mapGetters,mapActions} from 'vuex'
import quil from './quill.vue'

export default {

   created() {
    //this.editLes = editData
    //do something after creating vue instance

    console.log("Created  this.courseData: " + this.courseData);

    this.courseSelect  = this.courseList
      this.editLes = this.courseData

    // let arrayItem = []
    //   this.loadLesson.forEach((val,index)=>{
    //       //console.log("val: " + JSON.stringify(this.loadLesson.slice(1).slice(-5)));
    //       //console.log("index: " + index);
    //       //index == 17
    //       if(index %5 == 0 && index != 0){
    //         console.log("= 5: " + index);
    //         arrayItem.push(val)
    //         this.currentItem.push({arrayItem})
    //         console.log("arrayItem: " + arrayItem);
    //         console.log("this.currentItem: " +this.currentItem);
    //         console.log("arrayItem.length: " + Object.keys(arrayItem).length);
    //         arrayItem = []
    //       }else{
    //         arrayItem.push(val)   //[{},{},{},{}]
    //         console.log("!= 5: " + index);
    //       }
    //   })
    //   console.log("end");
    //     this.currentItem.push({arrayItem})
    //   console.log("arrayItem.length: " + Object.keys(arrayItem).length);
    //   console.log("this.currentItem: " + this.currentItem);

  },
  data: () => ({

    edit : false,
    editorOption: {
      modules: {
         imageImport: true,
         imageResize: {
         displaySize: true
       }
       }
     },
     editLes : [],
      pagination: {},
      page: 1,
      pages: 20,
      currentItem : [],
      courseSelect : []
  }),
  components: {
    createCourse,quil,createLesson
  },
  // watch : {
  //   page(){
  //     console.log("page: " + this.page);
  //     this.loadLesson = this.currentItem[this.page-1]
  //     //console.log("loadLesson: " + JSON.stringify(this.loadLesson.slice(1).slice(-5)  )  );
  //     console.log("this.currentItem[this.page]: " + JSON.stringify(this.currentItem[this.page-1]));
  //   }
  // },
  methods: {
    Add(key) {
      console.log("item: " + key);
      let number = Math.floor((Math.random() * 100) + 1);
        let data = {
          author : "my name is ben",
          content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          courseId : key,
          cover : "https://pbs.twimg.com/profile_images/781901562218057729/6TNebxkc.jpg",
          description  : "Quis imperdiet nostra tempus nemo cursus quisque, et semper. Ut vivamus neque ac eros urna, at nunc velit sit wisi diam arcu, nonummy ac ut volutpat integer sed, orci placerat mollis donec vel. Luctus integer est orci at commodo, dapibus vel aenean in varius, wisi tempor metus urna mus magna. Orci nulla risus sit arcu luctus, elit massa, volutpat vitae ac, quis ullamcorper mauris elit id integer. Non lorem pretium elit turpis sed, erat odio inceptos elit a massa, ac consequat, est nec nonummy. Leo arcu eros. Justo nisl cras donec, praesent sollicitudin, sem ornare magna bibendum maecenas diam, accumsa",
          time : "27/7/2560 22.21",
          title : "การต่อรอง2",
          view : 5,
          like : 200,
          number : number
        }
        //lessonRef.push(a);
        console.log("data: "+data);
        this.addLesson(data)
    },
    RemoveL(item){
      //lessonRef.child(item['.key']).remove();
      console.log("loadLesson: " + this.loadLesson);
      this.removeLesson(item)

    },
    ...mapActions([
      'removeLesson','addLesson','setCourse','removeCourse'
    ]),
    cancel(course,courseEdit){
       course.edit = !course.edit
       courseEdit.name = course.name
        courseEdit.description = course.description
        courseEdit.snippet = course.snippet
       console.log("Course: " + JSON.stringify(course));
       console.log("courseEdit: " + JSON.stringify(courseEdit));
    },
    save(course,courseEdit){
        course.edit = !course.edit
        course.name = courseEdit.name
        course.description = courseEdit.description
        course.snippet = courseEdit.snippet
        this.setCourse({key : course.key, data : course})
    },
    RemoveC(name,key){
      console.log("key: " + key);
      console.log("name: " +name);
      this.removeCourse({id: key , name: name})
      this.$socket.emit('removeCourse',key)

    },
    loadEditCourse(index){
        return this.editLes[index]
    }

  },
  mounted() {
    //do something after mounting vue instance





  },
  watch: {
    courseList : function(val)  {
      console.log('val: ' + val);
        if(val !== '') {
          console.log("not null");
          this.courseSelect  = this.courseList
            this.editLes = this.courseData
        }
        else {
          console.log('null');
        }
    }
  },
  computed:{
    ...mapGetters([
      'courseData','lessonsData','courseList'
    ]),
    loadCourse(){
      return this.courseData
    },
    loadLesson(){
      return  this.lessonsData
    },
    // loadLessonPage(){
    //   return this.currentItem[this.page].arrayItem
    // },
    edit2(){
      return console.log("this.loadCourse.length: " +  this.loadCourse.length)
    },
    lessonLength(){
      return this.loadLesson.length
    }
  }
}
</script>
<style>
.item-description {
  font-size: .9em;
  margin: 0;
  margin-bottom: .3em;
  height: 5em;
  line-height: 1.8em;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>
