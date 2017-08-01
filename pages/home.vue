<template>
<div>

  <v-container fluid>
    <v-layout row wrap>
        </v-card>
      <v-flex xs6 sm3>
        <v-card class="light-green white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>200</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนนี้</p>
            </div>
          </v-card-text>
        </v-card>
        <br>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="deep-orange white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>1520</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้อาทิตย์ที่ผ่านมา</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="amber white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>6430</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนที่ผ่านมา</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="purple white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>43355</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้รวมทั้งหมด</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-text>
            <lineGraph></lineGraph>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs12 sm12 md5>
        <v-card>
          <v-card-title>
            <pieChart></pieChart>
          </v-card-title>
        </v-card>
        <br>
      </v-flex>
      <v-flex xs12 sm12 md7>

        <v-card>
          <v-list subheader>
            <v-subheader>คอร์สที่ถูกซื้อล่าสุด</v-subheader>
            <v-list-tile avatar v-for="item in items" v-bind:key="item.title">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title><span class='grey--text text--darken-2'>ซื้อคอร์สเจ้าของร้าน เมื่อ 22 นาทีที่ผ่านมา</span></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout row>
                  <v-flex xs6>
                    <v-btn icon v-tooltip:top="{html : 'สนทนา'}">
                    <v-icon>chat_bubble</v-icon>
                  </v-btn>
                  </v-flex>
                  <v-flex xs6>

                  <nuxt-link :to="'/USERS/5'" tag="span" style="cursor:pointer" v-tooltip:top="{html : 'รายละเอียด'}"><v-icon>info</v-icon></nuxt-link>


                  </v-flex>
                </v-layout>


              </v-list-tile-action>
            </v-list-tile>
          </v-list>

        </v-card>

      </v-flex>


    </v-layout>


  </v-container>
</div>
</template>
<script>


import pieChart from '../components/chart/pieChart.vue'
import lineGraph from '../components/chart/lineGraph.vue'
import mem from '../components/mem.vue'
export default {
  //middleware: 'authenticated',
  fetch ({store}) {
   store.commit('setPage', "แผงควบคุม")
 },
 methods: {
   meta () {
       return {
         title: 'Vuetify',
         description: 'A Vue JS Framework',
         keywords: 'vue, vuetify'
       }
     }
 },
  components: {
    'pieChart': pieChart,
    'lineGraph': lineGraph,
    'mem': mem
  },
  data() {
    return {
      message: "message",
      items: [{
          active: true,
          title: 'Jason Oner',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          active: true,
          title: 'Ranee Carlson',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Cindy Baker',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        },
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        }
        ,
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        }
        ,
        {
          title: 'Ali Connors',
          avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-5-512.png'
        }

      ]
    }
  },
  mounted() {
    //do something after mounting vue instance
    // console.log("cookie: "+document.cookie)
    // console.log("islogin : " + this.$store.getters.islogin);

    if (JSON.parse(localStorage.getItem("isLogin")) == false) {
      this.$store.commit('islogin', false)
      this.$router.push('/')
    } else {
      this.$store.commit('islogin', true)
      this.$router.push('/home')
    }

  }
}
</script>
