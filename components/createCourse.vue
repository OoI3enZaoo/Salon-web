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
              <h3 class ="headline">ฟอร์มรายการสร้างคอร์ส</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field  label="กรอกชื่อคอร์สที่ต้องการ" hint ="กรอกเป็นภาษาใดก็ได้" v-model = "course.title" required></v-text-field>
              <v-text-field  type = "number" label="กรอกราคา"  hint="ไม่ควรเกิน 10000 บาท" v-model = "course.price"></v-text-field>
              <v-text-field label="รายละเอียดแบบย่อ"  hint="รายละเอียดสั้นๆ" v-model ="course.snippet"></v-text-field>

              <div class = "text-xs-center text-sm-center">
                  <base64-upload class="user" style="width: 300px;"
                    imageSrc="https://t3.ftcdn.net/jpg/00/80/37/56/240_F_80375661_O3L2isjdQdnloGOANUFe5NB99nMQMpra.jpg"
                    @change="onChangeImage"></base64-upload>
                </div>


              <div class="quill-editor"
                 v-model="course.description"
                 v-quill:myQuillEditor="editorOption">
            </div>

              <h3 v-text="course.description"></h3>
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
           cover > <div v-if="item.imageCover">
             <img :src ="item.imageCover" width="500" height="330">
           </div>
         </li>
      </ul>

          </v-card>
        </v-container>
        <v-divider></v-divider>


      </v-card>
    </v-dialog>
  </v-layout>

  <!-- <div class="quill-editor"
       v-model="mycont"
       v-quill:myQuillEditor="editorOption">
  </div> -->


</template>
<script>
// import VueCoreImageUpload from 'vue-core-image-upload'
import {db} from '../util/firebase'
import { quillEditor } from 'vue-quill-editor'
import { ImageImport } from '../modules/ImageImport.js'
 import { ImageResize } from '../modules/ImageResize.js'
 Quill.register('modules/imageImport', ImageImport)
 Quill.register('modules/imageResize', ImageResize)
import Base64Upload from 'vue-base64-upload'


let adminRef = db.ref('bar')

export default {
  firebase :{
    adminRef
  },
  components: {
    quillEditor, Base64Upload
  },


  data() {
    return {
      mycont : '',
      dialog: false,
      course : {
        title : '',
        price : '',
        snippet :'',
        description : '',
        imageCover : ''
      },

        cover: 'https://static.esea.net/global/images/users/675235.1476314733.jpg',
        editorOption: {
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

        adminRef.push(this.course)
    },
    removeItem(item){
      adminRef.child(item['.key']).remove()
    },
    imageuploaded(res) {
     if (res.errcode == 0) {
       this.src = res.data.src;
     }
   },
   onChangeImage(file) {
     console.log("fiel.base64: " + file.base64);
     this.course.imageCover = 'data:image/jpeg;base64,'+file.base64
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
  .user {

  max-width: 100%;
  max-height: 100%;
}
</style>
