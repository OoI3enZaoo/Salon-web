<template>
         <v-flex xs12 sm12 md6>
          <v-card v-if="data.video !== null">
            <v-card-text>
              <v-list>
                <v-subheader>อันดับที่ {{number}}</v-subheader>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img :src="data.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="data.fname + ' ' + data.lname"> </v-list-tile-title>
                    <v-list-tile-sub-title>{{data.tstamp | moment('from','now', true)}}ที่ผ่านมา</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      <template v-if="!isEdit">
                        <v-tooltip top>
                          <v-btn icon primary @click.native="Edit" slot="activator"><v-icon dark>edit</v-icon></v-btn>
                          <span>แก้ไข</span>
                        </v-tooltip>
                      </template>
                      <template v-else>
                        <v-tooltip top>
                          <v-btn style="margin-right:20px;"icon primary @click.native="Save" slot="activator"><v-icon dark>save</v-icon></v-btn>
                          <span>บันทึก</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <v-btn icon primary @click.native="Close" slot="activator"><v-icon dark>close</v-icon></v-btn>
                          <span>ปิด</span>
                        </v-tooltip>
                      </template>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <v-dialog v-model="dialog" persistent>
                        <v-btn icon error slot="activator" ><v-icon dark>delete</v-icon></v-btn>
                        <v-card>
                          <v-card-title class="headline">การลบบทเรียน</v-card-title>
                          <v-card-text>คุณแน่ใจใช่ไหมว่าจะลบบทเรียนนี้ออกจากระบบ</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click.native="dialog = false">เฮ้ย อย่าเพึง</v-btn>
                            <v-btn error flat @click.native="Delete">ลบเลย</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-title>
                <template v-if="!isEdit">
                  <h6>{{data.title}}</h6>
                </template>
                <template v-else>
                  <v-text-field :value="data.title" v-model="data.title" label="หัวข้อ"></v-text-field>
                </template>
              </v-card-title>
              <template v-if="!isEdit">
                  <v-card-media :src="data.cover" height="200px"></v-card-media>
              </template>
              <template v-else>
                <base64-upload class="user" style="width: 300px;"
                  :imageSrc="data.cover"
                  @change="onChangeImage"></base64-upload>
              </template>
              <div class="text-xs-right">
                <createVideo @myvideo="getvideo" :lessonId = "data.lesson_id"></createVideo>
                <createPicture @pictureFromComponent="getpicture"></createPicture>
              </div>
              <br>
              <v-list subheader>
                <template v-for="(vid, i) in data.video">
                  <v-subheader v-if="i === 0">วีดีโอ</v-subheader>
                  <v-list-tile @click="" @click="openVideo(vid)">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{vid.title}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      {{vid.tstamp | moment('from','now',true)}}ที่ผ่านมา
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>
                </template>
                  <template v-for="(pic, i) in data.picture">
                <v-subheader v-if="i === 0">ภาพ</v-subheader>
                  <v-list-tile @click="" @click="openPicture(pic)">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{pic.title}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      {{pic.tstamp | moment('from','now',true)}}ที่ผ่านมา
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider></v-divider>
                </template>

              </v-list>
            </v-card-text>
          </v-card>
          <v-card v-else height="743px">
            <v-card-text>
              <div class="text-xs-center" style="margin-top:300px;">
                <v-layout row wrap>
                  <v-flex xs5 md3 offset-xs1 offset-xs2>
                      <img :src="workIcon" height="100px">
                  </v-flex>
                  <v-flex xs5>
                    <h6>ระบบกำลังทำการสร้าง...</h6>
                    <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
                  </v-flex>
                </v-layout>
              </div>
            </v-card-text>
          </v-card>

    <v-dialog v-model="videoDialog" width="65%" height="100%">
        <v-card>
           <my-video ref="myvideo"  :videoname="dataSelected.video" :options="video.options" ></my-video>
             <v-container>
                 <v-btn color="error" class="white--text" @click.naitve="removeVideo(dataSelected.lesson_id, dataSelected.video_id)">ลบวีดีโอนี้</v-btn>
             </v-container>
        </v-card>
    </v-dialog>
    <v-dialog v-model="pictureDialog" width="65%" height="100%">
        <v-card>
          <div class="text-xs-center">
            <img :src="dataSelected.picture" height="300px;">
          </div>
             <v-container>
                 <v-btn color="error" class="white--text" @click.naitve="removePicture(dataSelected.lesson_id, dataSelected.picture_id)">ลบภาพนี้</v-btn>
             </v-container>
        </v-card>
    </v-dialog>


</v-flex>

</template>
<script>
import Vue from 'vue'
import myVideo from '../myvideo.vue'
import Base64Upload from 'vue-base64-upload'
import createVideo from '../video/createVideo.vue'
import createPicture from './addon/createPicture.vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  created () {
    moment.lang('th-TH')
  },
  props: ['data', 'number'],
  components: {
    Base64Upload,
    createVideo,
    myVideo,
    createPicture
  },
  data () {
    return {
      dialog: false,
      videoDialog: false,
      pictureDialog: false,
      isEdit: false,
      edit: {
        title: '',
        cover: ''
      },
      dataSelected: '',
      workIcon: require('../../static/work.png'),
      video: {
        options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://gw2101.gtm.guildwars2.com/global/includes/images/video-poster.jpg'
        }
      },
    }
  },
  methods: {
    openVideo (video) {
      this.videoDialog = true
      this.dataSelected = video
    },
    openPicture (picture) {
      this.pictureDialog = true
      this.dataSelected = picture
    },
    getvideo (str) {
      console.log('getDataLesson')
      let data = str
      data.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      data.admin_id = this.$store.state.adminData.admin_id
      this.$store.dispatch('AddNewVideo', data)
    },
    getpicture (str) {
      console.log('getpicture', str)
      const data = {
        lesson_id: this.data.lesson_id,
        title: str.title,
        picture: str.picture,
        tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      }
      this.$store.dispatch('AddPicture', data)
    },
    onChangeImage(file) {
      this.edit.cover = 'data:image/jpeg;base64,'+ file.base64
    },
    Edit () {
      this.isEdit = true
    },
    Save () {
      this.isEdit = false
    },
    Close () {
      this.isEdit = false
    },
    Delete () {
      this.$store.dispatch('deleteLesson', {lesson_id: this.data.lesson_id})
      this.dialog = false
    },
    myupload (str) {
      console.log('myupload: ' + JSON.stringify(str))
      this.isEdit = false
      if (str.files.length == 0) {
        let data = {
          title: this.data.title,
          lesson_id: this.data.lesson_id
        }
        this.$store.dispatch('editTitleLesson', data)
      } else {
        let data = {
          title: this.data.title,
          files: str.files,
          data: str.data,
          lesson_id: this.data.lesson_id
        }
        this.$store.dispatch('editLesson', data)
      }

    },
    checkbug () {
      console.log(this.$refs.upload)
    },
    removeVideo (lid, vid) {
        const data = {
          lesson_id: lid,
          video_id: vid
        }
      this.$store.dispatch('removeVideoLesson', data)
    }
  }
}
</script>
