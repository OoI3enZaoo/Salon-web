<template>
    <v-dialog app v-model="dialog" fullscreen transition="dialog-bottom-transition" overlay=false>
      <v-btn class="primary white--text" large slot="activator">เพิ่มรูปภาพ</v-btn>
      <v-card>
        <v-toolbar dark class="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>เพิ่มรูปภาพของบทเรียน</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-card>
            <v-card-title>
              <h3 class ="headline">ฟอร์มเพิ่มรูปภาพของบทเรียน</h3>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="data.title" label="ชื่อรูปภาพ"></v-text-field><br>
                <base64-upload class="user" style="width: 300px;"
                  imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                  @change="onChangeImage"></base64-upload>
                  <div class="text-xs-left">
                    <v-btn :disabled="!fromIsValid" @click.native="AddPicture()" color="primary">เพิ่มภาพใหม่</v-btn>
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
      data: {
        title: '',
        picture: 'https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg'
      }
    }
  },
  methods: {
    onChangeImage(file) {
      this.data.picture = 'data:image/jpeg;base64,'+ file.base64
    },
    AddPicture () {
      console.log('AddPicture')
      this.$emit('pictureFromComponent', this.data)
      this.dialog = false
      this.data.title = ''
      this.data.picture = ''
    }
  },
  computed: {
    fromIsValid () {
      return this.data.title !== '' && this.data.picture !== 'https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg'
    }
  }
}
</script>
