<template>
  <div>

    <v-container>
      <v-card>


  <div class="text-xs-center">
              <img :src="user[0].avatar" height="200" alt="รูป">
</div>

              <div class="text-xs-center">
            <br>
            <h5 style="display:inline"><b>{{ user[0].fname }} {{ user[0].lname }}</b></h5>
            <v-divider ></v-divider>
            <br>
            <table class="table">
              <tr>
                <th class="table-list"><h6>อายุ</h6></th>
                <th class="table-list"><h6>ที่อยู่</h6></th>
                <th class="table-list"><h6>อีเมล</h6></th>
                <th class="table-list"><h6>เบอร์โทรศัพท์</h6></th>
                <th class="table-list"><h6>เป็นสมาชิกเมื่อ</h6></th>
              </tr>
              <tr>
                <td class="table-list"><h6> {{user[0].birthday  }}</h6></td>
                <td class="table-list"><h6>{{ user[0].address}}</h6></td>
                <td class="table-list"><h6>{{ user[0].email}}</h6></td>
                <td class="table-list"><h6>{{ user[0].phone}}</h6></td>
                <td class="table-list"><h6>{{ user[0].tstamp}}</h6></td>
              </tr>
            </table><br><br>
              <v-layout row>
                <v-flex xs6 sm6>
                  <v-subheader><b>คอร์สที่ซื้อ</b></v-subheader>
                  <template v-for="data in userCourse">
                    <v-list-tile>
                        <v-list-tile-avatar>
                          <img :src="data.cover">
                        </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{data.title}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                          ซื้อมาเมื่อ {{data.tstamp | moment('from','now', true)}}ที่ผ่านมา
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                  </v-flex>
                  <v-flex xs6 sm6>
                    <v-subheader><b>รายชื่อคนที่ผู้ใช้แนะนำ</b></v-subheader>
                        <v-list>
                          <template v-for="data in userRecommened">
                            <v-list-tile @click="$router.push('/users/' + data.recommend_to)">
                              <v-list-tile-avatar>
                                <img :src="data.avatar" >
                              </v-list-tile-avatar>
                              <v-list-tile-title>
                                {{data.fname}} {{data.lname}}
                              </v-list-tile-title>
                            </v-list-tile>
                          </template>
                        </v-list>
                          </v-flex>
              </v-layout>
              </div>

          </v-flex>
      </v-card>



<!--
      <v-list three-line subheader>

        <v-container>
          <v-subheader>รายได้ของเดือน</v-subheader>
          <v-card >
            <div id="chartdiv"></div>

          </v-card>
        </v-container>
      </v-list> -->

      <v-divider></v-divider>
      <!-- <v-list three-line subheader>
        <v-container>
          <v-subheader>ราคาค่าบริการของร้าน</v-subheader>

          <v-layout row wrap>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            <br>
            </v-flex>

            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 sm2>
              <v-card class="text-xs-center">
              <v-card-text>
                <div class="text-xs-center">
                    <h5 style="display:inline;">ค่าทำผม</h5>
                </div>
                <div class="text-xs-center">
                    <h5 style="display:inline;"> <b>฿50</b></h5>
                </div>
              </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>


        </v-container>
      </v-list> -->


      <!-- <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>ตั้งค่า</v-subheader>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notifications</v-list-tile-title>
            <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sound</v-list-tile-title>
            <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Auto-add widgets</v-list-tile-title>
            <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list> -->

       </v-container>
  </div>
</template>
<script>
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  async asyncData ({store, route}) {
    await store.dispatch('getUserCourse', route.params.id)
    await store.dispatch('getUserRecommend', route.params.id)
  },
  created() {
    moment.lang('th-TH')
  },
  fetch({store}){
    store.commit('setPage',"นายนานา มานา (เจ้าของร้านทำผม)")
  },
   computed: {
     ...mapGetters(['getUserFromId', 'getUserCourseFromId', 'getUserRecommend']),
     user () {
       return this.getUserFromId(this.$route.params.id)
     },
     userCourse () {
       return this.getUserCourseFromId(this.$route.params.id)
     },
     userRecommened () {
       return this.getUserRecommend(this.$route.params.id)
     }
   }
}
</script>
<style>
#chartdiv {
width		: 100%; height		: 500px; font-size	: 11px;
}
.table {
  border: 1px solid black;
  border-collapse: collapse;
  margin-left: auto;
  margin-right:auto;
  width: 100%;
}
.table-list {
  padding: 16px;
    border: 1px solid black;
    border-collapse: collapse;
}
</style>
