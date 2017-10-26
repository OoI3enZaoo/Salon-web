<template>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" overlay=false>
      <v-btn class="primary white--text" large slot="activator" > สร้างคอร์สใหม่ </v-btn>
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
              <h3 class ="headline">ฟอร์มรายการสร้างคอร์ส</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field  label="กรอกชื่อคอร์สที่ต้องการ" hint ="กรอกเป็นภาษาใดก็ได้" v-model = "course.title" required></v-text-field>
              <v-text-field  type = "number" label="กรอกราคา"  hint="ไม่ควรเกิน 10000 บาท" v-model = "course.price" required></v-text-field>
              <!-- <v-text-field label="รายละเอียดแบบย่อ"  hint="รายละเอียดสั้นๆ" v-model ="course.snippet" required></v-text-field> -->
              <v-text-field label="ลิงค์ยูทูป"  hint="รายละเอียดสั้นๆ" v-model ="course.youtube" required></v-text-field>
              <div class = "text-xs-center text-sm-center">
                  <base64-upload class="user" style="width: 300px;"
                    imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                    @change="onChangeImage"></base64-upload>
                </div>

            <quil v-model="course.description"></quil>
            <br><br><br><br>
            <v-btn primary @click.native="Add" :disabled="!fromIsValid" >สร้างคอร์สใหม่</v-btn>
            </v-card-text>

          </v-card>
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>

  <!-- <div class="quill-editor"
       v-model="mycont"
       v-quill:myQuillEditor="editorOption">
  </div> -->


</template>
<script>
// import VueCoreImageUpload from 'vue-core-image-upload'
// import {db} from '../util/firebase'

 import quil from './quill.vue'

import Base64Upload from 'vue-base64-upload'
import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  props:['value'],
  components: {
   Base64Upload,quil
 },
  mounted() {
    //do something after creating vue instance
    console.log("showValue: " + this.showValue);
  },
  data() {
    return {
      mycont : '',
      dialog: false,
      course : {
        course_id: '',
        admin_id: '',
        title : '',
        price : '',
        description : '',
        cover : '',
        youtube: '',
        ts: ''
      },
      cover: 'https://static.esea.net/global/images/users/675235.1476314733.jpg'
    }
  },
  methods :{
    Add () {
      this.course.youtube = this.course.youtube.replace('watch?v=','embed/')
      this.course.ts = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      this.course.course_id = (new Date().getTime())
      this.course.admin_id = this.$store.state.adminData.admin_id
      this.$store.dispatch('InsertCourse', this.course)
      this.course.fname = this.$store.state.adminData.fname
      this.course.lname = this.$store.state.adminData.lname
      this.course.avatar = this.$store.state.adminData.avatar
      console.log(this.course)
      this.$store.commit('addCourse', [this.course])
      this.$socket.emit('course', this.course)
      // this.dialog = false
      // this.$store.commit('addCourseList',this.course.name)
      // adminRef.push(this.course)
      this.dialog = false
    },
   onChangeImage(file) {
     console.log("fiel.base64: " + file.base64);
     this.course.cover = 'data:image/jpeg;base64,'+file.base64
   }
 },
 computed :{
   fromIsValid(){
     return this.course.title !== ''
     && this.course.price !== ''
     && this.course.description !== ''
     && this.course.cover !== ''
     && this.course.yotube !== ''
   },
   showValue(){
     return this.value
   }
 }

}
</script>
