<template>
  <div>
    <v-flex xs12>
      <v-expansion-panel   class="elevation-4"  @click.native="checkbug">
            <v-expansion-panel-content>
                <div slot="header">
                <v-container>
                    <v-layout>
                      <v-flex xs10>
                        <template v-if="!isEdit">
                          <span class="grey--text">{{data.title}}</span><br>
                        </template>
                        <template v-else>
                          <v-text-field :value="data.title" v-model="data.title" label="หัวข้อ"></v-text-field>
                        </template>
                      </v-flex>
                      <v-flex xs2 text-xs-right>
                        <span class="grey--text">{{data.tstamp}}</span>
                      </v-flex>
                    </v-layout>
                </v-container>
              </div>
              <v-card>
                <v-card-text>
                  <v-layout>
                    <v-flex text-xs-left>
                      <div class="mt-3"><v-icon>fa-link</v-icon>&nbsp;&nbsp;<a  @click="openFile(data.video)"><span class="blue--text"  style="cursor:pointer;">ดาวน์โหลดวีดีโอ {{data.video}}</span></a></div>
                    </v-flex>
                    <v-flex text-xs-right>
                      <template v-if="!isEdit">
                          <v-btn primary @click.native="Edit"><v-icon dark>edit</v-icon>&nbsp;แก้ไข</v-btn>
                      </template>
                      <template v-else>
                        <v-btn primary @click.native="Close"><v-icon dark>close</v-icon>&nbsp;ปิด</v-btn>
                      </template>
                      <v-dialog v-model="dialog" persistent>
                        <v-btn error slot="activator" ><v-icon dark>delete</v-icon>&nbsp;ลบ</v-btn>
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

                    </v-flex>
                  </v-layout>
                  <template v-if="!isEdit">
                      <my-video ref="myvideo"  :videoname="data.video" :options="video.options" :lessonId = "data.lesson_id" ></my-video>

                  </template>
                  <template v-else>
                      <MultipleFileUploader ref="upload" @myupload="myupload"  successMessagePath="" errorMessagePath=""></MultipleFileUploader>
                  </template>
                </v-card-text>
              </v-card>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </div>
</template>
<script>
import myVideo from '../myvideo.vue'
import VueDPlayer from 'vue-dplayer'
import MultipleFileUploader from './MultipleFileUploader.vue'
export default {
  props: ['data'],
  components: {
    myVideo,
    MultipleFileUploader,
    'd-player': VueDPlayer
  },
  data () {
    return {
      dialog: false,
      video: {
        sources: [{
            src: 'http://localhost:4000/api/getfile/' + this.data.video,
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
      this.isEdit = false
      let data = {
        title: this.data.title,
        files: str.files,
        data: str.data,
        lesson_id: this.data.lesson_id
      }
      this.$store.dispatch('editLesson', data)
    },
    checkbug () {
      console.log(this.$refs.upload)
    }
  }
}
</script>
