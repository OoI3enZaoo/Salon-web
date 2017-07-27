<template>
<div>
  ้

  <v-container>



    <ul>
      <!-- <li v-for="item in cousesItem" :key="item" v-if="item.key">
        ชื่อคอร์ส {{item.key}}
      {{ item['.key'] }}
        ผู้สอน {{item.author}} รายละเอียด {{item.description}}
        <v-btn icon primary @click.native="addLesson(item)">
          <v-icon class="white--text">add</v-icon>
        </v-btn> -->


        <li v-for="item in cousesRef" :key="item" >

          ชื่อคอร์ส {{item.key}} {{i}}ผู้สอน {{item.author}} รายละเอียด {{item.description}}
          <v-btn icon primary @click.native="addLesson(item['.key'])">
            <v-icon class="white--text">add</v-icon>
          </v-btn>

        <ul>
          <li v-for="lesson in lessonRef"  v-if="item['.key'] == lesson.courseId">
                  <p>{{lesson.number}}</p>
                  <v-btn icon primary @click.native="removeLesson(lesson)">
                    <v-icon error class="white--text" >remove</v-icon>
                  </v-btn>
          </li>
        </ul>

            <!-- <ul>

              <li v-for="lesson in lessonsItem" v-if="lesson.courseId == item.key">
                   {{lesson.number}}
                   <v-btn icon primary @click.native="removeLesson(lesson.key)">
                     <v-icon error class="white--text" >remove</v-icon>
                   </v-btn>
               </li>
                 </ul> -->
      </li>
    </ul>



    <v-layout row wrap>
      <v-flex sm10 xs12>
        <v-select label="ค้นหาคอร์สที่สนใจ" v-bind:items="states" v-model="e7" multiple chips persistent-hint></v-select>
      </v-flex>
      <v-flex sm2 xs12>
        <createCourse></createCourse>

      </v-flex>


    </v-layout>





    <v-layout row wrap>
      <v-flex xs12 sm6>
        <h2 class="display-1">  คอร์สเจ้าของร้านทำผม</h2>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-right">
          <v-btn icon primary class="white--text display:inline">
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

    <blockquote>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant
      invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</blockquote>

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
      <template v-for="item in testCouses">
      <v-flex xs12 sm6>
        <nuxt-link tag ="span" type="span" :to="'/manage/hello/sawasdee_kub'" style ="cursor:pointer;" >
        <v-card class ="elevation-1">
          <v-layout row>
              <v-flex xs4>

                  <v-card-media height="200px" :src="item.img"> </v-card-media>


              </v-flex>
              <v-flex xs8>
                  <v-card-title>
                    <h6 class="headline grey.darken--text">{{item.title}}</h6>
                    <p class ="item-description" style="-webkit-box-orient:vertical;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                  </v-card-title>
                  <v-card-actions >
                  <p><v-icon>access_time</v-icon>&nbsp;2017/7/27&nbsp;20:36</p>&nbsp;&nbsp;
                  <p><v-icon>remove_red_eye</v-icon>&nbsp;652</p>&nbsp;&nbsp;
                    <p><v-icon>favorite</v-icon>&nbsp;50</p>&nbsp;&nbsp;
                </v-card-actions>
              </v-flex>
          </v-layout>
        </v-card>
        <br>
      </nuxt-link>
      </v-flex>
      </template>
    </v-layout>
    <br>
    <div class="text-xs-center">
      <v-pagination v-bind:length.number="4" circle></v-pagination>
    </div>







    <br>
    <v-divider></v-divider>
    <br>


  </v-container>
</div>
</template>
<script>
import {
  db
} from '../../util/firebase'
import axios from 'axios'
let cousesRef = db.ref('courses')
let lessonRef = db.ref('lessons')
import createCourse from '~components/createCourse'

export default {
  //middleware : 'authenticated',
  firebase: {
    lessonRef,
    cousesRef
  },
  components: {
    createCourse
  },
  fetch({
    store
  }) {
    store.commit('setPage', "การจัดการ")
  },

  data() {
    return {
      testCouses: [{
          img: "https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "https://pbs.twimg.com/profile_images/781901562218057729/6TNebxkc.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "https://previews.123rf.com/images/feverpitched/feverpitched1102/feverpitched110200003/8923951-Big-Chance-Green-Road-Sign-with-Dramatic-Clouds-Sun-Rays-and-Sky--Stock-Photo.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "https://s-media-cache-ak0.pinimg.com/originals/73/13/0c/73130c848010e8a7489682fb27393e69.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        },
        {
          img: "http://tvseriesclub.com/wp-content/uploads/2016/01/second-chance-%E0%B8%8B%E0%B8%B1%E0%B8%9A%E0%B9%84%E0%B8%97%E0%B8%A2.jpg",
          title: "เรียนรู้การเป็นเจ้าของร้านแบบมืออาชีพ"
        }
      ],
      e7: ['คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'],
      states: [
        'คอร์สเจ้าของร้านเสริมสวย', 'คอร์สร้านตัดผม', 'คอร์สช่างเสริมสวย', 'คอร์สผู้สนใจช่างเสริมสวย'
      ],
      cousesItem : [''],
      lessonsItem : ['']


    }
  },
  beforeMount() {

    //do something after mounting vue instance
    if (JSON.parse(localStorage.getItem("isLogin")) == false) {
      this.$store.commit('islogin', false)
      this.$router.push('/')
    } else {
      this.$store.commit('islogin', true)
      this.$router.push('/manage')
    }


  },
  methods: {
    addLesson(item) {
      console.log("item: " + item);
      let number = Math.floor((Math.random() * 100) + 1);
        let a = {
          author : "my name is ben",
          content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          courseId : item,
          cover : "https://image.flaticon.com/teams/slug/freepik.jpg",
          description  : "loremrelrekjdlkfj",
          time : "27/7/2560 22.21",
          title : "บทเรียนใหมdfdfdf่",
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
