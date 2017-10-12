<template>
<div>

  <v-container grid-list-lg>
    <div class="text-xs-right">
      <createCourse></createCourse>
    </div>
    <br>
    <v-layout row wrap>
      <template v-for="data in $store.state.course">
         <v-flex xs12 lg6>
           <nuxt-link :to="'/manage/course/' + data.course_id" tag="span" style="cursor:pointer;">
              <v-card>
                <v-layout row wrap>
                  <v-flex lg3 xs12>
                    <v-card-media :src="data.cover" height="200"></v-card-media>
                  </v-flex>
                  <v-flex lg5 xs12>
                    <v-card-text>
                      <p class="headline">ddffdหกดหกดหกดหdfs</p>
                      <p class="grey--text">{{data.fname}} {{data.lname}}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex lg4 xs12 text-xs-right>
                    <v-card-text>
                      <span class="grey--text">{{data.ts}}</span><br>
                          <div class="mt-5">
                              <h6><b>ราคา: {{data.price}}</b></h6>
                          </div>
                      </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
              <br>
            </nuxt-link>
         </v-flex>
      </template>
    </v-layout>


    <!-- <loadData></loadData> -->

  </v-container>
</div>
</template>
<script>

import axios from 'axios'
import loadData from '../../components/loadData'
import createCourse from '../../components/createCourse.vue'

//5555
export default {
  asyncData ({store}) {
    store.dispatch('pullCourse')
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  components: {
    loadData,
    createCourse
  },
  fetch({
    store
  }) {
    store.commit('setPage', "การจัดการ")
  },
  data() {
    return {
      pagination: {},
      namena: 'benben',
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
      cousesItem : [''],
      lessonsItem : ['']
    }
  },
  watch: {
    checkData : {
        handler: function(val) {
          this.$socket.emit('addNewCourse', val[1])
      }
    }
  },
  computed: {
      checkData () {
        return this.$store.getters.checkAddData
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
  }

}
</script>
