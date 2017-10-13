<template>
    <v-dialog app v-model="dialog" fullscreen transition="dialog-bottom-transition" overlay=false>
      <v-btn class="primary white--text" large slot="activator">สร้างบทเรียน</v-btn>
      <v-card>
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มคอร์สใหม่</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card>
            <v-card-title>
              <h3 class ="headline">ฟอร์มรายการสร้างบทเรียนใหม่</h3>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="lesson.title" label="ชื่อบทเรียน"></v-text-field><br>
                <base64-upload style="width: 300px;"
                  imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                  @change="onChangeImage"></base64-upload><br>
                <quill v-model="lesson.description"></quill>
                <br><br><br><br>
                <v-btn color="primary" :disabled ="!fromIsValid" @click.native="AddLesson">สร้างบทเรียน</v-btn>
            </v-card-text>
          </v-card>
        </v-container>

      </v-card>
    </v-dialog>
</template>
<script>
 import quill from './quill.vue'
import Base64Upload from 'vue-base64-upload'
import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  components: {
   Base64Upload,
   quill
 },
  data() {
    return {
      dialog: false,
      lesson: {
        title: '',
        description: '',
        cover: ''
      }
    }
  },
  methods: {
    onChangeImage(file) {
      this.lesson.cover = 'data:image/jpeg;base64,'+ file.base64
      console.log(this.lesson)
    },
    AddLesson () {
      console.log(this.lesson)
      this.lesson.lesson_id = (new Date().getTime())
      this.lesson.course_id = this.$route.params.course_id
      this.lesson.admin_id = this.$store.state.adminData.admin_id
      this.lesson.view = 0
      this.lesson.love = 0
      this.lesson.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')

      this.$store.dispatch('InsertLesson', this.lesson)
      this.lesson.fname = this.$store.state.adminData.fname
      this.lesson.lname = this.$store.state.adminData.lname
      this.lesson.avatar = this.$store.state.adminData.avatar
      this.$store.commit('addLesson', [this.lesson])
      // this.lesson.title = ''
      // this.lesson.description = ''
      // this.lesson.cover = ''
    }
  },
 computed: {
   fromIsValid () {
     return this.lesson.title !== ''
     && this.lesson.description !== ''
     && this.lesson.cover !== ''
   }
 }
}
</script>
