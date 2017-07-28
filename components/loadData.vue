<template>
  <div>

    <v-layout row wrap>
      <v-flex sm10 xs12>
        <v-select label="ค้นหาคอร์สที่สนใจ" v-bind:items="states" v-model="e7" multiple chips persistent-hint></v-select>
      </v-flex>
      <v-flex sm2 xs12>
        <createCourse></createCourse>
      </v-flex>
    </v-layout>

    <span v-for="course in courseRef" :key="course">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <h2 class="display-1"> {{course.name}}</h2>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-right">
          <v-btn icon primary class="white--text display:inline" @click.native="addLesson(course['.key'])" >
          <v-icon>add</v-icon>
          </v-btn>
          <v-btn icon info class="white--text display:inline">
            <v-icon>mode_edit</v-icon>
          </v-btn>
          <v-btn icon error class="white--text display:inline">
          <v-icon>delete</v-icon>
          </v-btn>

        </div>
      </v-flex>
    </v-layout>
    <blockquote>{{course.description}}</blockquote>

    <div class="text-xs-right">
      <p style="display:inline">
        <v-icon large>attach_money</v-icon> 2500</p>&nbsp;&nbsp;
      <p style="display:inline">
        <v-icon large>shopping_cart</v-icon>50</p> &nbsp;&nbsp;

    </div>

    <br>
    <v-divider></v-divider>
    <br>

    <v-layout row wrap>
      <template v-for="lesson in lessonRef" v-if="course['.key'] == lesson.courseId">
      <v-flex xs12 sm6>

        <v-card class ="elevation-1">
          <v-layout row>
              <v-flex xs4>
                  <v-card-media height="200px" :src="lesson.cover"> </v-card-media>
              </v-flex>
              <v-flex xs8>
                <nuxt-link tag ="span" type="span" :to="'/manage/'+ course['.key']+ '/'+ lesson['.key']" style ="cursor:pointer;" >
                  <v-card-title>
                    <h6 class="headline grey.darken--text">{{lesson.title}}</h6>
                    <p class ="item-description" style="-webkit-box-orient:vertical;">{{lesson.description}}</p>

                  </v-card-title>
                    </nuxt-link>
                  <v-card-actions >
                  <p><v-icon>access_time</v-icon>&nbsp;2017/7/27&nbsp;20:36</p>&nbsp;&nbsp;
                  <p><v-icon>remove_red_eye</v-icon>&nbsp;{{lesson.view}}</p>&nbsp;&nbsp;
                    <p><v-icon>favorite</v-icon>&nbsp;{{lesson.like}}</p>&nbsp;&nbsp;
                    <v-spacer></v-spacer>
                      <p><v-btn icon @click.native="removeLesson(lesson)"><v-icon error>delete</v-icon></v-btn></p>&nbsp;&nbsp;
                </v-card-actions>
              </v-flex>
          </v-layout>
        </v-card>
        <br>

      </v-flex>
      </template>
    </v-layout>

      <br>
    </span>
  </div>
</template>
<script>
import {
  db
} from '../util/firebase'
let courseRef = db.ref('courses')
let lessonRef = db.ref('lessons')
import createCourse from './createCourse.vue'
export default {
  firebase: {
    lessonRef,
    courseRef
  },
  name: "",
  data: () => ({
    e7: ['คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'],
    states: [
      'คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'
    ]
  }),
  components: {
    createCourse
  },
  methods: {
    addLesson(item) {
      console.log("item: " + item);
      let number = Math.floor((Math.random() * 100) + 1);
        let a = {
          author : "my name is ben",
          content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          courseId : item,
          cover : "https://pbs.twimg.com/profile_images/781901562218057729/6TNebxkc.jpg",
          description  : "Quis imperdiet nostra tempus nemo cursus quisque, et semper. Ut vivamus neque ac eros urna, at nunc velit sit wisi diam arcu, nonummy ac ut volutpat integer sed, orci placerat mollis donec vel. Luctus integer est orci at commodo, dapibus vel aenean in varius, wisi tempor metus urna mus magna. Orci nulla risus sit arcu luctus, elit massa, volutpat vitae ac, quis ullamcorper mauris elit id integer. Non lorem pretium elit turpis sed, erat odio inceptos elit a massa, ac consequat, est nec nonummy. Leo arcu eros. Justo nisl cras donec, praesent sollicitudin, sem ornare magna bibendum maecenas diam, accumsa",
          time : "27/7/2560 22.21",
          title : "การต่อรอง",
          view : 5,
          like : 200,
          number : number
        }
        lessonRef.push(a);


    },
    removeLesson(item){
      lessonRef.child(item['.key']).remove();

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
