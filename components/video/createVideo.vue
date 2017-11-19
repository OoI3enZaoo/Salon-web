<template>
    <v-dialog app v-model="dialog" fullscreen transition="dialog-bottom-transition" overlay=false>
      <v-btn class="primary white--text" large slot="activator">เพิ่มวีดีโอ</v-btn>
      <v-card>
        {{lessonId}}
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
                <v-text-field v-model="video.title" label="ชื่อวีดีโอ"></v-text-field><br>
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
import MultipleFileUploader from './MultipleFileUploader.vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  props: ['lessonId'],
  components: {
    MultipleFileUploader
  },
  data() {
    return {
      dialog: false,
      video: {
        title: ''
      }
    }
  },
  methods: {
    myupload (str) {
        console.log('createcourse: ' + JSON.stringify(str))
        this.dialog = false
        let data = {
          lesson_id: this.lessonId,
          title: this.video.title,
          files: str.files,
          data: str.data
        }
        this.$emit('myvideo', data)
        this.video.title = ''
    },
    fromIsValid () {
      return this.video.title !== ''
    }
  }
}
</script>
