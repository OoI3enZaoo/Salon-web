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
                <base64-upload class="user" style="width: 300px;"
                  imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                  @change="onChangeImage"></base64-upload>
              </div>
              <br>
              <div class="text-xs-left">
                <v-btn :disabled="!fromIsValid" @click.native="AddLesson" color="primary">สร้างบทเรียน</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>

import axios from 'axios'
import Vue from 'vue'
import Base64Upload from 'vue-base64-upload'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  components: {
    Base64Upload
  },
  data() {
    return {
      dialog: false,
      lesson: {
        title: '',
        cover: '',
        tstamp: ''
      }
    }
  },
  methods: {
    onChangeImage(file) {
      this.lesson.cover = 'data:image/jpeg;base64,'+ file.base64
    },
    AddLesson () {
      this.dialog = false
      this.lesson.course_id = this.$route.params.course_id
      this.lesson.admin_id = this.$store.state.adminData.admin_id
      this.lesson.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      this.$store.dispatch('InsertLesson', this.lesson)
      // this.lesson.title = ''
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
      return this.lesson.title !== '' && this.lesson.cover !== ''
    }
  }
}
</script>
