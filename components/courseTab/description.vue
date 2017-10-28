<template>
  <div>
    <v-container grid-list-lg>
      <v-layout wrap row>
        <v-flex xs12>
            <v-card>
              <v-card-text>
                <v-layout>
                  <v-flex xs4 sm3 md2>
                    <v-avatar size="80px">
                      <img :src="course.avatar" alt="avatar" >
                    </v-avatar>
                  </v-flex>
                  <v-flex xs8>
                    <p class="headline">{{course.title}}</p>
                    <p>คอร์สโดย {{course.fname}} {{course.lname}}</p>
                    <template v-if="!isEdit">
                      <p>ราคาที่ขาย {{course.price}}</p>
                    </template>
                    <template v-else>
                      <v-text-field type="number" label="เปลี่ยนราคา" :value="data.price" v-model="data.price"></v-text-field>
                    </template>
                  </v-flex>
                  <v-flex text-xs-right>
                    <template v-if="!isEdit">
                      <v-btn icon dark color="primary" @click.native="isEdit = true"><v-icon>edit</v-icon></v-btn>
                    </template>
                    <template v-else>
                      <v-btn icon dark color="primary" @click.native="SaveData"><v-icon>save</v-icon></v-btn>
                      <v-btn icon dark color="primary" @click.native="isEdit = false"><v-icon>cancel</v-icon></v-btn>
                    </template>
                    <v-dialog v-model="dialog" persistent>
                      <v-btn icon dark color="error" slot="activator"><v-icon>delete</v-icon></v-btn>
                      <v-card>
                        <v-card-title class="headline">ลบคอร์ส</v-card-title>
                        <v-card-text>กรอกชื่อคอร์ส(<span style="background-color: #FFCDD2; border: 2px solid #FFCDD2; border-radius:5px; color:blue;">{{course.title}}</span>)ของคุณเพื่อเป็นการยืนยันการลบ
                          <v-text-field v-model="courseConfirm" hint="ชื่อคอร์ส"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn outline color="primary" @click.native="dialog = false">ยกเลิก</v-btn>
                          <v-btn color="error" :disabled="courseConfirm !== course.title" @click.native="remove">ลบ</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <hr>
                <br>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md6>
                    <div class="text-xs-center">
                      <p class="headline info--text">วีดีโอ</p>
                    </div>
                    <template v-if="!isEdit">
                      <!-- <iframe width="100%" height="500" :src="course.youtube"> </iframe> -->
                      <my-video ref="myvideo"  :videoname="course.video" :options="video.options" ></my-video>
                    </template>
                    <template v-else>
                      <!-- <iframe width="100%" height="500" :src="youtube"> </iframe> -->
                      <!-- <v-text-field label="ใส่ลิงค์ Youtube ที่นี่" :value="youtube" v-model="youtube"></v-text-field> -->
                    </template>
                  </v-flex>
                  <v-flex xs12 sm12 md6>
                    <div class="text-xs-center">
                      <p class="headline info--text">ภาพหน้าปก</p>
                    </div>
                      <template v-if="!isEdit">
                        <v-card-media :src="course.cover" height="300" class="mt-4"></v-card-media>
                      </template>
                      <template v-else>
                        <base64-upload class="user" style="height: 500px; background-size: cover;"
                          :imageSrc="data.cover"
                          @change="onChangeImage"></base64-upload>
                          <div class="text-xs-center">
                            <p class="info--warning" style="text-decoration:underline;">กดคลิ๊กที่ภาพเพื่อเปลี่ยนภาพหน้าปก</p>
                          </div>
                      </template>
                  </v-flex>
                </v-layout>

              </v-card-text>
              <v-card-text>
                <p class="headline info--text">เนื้อหารายละเอียด</p>
                <template v-if="!isEdit">
                  <p v-html="course.description"></p>
                </template>
                <template v-else>
                  <quill v-model="data.description"></quill>
                </template>
                <v-layout>
                  <v-flex text-xs-right>
                    <template v-if="!isEdit">
                      <v-btn dark color="primary" @click.native="isEdit = true">แก้ไข</v-btn>
                    </template>
                    <template v-else>
                      <v-btn dark color="primary" @click.native="SaveData">บันทึก</v-btn>
                      <v-btn dark color="primary" @click.native="isEdit = false">ยกเลิก</v-btn>
                    </template>
                </v-flex>
              </v-layout>
              </v-card-text>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import myVideo from '../myvideo.vue'
import quill from '../quill.vue'
import Base64Upload from 'vue-base64-upload'
export default {
  props: ['course'],
  components: {
    quill,
    Base64Upload,
    myVideo
  },
  created () {
    this.setData()
  },
  data () {
    return {
      isEdit: false,
      dialog: false,
      courseConfirm: '',
      data: {},
      video: {
        sources: [{
            src: 'http://172.104.189.169:4000/api/getfile/' + this.course.video,
            type: 'video/mp4'
        }],
        options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://gw2101.gtm.guildwars2.com/global/includes/images/video-poster.jpg'
        }
      }
      // youtube: ''
    }
  },
  methods: {
    setData () {
      this.data.title = this.course.title
      this.data.description = this.course.description
      this.data.cover = this.course.cover
      this.data.price = this.course.price
      // this.youtube = this.course.youtube
      console.log('this.data: ' + JSON.stringify(this.data))
    },
    onChangeImage(file) {
      this.data.cover = 'data:image/jpeg;base64,'+ file.base64;
    },
    SaveData () {
      // this.data.youtube = this.youtube
      this.data.course_id = this.$route.params.course_id
      this.$store.commit('UpdateCourse', this.data)
      this.$store.dispatch('UpdateCourse', this.data)
      this.isEdit = false
    },
    remove () {
      const data = {
        course_id: this.$route.params.course_id
      }
      this.$store.dispatch('DeleteCourse', data)
      this.$router.push('/manage')
    }
  }
}
</script>
