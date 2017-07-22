<template>
<div>
  <v-container fluid>
    <v-layout row>
      <v-flex xs3>
        <v-card class="light-green white--text">
          <v-card-text >
                    <div class="text-xs-center">
                      <v-icon x-large dark>attach_money</v-icon>
                      <h5 class ="white--text" style="display:inline;"><b>2000</b></h5><br>
                        </div>
                        <div class="text-xs-center">
                              <p class ="white--text" style ="display:inline;">รายได้เดือนที่แล้ว</p>
                      </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card  class="deep-orange white--text">
          <v-card-text >
                    <div class="text-xs-center">
                      <v-icon x-large dark>attach_money</v-icon>
                      <h5 class ="white--text" style="display:inline;"><b>2000</b></h5><br>
                        </div>
                        <div class="text-xs-center">
                              <p class ="white--text" style ="display:inline;">รายได้เดือนที่แล้ว</p>
                      </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card  class="amber white--text">
          <v-card-text >
                    <div class="text-xs-center">
                      <v-icon x-large dark>attach_money</v-icon>
                      <h5 class ="white--text" style="display:inline;"><b>2000</b></h5><br>
                        </div>
                        <div class="text-xs-center">
                              <p class ="white--text" style ="display:inline;">รายได้เดือนที่แล้ว</p>
                      </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card  class="purple white--text">
          <v-card-text >
                    <div class="text-xs-center">
                      <v-icon x-large dark>attach_money</v-icon>
                      <h5 class ="white--text" style="display:inline;"><b>2000</b></h5><br>
                        </div>
                        <div class="text-xs-center">
                              <p class ="white--text" style ="display:inline;">รายได้เดือนที่แล้ว</p>
                      </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs12>
        <v-card >
          <v-card-title>
            <lineGraph></lineGraph>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex xs4>
        <v-card>
          <v-card-title>
            <pieChart></pieChart>
            </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card>
            <v-card-title>
                <mem></mem>
            </v-card-title>
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
  components: {
    pieChart,
    lineGraph,
    mem
  },
  data() {
    return {
      message: "message"
    }
  },
  mounted() {
    //do something after mounting vue instance

    if (JSON.parse(localStorage.getItem("isLogin")) == false) {
      console.log("falseeee");
      this.$store.commit('setLogin', false)
      this.$router.push('/')


    } else {
      console.log("trueeee");
      this.$store.commit('setLogin', true)
      this.$router.push('/home')
      this.$store.commit('setPage', "Home")

    }
    console.log(localStorage.getItem("isLogin"));
  }
}
</script>
