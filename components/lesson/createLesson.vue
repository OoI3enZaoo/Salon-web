<template>
    <v-dialog app v-model="dialog" fullscreen transition="dialog-bottom-transition" overlay=false>
      <v-btn class="primary white--text" large slot="activator">สร้างบทเรียน</v-btn>
      <v-card>
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มบทเรียนของคอร์ส</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card>
            <v-card-title>
              <h3 class ="headline">ฟอร์มรายการสร้างบทเรียนใหม่</h3>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="lesson.title" label="ชื่อบทเรียน"></v-text-field><br>

                <MultipleFileUploader @myupload="myupload"  :buttonStatus="!fromIsValid"></MultipleFileUploader>

            </v-card-text>
          </v-card>
        </v-container>

      </v-card>
    </v-dialog>
</template>
<script>

import axios from 'axios'
import Vue from 'vue'
import MultipleFileUploader from '../lesson/MultipleFileUploader.vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  components: {
    MultipleFileUploader
  },
  data() {
    return {
      dialog: false,
      lesson: {
        title: ''
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
    },
    myupload (str) {
        console.log('createcourse: ' + JSON.stringify(str))
        this.dialog = false
        let data = {
          title: this.lesson.title,
          files: str.files,
          data: str.data
        }
        this.$emit('mylesson', data)
        // this.content.title = ''
        // this.content.description = ''
    },
    fromIsValid () {
      return this.lesson.title !== ''
    }
  }
}
</script>
