<template>
  <div>
    <parallax :src="$store.state.background" height="200">
      <v-layout>
        <v-flex sm3 xs6>
            <img :src="course.cover" height="150">
        </v-flex>
        <v-flex sm9 xs6>
          <h4 class="white--text" ><v-btn dark icon nuxt to="/manage"><v-icon dark large>insert_invitation</v-icon></v-btn> / <nuxt-link tag="span" :to="'/manage/course/' + course.course_id" style="cursor:pointer;"><b>{{course.title}} </b></nuxt-link> / <b>{{lesson.title}}</b></h4>
          <h6 class="white--text">ผู้สร้าง {{course.fname}} {{course.lname}}</h6>
          <h6 class="white--text">สร้างเมื่อ: {{course.ts}}</h6>
          <h6 class="white--text">ราคา {{course.price}}</h6>
        </v-flex>
      </v-layout>
    </parallax>
<br>
<template v-for="a in 5">
  <expansion :data="a"></expansion>
</template>
  <!-- <v-container grid-list-lg>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout>
              <v-flex xs2>
                <v-avatar size="80px">
                  <img :src="lesson.avatar" alt="avatar" >
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <template v-if="!isEdit">
                  <p class="headline">{{lesson.title}}</p>
                </template>
                <template v-else>
                  <v-text-field solo v-model="edit.title"></v-text-field>
                </template>
                <span>บทความโดย {{lesson.fname}} {{lesson.lname}}</span>
              </v-flex>
              <v-flex text-xs-right>
                <template v-if="!isEdit">
                  <v-btn icon dark color="primary" @click.naitve="isEdit = true"><v-icon>edit</v-icon></v-btn>
                </template>
                <template v-else>
                  <v-btn icon dark color="primary" @click.native="SaveData()"><v-icon>save</v-icon></v-btn>
                  <v-btn icon dark color="primary" @click.native="RestoreData()"><v-icon>cancel</v-icon></v-btn>
                </template>
                <v-btn icon dark color="error" @click.native="dialog=true"><v-icon>delete</v-icon></v-btn><br>
                <span>ดูแล้ว {{lesson.view}} คน</span><br>
                <span>ชอบ {{lesson.love}} คน</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <template v-if="!isEdit">
            <v-card-media :src="lesson.cover" height="200px"> </v-card-media>
          </template>
          <template v-else>
            <base64-upload style="height: 400px; background-size: cover;"
              :imageSrc="edit.cover"
              @change="onChangeImage"></base64-upload>
          </template>
          <v-card-text>
            <p class="headline info--text">เนื้อหารายละเอียด</p>
            <template v-if="!isEdit">
              <p v-html="lesson.description"></p>
            </template>
            <template v-else>
              <quill v-model="edit.description"></quill>
            </template>
            <v-layout><v-flex text-xs-right>

              <template v-if="!isEdit">
                <v-btn dark color="primary" @click.naitve="isEdit = true">แก้ไข</v-btn>
              </template>
              <template v-else>
                <v-btn dark color="primary" @click.native="SaveData()">บันทึก</v-btn>
                <v-btn dark color="primary" @click.native="RestoreData()">ยกเลิก</v-btn>
              </template>
              <v-btn dark color="error" @click.native="dialog=true">ลบ</v-btn>
            </v-flex></v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">การลบบทความ</v-card-title>
        <v-card-text>คุณแน่ใจใช่ไหมว่าจะลบบทความ {{lesson.title}} ออก</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" @click.native="DeleteData()">ลบบทความ</v-btn>
          <v-btn color="primary darken-1" outline @click.native="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container> -->
  </div>
</template>
<script>
import parallax from '../../../../../components/parallax.vue'
import mycourse from '../index.vue'
import Base64Upload from 'vue-base64-upload'
import quill from '../../../../../components/quill.vue'
import expansion from '../../../../../components/lesson/expansion.vue'
export default {
  async asyncData ({store, route}) {
    await store.dispatch('pullCourse', route.params.course_id)
    await store.dispatch('pullLesson', route.params.course_id)
  },
  created () {
    //do something after creating vue instance
    this.SetData()
  },
  components: {
    parallax,
    Base64Upload,
    quill,
    expansion
  },
  data () {
    return {
      isEdit: false,
      dialog: false,
      edit: {
        title: '',
        description: '',
        cover: ''
      }
    }
  },
  methods: {
    SetData() {
      this.edit.title = this.lesson.title
      this.edit.description = this.lesson.description
      this.edit.cover = this.lesson.cover
    },
    RestoreData () {
      this.SetData()
      this.isEdit = false
    },
    Edit () {
      this.isEdit = true
    },
    onChangeImage(file) {
      this.edit.cover = 'data:image/jpeg;base64,'+file.base64;
    },
    SaveData () {
      if (this.lesson.title != this.edit.title || this.lesson.description != this.edit.description || this.lesson.cover != this.edit.cover) {
        this.edit.lesson_id = this.$route.params.lesson_id
        this.$store.dispatch('UpdateLesson', this.edit)
        this.$store.commit('UpdateLesson', this.edit)
      }
      this.isEdit = false
      this.dialog = false
    },
    DeleteData () {
      this.$router.push('/manage/course/' + this.$route.params.course_id)
      this.$store.dispatch('DeleteLesson', this.$route.params.lesson_id)
      this.$store.commit('DeleteLesson', this.$route.params.lesson_id)
    }
  },
  computed: {
    course () {
      return this.$store.getters.courseFromId(this.$route.params.course_id)[0]
    },
    lesson () {
      return this.$store.getters.lessonFromId(this.$route.params.lesson_id)[0]
    }
  }
}
</script>
