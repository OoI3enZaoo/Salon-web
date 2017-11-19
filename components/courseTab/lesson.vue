<template>
  <div>
    <v-container grid-list-lg>

        <template v-if="lesson.length > 0">
              <div class="text-xs-right ">

                <createLesson></createLesson>
              </div>
              <v-layout row wrap>
                  <template v-for="(data, i) in $store.getters.lessonFromCourseId(this.$route.params.course_id)">
                      <expansion :data="data" :number="i+1"></expansion>
                  </template>
              </v-layout>
          </template>
          <template v-else>
              <v-layout>
                <v-flex xs12 text-xs-center>
                  <v-card height="400px">
                    <v-card-text>
                      <div>
                          <v-layout row wrap style="padding-top:80px;">
                            <v-flex xs12 md3 offset-md3 >
                                <img src="https://d1srlirzdlmpew.cloudfront.net/wp-content/uploads/sites/92/2014/11/06042205/Three-lessons-I-learnt-from-my-credit-card-hack.png" height="150">
                            </v-flex>
                            <v-flex xs12 md5 text-md-left text-xs-center mt-4>
                              <h5>คุณยังไม่มีบทเรียนเลย ไม่ลองสร้างสักบทเรียนล่ะ</h5>
                                <createLesson></createLesson>
                            </v-flex>
                          </v-layout>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
          </template>

    </v-container>
  </div>
</template>
<script>
import createLesson from '../lesson/createLesson.vue'
import expansion from '../lesson/expansion.vue'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  components: {
    createLesson,
    expansion
  },
  computed: {
    lesson () {
      return this.$store.getters.lessonFromCourseId(this.$route.params.course_id)
    }
  }
}
</script>
