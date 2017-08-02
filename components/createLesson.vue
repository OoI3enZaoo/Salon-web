<template>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">

      


      <form @submit.prevent="Add">
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
              <h3 class ="headline">ฟอร์มเพิ่มรายการบทความ</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field  label="กรอกชื่อคอร์สที่ต้องการ" hint ="กรอกเป็นภาษาใดก็ได้"  required></v-text-field>
              <v-text-field  type = "number" label="กรอกราคา"  hint="ไม่ควรเกิน 10000 บาท"  required></v-text-field>
              <v-text-field label="รายละเอียดแบบย่อ"  hint="รายละเอียดสั้นๆ"  required></v-text-field>

              <!-- <div class = "text-xs-center text-sm-center">
                  <base64-upload class="user" style="width: 300px;"
                    imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                    @change="onChangeImage"></base64-upload>
                </div> -->



            <!-- <quil v-model="course.description"></quil> -->


            <br><br><br><br>

            <!-- <v-btn primary type ="submit" :disabled="!fromIsValid" >สร้างคอร์สใหม่</v-btn> -->
            </v-card-text>


      <!-- <ul>
        <li v-for ="item in adminRef">
          <v-btn error @click.native="removeItem(item)">ลบ</v-btn>
           Title > {{item.title }} <br>
           price > {{item.price }}<br>
           snippet > {{item.snippet }}<br>
           description > <span v-html="item.description"></span><br>
           cover > <div v-if="item.imageCover">
             <img :src ="item.imageCover" width="500" height="330">
           </div>
         </li>
      </ul> -->

          </v-card>
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </form>
    </v-dialog>
  </v-layout>

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
import {mapActions} from 'vuex'
export default {
  props: ['value'],
  components: {
   Base64Upload,quil
  },
  data() {
    return {
dialog : false
    }
  },
  methods :{
    addLesson(){
      console.log("this.value: " + value);
    }
 },
 computed :{
  //  fromIsValid(){
  //    return this.course.name !== ''
  //    && this.course.price !== ''
  //    && this.course.snippet !== ''
  //    && this.course.description !== ''
  //    && this.course.cover !== ''
   //
  //  }
 }

}
</script>
