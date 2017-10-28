<template>
<div>

  <v-container grid-list-lg>
      <v-layout>
        <v-flex xs7>
            <v-text-field v-model= "searchModel" solo label="ค้นหาคอร์ส"></v-text-field>
        </v-flex>
        <v-flex text-xs-right>
          <createCourse @mycourse="mycourse"></createCourse>
        </v-flex>
      </v-layout>
    <br>
    <v-layout row wrap>
      <template v-for="data in afterSearch">
         <v-flex v-if="data.video !== null" xs12 lg6 class="mt-2">
           <nuxt-link :to="'/manage/course/' + data.course_id" tag="span" style="cursor:pointer;">
              <v-card>
                <v-layout row wrap>
                  <v-flex lg4 xs12>
                    <v-card-media :src="data.cover" height="200"></v-card-media>
                  </v-flex>
                  <v-flex lg4 xs12>
                    <v-card-text>
                      <p class="headline">{{data.title}}</p>
                      <p class="grey--text">{{data.fname}} {{data.lname}}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex lg4 xs12 text-xs-right>
                    <v-card-text >
                      <span class="grey--text">{{data.tstamp}}</span><br>
                          <div class="mt-5" >
                              <h6 style="margin-top:100px;"><b>ราคา: {{data.price}}</b></h6>
                          </div>
                      </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
              <br>
            </nuxt-link>
         </v-flex>
         <v-flex v-else xs12 lg6>
           <v-card height="217px">
             <v-card-text>
               <div class="text-xs-center" style="margin-top:40px;">
                 <v-layout row wrap>
                   <v-flex xs5 md3 offset-xs1 offset-xs2>
                       <img :src="workIcon" height="100px">
                   </v-flex>
                   <v-flex xs5>
                     <h6>ระบบกำลังทำการสร้าง...</h6>
                     <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
                   </v-flex>
                 </v-layout>
               </div>
             </v-card-text>
           </v-card>
         </v-flex>
      </template>
    </v-layout>
    <!-- <loadData></loadData> -->
  </v-container>
</div>
</template>
<script>
import axios from 'axios'
import createCourse from '../../components/createCourse.vue'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  async asyncData ({store}) {
    await store.dispatch('pullCourse')
  },
  created () {
    this.afterSearch = this.course
  },
  components: {
    createCourse
  },
  fetch({store}) {
    store.commit('setPage', "การจัดการ")
  },
  data() {
    return {
      searchModel: '',
      afterSearch: '',
      workIcon: require('../../static/work.png')
    }
  },
  watch: {
    searchModel: function (val) {
      this.getAnswer(val)
    },
    course: function (val) {
      if (this.afterSearch == '') {
        this.afterSearch = this.course
      }
    }
  },
  methods: {
    getAnswer (val) {
      let vmData = []
      if (val == '') {
        this.afterSearch = this.course
      } else {
        this.course.map(res => {
          console.log(res)
          let title = res.title.search(val)
          if (title != -1) {
            vmData.push(res)
          }
        })
        this.afterSearch = vmData
      }
    },
    mycourse (str) {
      let data = str
      data.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      data.admin_id = this.$store.state.adminData.admin_id
      this.$store.dispatch('AddNewCourse', data)
    }
  },
  computed: {
    course () {
      return this.$store.state.course
    }
  }
}
</script>
