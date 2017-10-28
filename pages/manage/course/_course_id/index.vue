<template>
  <div>

    <parallax :src="$store.state.background" height="200">
      <v-layout>
        <v-flex sm3 xs6>
            <img :src="course.cover" height="150">
        </v-flex>
        <v-flex sm9 xs6>
          <h4 class="white--text" ><v-btn dark icon nuxt to="/manage" slot="activator"><v-icon dark large>insert_invitation</v-icon></v-btn> / <b>{{course.title}} </b></h4>
          <h6 class="white--text">ผู้สร้าง {{course.fname}} {{course.lname}}</h6>
          <h6 class="white--text">สร้างเมื่อ: {{course.tstamp}}</h6>
          <h6 class="white--text">ราคา {{course.price}}</h6>
        </v-flex>
      </v-layout>
    </parallax>

    <v-tabs light>
      <hr>
     <v-tabs-bar class="white">
       <v-tabs-slider class="primary"></v-tabs-slider>
       <v-tabs-item
         v-for="(data,i) in menuItems"
         :key="i"
         :href="'#tab-' + i"
       >
         {{data.title}}
       </v-tabs-item>
     </v-tabs-bar>
     <hr>
       <!-- ภาพรวม -->
       <v-tabs-content id='tab-0'>
           <overall :course="course"></overall>
       </v-tabs-content>

       <!-- รายละเอียดเนื้อหา -->
       <v-tabs-content id='tab-1'>
         <description :course="course"></description>
       </v-tabs-content>

       <!-- บทเรียน -->
       <v-tabs-content id='tab-2'>
         <lesson :course="course"></lesson>
       </v-tabs-content>
   </v-tabs>
  </div>
</template>
<script>
import parallax from '../../../../components/parallax.vue'
import overall from '../../../../components/courseTab/overall.vue'
import description from '../../../../components/courseTab/description.vue'
import lesson from '../../../../components/courseTab/lesson.vue'
export default {
  async asyncData ({store, route}) {
    await store.dispatch('pullCourse', route.params.course_id)
    await store.dispatch('pullLesson', route.params.course_id)
    await store.dispatch('pullUserPurchase', route.params.course_id)
  },
  components: {
    parallax,
    overall,
    description,
    lesson
  },
  created () {
    console.log('params: ' + this.$route.params.course_id)
  },
  data () {
    return {
      menuItems: [
        { title: 'ภาพรวม' },
        { title: 'เนื้อหาคอร์ส' },
        { title: 'บทเรียน' }
      ]
    }
  },
  computed: {
    course () {
      return this.$store.getters.courseFromId(this.$route.params.course_id)[0]
    }
  }
}
</script>
