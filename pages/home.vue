<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 sm3>
        <v-card class="light-green white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>2000</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนที่แล้ว</p>
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
              <h5 class="white--text" style="display:inline;"><b>2000</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนที่แล้ว</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="amber white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>2000</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนที่แล้ว</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 sm3>
        <v-card class="purple white--text">
          <v-card-text>
            <div class="text-xs-center">
              <v-icon x-large dark>attach_money</v-icon>
              <h5 class="white--text" style="display:inline;"><b>2000</b></h5><br>
            </div>
            <div class="text-xs-center">
              <p class="white--text" style="display:inline;">รายได้เดือนที่แล้ว</p>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12 sm12>

            <lineGraph></lineGraph>

            <v-layout row wrap>
              <template v-for="item in canvasItem">
                <v-flex xs4 sm2>
                      <v-card :class ="item.color" height="20px"width="10px">
                          <span> </span>
                      </v-card>
                        &nbsp; <span>{{item.text}}</span>
                  </v-flex>

            </template>
            </v-layout>

      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title>
            <pieChart></pieChart>
          </v-card-title>
        </v-card>
        <br>
      </v-flex>
      <v-flex xs12 sm9>

        <mem></mem>

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
  components: {
    'pieChart': pieChart,
    'lineGraph': lineGraph,
    'mem': mem
  },
  data() {
    return {
      message: "message",
      canvasItem: [{
        text: 'เจ้าของร้านทำผม',
        color: "red"
      }, {
        text: 'ผู้ที่สนใจกิจการร้านทำผม',
        color: "red"
      }, {
        text: 'ผู้ช่วยช่าง',
        color: "red"
      }, {
        text: 'ช่างตัดผม',
        color: "red"
      }, {
        text: 'อีกอันนึง',
        color: "red"
      }, {
        text: 'มีอีกอันจำชื่อไม่ได้',
        color: "red"
      }]
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
      this.$store.commit('setPage', "Home")
    }

  }
}
</script>
