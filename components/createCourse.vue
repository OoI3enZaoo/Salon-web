<template>

  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>

      <v-btn fab icon class="pink white--text" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
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
              <span class="headline">ฟอร์มรายการสร้างคอร์ส</span>
            </v-card-title>
            <v-card-text>
              <v-text-field  label="กรอกชื่อคอร์สที่ต้องการ" hint ="กรอกเป็นภาษาใดก็ได้" v-model = "course.title" required></v-text-field>
              <v-text-field  label="กรอกราคา"  hint="ไม่ควรเกิน 10000 บาท" v-model = "course.price"></v-text-field>
              <v-text-field label="รายละเอียดแบบย่อ"  hint="รายละเอียดสั้นๆ" v-model ="course.snippet"></v-text-field>
                <div class="text-xs-center">
                    <img :src="cover"><br>
                    <v-btn primary>
                    <!-- <VueCoreImageUpload
                      text="คลิ๊กที่นี่เพื่ออัพรูปหน้าปกของคอร์ส"
                      :crop="false"
                      @imageuploaded="imageuploaded"
                      :data="cover"
                      :max-file-size="5242880"
                      url="http://101.198.151.190/api/upload.php"
                       >
                    </VueCoreImageUpload> -->
                    </v-btn>
                    <br>
                    <br>
                </div>

              <div class="quill-editor"
                 v-model="content"
                 v-quill:myQuillEditor="editorOption">
            </div>
            <br><br><br><br>

    <v-btn primary @click.native="addCourse">สร้างคอร์สใหม่</v-btn>
            </v-card-text>


      <ul>
        <li v-for ="item in adminRef">
          <v-btn error @click.native="removeItem(item)">ลบ</v-btn>
           Title > {{item.title }} <br>
           price > {{item.price }}<br>
           snippet > {{item.snippet }}<br>
           description > <span v-html="item.description"></span><br>
         </li>
      </ul>

          </v-card>
        </v-container>
        <v-divider></v-divider>

      </v-card>
    </v-dialog>
  </v-layout>

  <!-- <div class="quill-editor"
       v-model="content"
       v-quill:myQuillEditor="editorOption">
  </div> -->


</template>
<script>
// import VueCoreImageUpload from 'vue-core-image-upload'
import { quillEditor } from 'vue-quill-editor'
import { ImageImport } from '../modules/ImageImport.js'
 import { ImageResize } from '../modules/ImageResize.js'
 Quill.register('modules/imageImport', ImageImport)
 Quill.register('modules/im ageResize', ImageResize)

import {db} from '../util/firebase'
let adminRef = db.ref('bar')

export default {
  firebase :{
    adminRef
  },
  components: {
    quillEditor
  },



  data() {
    return {
      dialog: false,
      content : '',
      course : {
        title : '',
        price : '',
        snippet :'',
        description : ''
      },
        cover: 'https://static.esea.net/global/images/users/675235.1476314733.jpg',
      editorOption: {

          placeholder: "กรอกรายละเอียดของคอร์สที่นี่",
          modules: {

            imageImport: true,
            imageResize: {
              displaySize: true
            }
          }
        }
    }
  },
  methods :{
    addCourse(){
      this.course.description = this.content;
        adminRef.push(this.course)
    },
    removeItem(item){
      adminRef.child(item['.key']).remove()
    },
    imageuploaded(res) {
     if (res.errcode == 0) {
       this.src = res.data.src;
     }
   }
  }

}
</script>
<style lang="scss">

  .quill-editor {
  height: 900px;
    min-height: 20em;
   padding-bottom: 1em;
   max-height: 25em;
  }
</style>
