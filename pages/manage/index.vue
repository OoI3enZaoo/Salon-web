<template>
<div>

  <v-container grid-list-lg>
      <v-layout>
        <v-flex xs7>
            <v-text-field v-model= "searchModel" solo label="ค้นหาคอร์ส"></v-text-field>
        </v-flex>
        <v-flex text-xs-right>
          <createCourse></createCourse>
        </v-flex>
      </v-layout>
    <br>
    <v-layout row wrap>
      <template v-for="data in afterSearch">
         <v-flex xs12 lg6>
           <nuxt-link :to="'/manage/course/' + data.course_id" tag="span" style="cursor:pointer;">
              <v-card>
                <v-layout row wrap>
                  <v-flex lg4 xs12>
                    <v-card-media :src="data.cover" height="200"></v-card-media>
                  </v-flex>
                  <v-flex lg5 xs12>
                    <v-card-text>
                      <p class="headline">{{data.title}}</p>
                      <p class="grey--text">{{data.fname}} {{data.lname}}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex lg3 xs12 text-xs-right>
                    <v-card-text>
                      <span class="grey--text">{{data.ts}}</span><br>
                          <div class="mt-5">
                              <h6><b>ราคา: {{data.price}}</b></h6>
                          </div>
                      </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
              <br>
            </nuxt-link>
         </v-flex>
      </template>
    </v-layout>
    <!-- <loadData></loadData> -->
  </v-container>
</div>
</template>
<script>
import axios from 'axios'
import createCourse from '../../components/createCourse.vue'
export default {
  async asyncData ({store}) {
    await store.dispatch('pullCourse')
  },
  created () {
    this.afterSearch = this.course
  },
  components: {
    createCourse
  },
  fetch({store}) {
    store.commit('setPage', "การจัดการ")
  },
  data() {
    return {
      searchModel: '',
      afterSearch: ''
    }
  },
  watch: {
    searchModel: function (val) {
      this.getAnswer(val)
    },
    course: function (val) {
      if (this.afterSearch == '') {
        this.afterSearch = this.course
      }
    }
  },
  methods: {
    getAnswer (val) {
      let vmData = []
      if (val == '') {
        this.afterSearch = this.course
      } else {
        this.course.map(res => {
          console.log(res)
          let title = res.title.search(val)
          if (title != -1) {
            vmData.push(res)
          }
        })
        this.afterSearch = vmData
      }
    }
  },
  computed: {
    course () {
      return this.$store.state.course
    }
  }
}
</script>
