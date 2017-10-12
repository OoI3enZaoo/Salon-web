<template>
  <div>
    <parallax :src="$store.state.background" height="200">
      <v-layout>
        <v-flex sm3 xs6>
            <img :src="course.cover" height="150">
        </v-flex>
        <v-flex sm9 xs6>
          <h4 class="white--text" ><v-btn dark icon nuxt to="/manage"><v-icon dark large>insert_invitation</v-icon></v-btn> / <nuxt-link tag="span" :to="'/manage/course/' + course.course_id" style="cursor:pointer;"><b>{{course.title}} </b></nuxt-link> / <b>{{lesson.title}}</b></h4>
          <h6 class="white--text">ผู้สร้าง {{course.fname}} {{course.lname}}</h6>
          <h6 class="white--text">สร้างเมื่อ: {{course.ts}}</h6>
          <h6 class="white--text">ราคา {{course.price}}</h6>
        </v-flex>
      </v-layout>
    </parallax>
<br>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout>
              <v-flex xs2>
                <v-avatar size="80px">
                  <img :src="lesson.avatar" alt="avatar" >
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <p class="headline">{{lesson.title}}</p>
                <p>บทความโดย {{lesson.fname}} {{lesson.lname}}</p>
              </v-flex>
              <v-flex text-xs-right>
                <v-btn icon dark color="primary"><v-icon>edit</v-icon></v-btn>
                <v-btn icon dark color="error"><v-icon>delete</v-icon></v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-media :src="lesson.cover" height="200px"> </v-card-media>
          <v-card-text>
            <p class="headline info--text">เนื้อหารายละเอียด</p>
            <p v-html="lesson.description"></p>
            <v-layout><v-flex text-xs-right>
              <v-btn dark color="primary">บันทึก</v-btn>
              <v-btn dark color="error">ลบ</v-btn>
            </v-flex></v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>
<script>
import parallax from '../../../../../components/parallax.vue'
import mycourse from '../index.vue'
export default {
  async asyncData ({store, route}) {
    await store.dispatch('pullCourse', route.params.course_id)
    await store.dispatch('pullLesson', route.params.course_id)
  },
  components: {
    parallax
  },
  computed: {
    course () {
      return this.$store.getters.courseFromId(this.$route.params.course_id)[0]
    },
    lesson () {
      return this.$store.getters.lessonFromId(this.$route.params.lesson_id)[0]
    }
  }
}
</script>
