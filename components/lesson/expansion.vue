<template>

    <v-flex xs6>
      <v-card>
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
          <div class="ml-3"><v-icon primary>fa-link</v-icon>&nbsp;&nbsp;<a  @click="openFile(data.video)"><span class="blue--text"  style="cursor:pointer;">ดาวน์โหลดวีดีโอ {{data.video}}</span></a></div>
          <template v-if="!isEdit">
              <my-video ref="myvideo"  :videoname="data.video" :options="video.options" ></my-video>
          </template>
          <template v-else>
              <MultipleFileUploader ref="upload" @myupload="myupload"  successMessagePath="" errorMessagePath=""></MultipleFileUploader>
          </template>
          <div class="ml-3">
            <v-icon>remove_red_eye</v-icon> {{data.view}} &nbsp;&nbsp;&nbsp; <v-icon>favorite</v-icon> {{data.love}}
          </div>
        </v-card-text>
      </v-card>
    </v-flex>

</template>
<script>
import myVideo from '../myvideo.vue'
import MultipleFileUploader from './MultipleFileUploader.vue'
import Vue from 'vue'
export default {
  props: ['data', 'number'],
  components: {
    myVideo,
    MultipleFileUploader
  },
  data () {
    return {
      dialog: false,
      video: {
        sources: [{
            src: 'http://172.104.189.169:4000/api/getfile/' + this.data.video,
            type: 'video/mp4'
        }],
        options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://gw2101.gtm.guildwars2.com/global/includes/images/video-poster.jpg'
        }
      },
      isEdit: false,
      edit: {
        title: ''
      }
    }
  },
  computed: {
    videoo () {
      return this.data.video
    }
  },
  watch: {
    videoo: function (val) {
        console.log('not null');
        this.video.sources[0].src = 'http://localhost:4000/api/getfile/' + this.data.video
        console.log('video: '+   this.video.sources[0].src)

    }
  },
  methods: {
    openFile (name) {
      console.log(' filename: ' + name + ' contentId: ' + this.contentId)
      let url = 'http://localhost:4000/api/getfile/' + name
      window.open(url, '_blank');
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
