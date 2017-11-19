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
                    <v-list-tile-sub-title>{{data.tstamp | moment('from','now', true)}}</v-list-tile-sub-title>
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
              </div>
              <br>
              <v-list subheader>
                <v-subheader>วีดีโอ</v-subheader>
                <template v-for="vid in data.video">
                  <v-list-tile @click="" @click.native="openVideo(vid)">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{vid.title}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      {{vid.tstamp | moment('from','now',true)}}
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

    <v-dialog v-model="dialog2" width="1000px">
      <v-card>
           <my-video ref="myvideo"  :videoname="currentVideo.video" :options="video.options" ></my-video>
      </v-card>
    </v-dialog>

</v-flex>

</template>
<script>
import Vue from 'vue'
import myVideo from '../myvideo.vue'
import Base64Upload from 'vue-base64-upload'
import createVideo from '../video/createVideo.vue'
export default {
  props: ['data', 'number'],
  components: {
    Base64Upload,
    createVideo,
    myVideo
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      isEdit: false,
      edit: {
        title: '',
        cover: ''
      },
      currentVideo: '',
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
      this.dialog2 = true
      this.currentVideo = video
    },
    getvideo (str) {
      console.log('getDataLesson')
      let data = str
      data.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
      data.admin_id = this.$store.state.adminData.admin_id
      this.$store.dispatch('AddNewVideo', data)
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
    }
  }
}
</script>
